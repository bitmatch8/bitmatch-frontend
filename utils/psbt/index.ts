import {
  ADDRESS_TYPE_P2SH,
  ADDRESS_TYPE_P2PKH,
  ADDRESS_TYPE_P2SH_P2WPKH,
  ADDRESS_TYPE_P2WPKH,
  ADDRESS_TYPE_P2TR,
  generatePsbt,
  pushPsbt,
} from "./psbt1";
import { Address } from "@cmdcode/tapscript";

export function getUnisatAddressType(address: string): string {
  switch (Address.decode(address).type) {
    case "p2pkh":
      return ADDRESS_TYPE_P2PKH;
    case "p2sh":
      return ADDRESS_TYPE_P2SH_P2WPKH;
    case "p2w-pkh":
      return ADDRESS_TYPE_P2WPKH;
    case "p2tr":
      return ADDRESS_TYPE_P2TR;
    default:
      return "UNKENOW_ADDR";
  }
}
export const LOWEST_FEE = 550;

export function getSpacers(rune: string): number[] {
  let result = [];
  const arr = rune.split("·");
  arr.reduce((accumulator, currentValue, currentIndex, array) => {
    result.push(accumulator + currentValue.length - 1);
    return accumulator + currentValue.length;
  }, 0);

  return result.slice(0, result.length - 1);
}

export {
  ADDRESS_TYPE_P2SH,
  ADDRESS_TYPE_P2PKH,
  ADDRESS_TYPE_P2SH_P2WPKH,
  ADDRESS_TYPE_P2WPKH,
  ADDRESS_TYPE_P2TR,
  generatePsbt,
  pushPsbt,
};
