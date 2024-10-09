import { w as get_store_value } from "./ssr.js";
import { w as writable } from "./index2.js";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const isBrowser = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set(value) {
    if (isBrowser) {
      store.set(value);
    }
  }
  function update(updater) {
    if (isBrowser) {
      store.update(updater);
    }
  }
  return {
    subscribe: store.subscribe,
    set,
    update
  };
}
let toastsCounter = 0;
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev) => [data, ...prev]);
  }
  function create(data) {
    const { message: message2, ...rest } = data;
    const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get_store_value(toasts);
    const alreadyExists = $toasts.find((toast) => {
      return toast.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev) => prev.map((toast) => {
        if (toast.id === id) {
          return {
            ...toast,
            ...data,
            id,
            title: message2,
            dismissable,
            type,
            updated: true
          };
        }
        return {
          ...toast,
          updated: false
        };
      }));
    } else {
      addToast({ ...rest, id, title: message2, dismissable, type });
    }
    return id;
  }
  function dismiss(id) {
    if (id === void 0) {
      toasts.update((prev) => prev.map((toast) => ({ ...toast, dismiss: true })));
      return;
    }
    toasts.update((prev) => prev.map((toast) => toast.id === id ? { ...toast, dismiss: true } : toast));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev) => prev.filter((toast) => toast.id !== id));
    return id;
  }
  function message(message2, data) {
    return create({ ...data, type: "default", message: message2 });
  }
  function error(message2, data) {
    return create({ ...data, type: "error", message: message2 });
  }
  function success(message2, data) {
    return create({ ...data, type: "success", message: message2 });
  }
  function info(message2, data) {
    return create({ ...data, type: "info", message: message2 });
  }
  function warning(message2, data) {
    return create({ ...data, type: "warning", message: message2 });
  }
  function loading(message2, data) {
    return create({ ...data, type: "loading", message: message2 });
  }
  function promise(promise2, data) {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = create({
        ...data,
        promise: promise2,
        type: "loading",
        message: data.loading
      });
    }
    const p = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p.then((response) => {
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message2 = typeof data.error === "function" ? (
          // @ts-expect-error: Incorrect response type
          data.error(`HTTP error! status: ${response.status}`)
        ) : data.error;
        create({ id, type: "error", message: message2 });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.success === "function" ? data.success(response) : data.success
        );
        create({ id, type: "success", message: message2 });
      }
    }).catch((error2) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.error === "function" ? data.error(error2) : data.error
        );
        create({ id, type: "error", message: message2 });
      }
    }).finally(() => {
      if (shouldDismiss) {
        dismiss(id);
        id = void 0;
      }
      data.finally?.();
    });
    return id;
  }
  function custom(component, data) {
    const id = data?.id || toastsCounter++;
    create({ component, id, ...data });
    return id;
  }
  function removeHeight(id) {
    heights.update((prev) => prev.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get_store_value(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev) => [data, ...prev]);
      return;
    }
    heights.update((prev) => prev.map((el) => {
      if (el.toastId === data.toastId) {
        return data;
      } else {
        return el;
      }
    }));
  }
  function reset() {
    toasts.set([]);
    heights.set([]);
  }
  return {
    // methods
    create,
    addToast,
    dismiss,
    remove,
    message,
    error,
    success,
    info,
    warning,
    loading,
    promise,
    custom,
    removeHeight,
    setHeight,
    reset,
    // stores
    toasts,
    heights
  };
}
const toastState = createToastState();
function toastFunction(message, data) {
  return toastState.create({
    message,
    ...data
  });
}
const basicToast = toastFunction;
Object.assign(basicToast, {
  success: toastState.success,
  info: toastState.info,
  warning: toastState.warning,
  error: toastState.error,
  custom: toastState.custom,
  message: toastState.message,
  promise: toastState.promise,
  dismiss: toastState.dismiss,
  loading: toastState.loading
});
const useEffect = (subscribe) => ({ subscribe });
export {
  cn as c,
  toastState as t,
  useEffect as u
};
