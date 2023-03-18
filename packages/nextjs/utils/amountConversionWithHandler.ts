import { utils } from "ethers";
import { NUMBER_REGEX } from "~~/components/scaffold-eth/Contract/utilsComponents";
// if USDT supports 6 decimals
// and my dx is 153.60000000000002 (more than 6 dec. places)

// this function trims too long decimals.
export function trim_decimal_overflow(n: string, decimals: number) {
  n += "";

  if (n.indexOf(".") === -1) return n;

  const arr = n.split(".");
  const fraction = arr[1].substr(0, decimals);
  return arr[0] + "." + fraction;
}

export function parseAmount(amount: string) {
  return NUMBER_REGEX.test(amount) ? utils.parseEther(trim_decimal_overflow(amount, 18)) : undefined;
}
