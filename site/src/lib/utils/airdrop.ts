import { getWalletData } from ".";

export const checkTrust = ({
  code,
  issuer,
}: {
  code: string;
  issuer: string;
}): boolean => {
  const wd = getWalletData();
  return false;
};
