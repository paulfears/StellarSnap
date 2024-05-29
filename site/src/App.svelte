<script>
  import Demo from "./Demo.svelte";
  import Header from "./Header.svelte";

  let loading = false;
</script>

<Header bind:loading={loading} />
<Demo bind:isFunding={loading}/>