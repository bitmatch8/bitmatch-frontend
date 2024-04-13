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

function getUnisatAddressType(address: string): string {
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

export {
  ADDRESS_TYPE_P2SH,
  ADDRESS_TYPE_P2PKH,
  ADDRESS_TYPE_P2SH_P2WPKH,
  ADDRESS_TYPE_P2WPKH,
  ADDRESS_TYPE_P2TR,
  generatePsbt,
  pushPsbt,
  getUnisatAddressType,
};
