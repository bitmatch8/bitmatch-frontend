import { base64, hex } from "@scure/base";
import * as btc from "@scure/btc-signer";
import * as secp256k1 from "@noble/secp256k1";
import axios from "axios";

export const TESTNET_NETWORK_URL = "https://mempool.space/testnet";
export const LIVENET_NETWORK_URL = "https://mempool.space";

const currentNetwork = process.env.NEXT_PUBLIC_NETWORK;

export const COMPANY_ADDRESS = "bc1qq65pwqd0a5f3aqgufu8c5a90gnn7cd8aukq2x3"; //公司收钱地址
export const COMPANY_FEE = 2000; //公司收取的服务费

const SERVER_URL =
  currentNetwork === "testnet"
    ? `${TESTNET_NETWORK_URL}/api`
    : `${LIVENET_NETWORK_URL}/api`;

const NETWORK = currentNetwork == "testnet" ? btc.TEST_NETWORK : btc.NETWORK;
const MIN_RELAY_FEE = 1000;

const DUMMY_PRIVATEKEY =
  "0000000000000000000000000000000000000000000000000000000000000001";
const dummyPublicKey = secp256k1.getPublicKey(DUMMY_PRIVATEKEY, true);

export const ADDRESS_TYPE_P2SH = "p2sh";
export const ADDRESS_TYPE_P2PKH = "p2pkh";
export const ADDRESS_TYPE_P2SH_P2WPKH = "p2sh_p2wpkh";
export const ADDRESS_TYPE_P2WPKH = "p2wpkh";
export const ADDRESS_TYPE_P2TR = "p2tr";

export let pageVsize = 0;

const getInputInfo = async (
  addressType: string,
  publicKey: Uint8Array,
  txid: string,
  vout: number,
  amount: string
) => {
  let input: {
    txid: string;
    index: number;
    nonWitnessUtxo?: any;
    witnessUtxo?: any;
    redeemScript?: any;
    tapInternalKey?: Uint8Array;
  } = {
    txid,
    index: vout,
  };

  if (addressType === ADDRESS_TYPE_P2SH) {
    const p2wpkh = btc.p2wpkh(publicKey, NETWORK);
    const p2sh = btc.p2sh(p2wpkh, NETWORK);

    input.redeemScript = p2sh.redeemScript;
    input.witnessUtxo = {
      script: p2sh.script,
      amount: BigInt(amount),
    };
  } else if (addressType === ADDRESS_TYPE_P2PKH) {
    const p2pkh = btc.p2pkh(publicKey, NETWORK);

    input.witnessUtxo = {
      script: p2pkh.script,
      amount: BigInt(amount),
    };
  } else if (addressType === ADDRESS_TYPE_P2SH_P2WPKH) {
    const p2wpkh = btc.p2wpkh(publicKey, NETWORK);
    const p2sh = btc.p2sh(p2wpkh, NETWORK);

    input.redeemScript = p2sh.redeemScript;
    input.witnessUtxo = {
      script: p2sh.script,
      amount: BigInt(amount),
    };
  } else if (addressType === ADDRESS_TYPE_P2WPKH) {
    const p2wpkh = btc.p2wpkh(publicKey, NETWORK);

    input.witnessUtxo = {
      script: p2wpkh.script,
      amount: BigInt(amount),
    };
  } else if (addressType === ADDRESS_TYPE_P2TR) {
    const tapInternalKey =
      publicKey.length === 33 ? publicKey.slice(1) : publicKey;
    const p2tr = btc.p2tr(tapInternalKey, undefined, NETWORK);

    input.tapInternalKey = tapInternalKey;
    input.witnessUtxo = {
      script: p2tr.script,
      amount: BigInt(amount),
    };
  }

  return input;
};

export const generatePsbt = async (
  payment: any,
  ordinals: any,
  recipientAddress: string,
  feeRate: number,
  opReturnOutput: Buffer,
  opNum: number
) => {
  try {
    const tx = new btc.Transaction({ allowUnknownOutputs: true });
    const dummyTx = new btc.Transaction({ allowUnknownOutputs: true });
    let totalUtxoValue = 0;

    if (ordinals) {
      let response = await axios.get(
        `${SERVER_URL}/address/${ordinals.address}/utxo`
      );

      if (!response || response.status !== 200 || !response.data) {
        console.error("No ordinals UTXO exist");
        return;
      }

      let ordinalsUtxos = response.data.data;
      ordinalsUtxos = ordinalsUtxos.filter((utxo: any) => !utxo.isSpent);

      const ordinalsUtxo = ordinalsUtxos.find((ordinalsUtxo: any) => {
        return ordinalsUtxo.inscriptions.find(
          (inscription: any) =>
            inscription.inscriptionId === ordinals.inscriptionId
        );
      });

      if (!ordinalsUtxo) {
        console.error("Ordinals UTXO not exist");
        return;
      }

      const ordinalsInput = await getInputInfo(
        ordinals.addressType,
        hex.decode(ordinals.publicKey),
        ordinalsUtxo.txid,
        ordinalsUtxo.vout,
        ordinalsUtxo.amount
      );

      const dummyOrdinalsInput = await getInputInfo(
        ordinals.addressType,
        dummyPublicKey,
        ordinalsUtxo.txid,
        ordinalsUtxo.vout,
        ordinalsUtxo.amount
      );

      payment.amount += ordinalsUtxo.amount;
      totalUtxoValue += ordinalsUtxo.amount;

      tx.addInput(ordinalsInput);

      dummyTx.addInput(dummyOrdinalsInput);
    }

    if (!payment.amount) {
      console.error("Empty output");
      return;
    }

    tx.addOutputAddress(recipientAddress, BigInt(payment.amount), NETWORK);
    for (let i = 0; i < opNum; i++) {
      tx.addOutput({ script: opReturnOutput, amount: BigInt(0) }); //TODO:
    }
    // '我们的服务费' > 0 && tx.addOutputAddress(
    //   "我们的地址",
    //   BigInt("我们的服务费"),
    //   NETWORK
    // );
    COMPANY_FEE > 0 &&
      tx.addOutputAddress(
        currentNetwork === "testnet" ? payment.address : COMPANY_ADDRESS,
        BigInt(COMPANY_FEE),
        NETWORK
      );

    dummyTx.addOutputAddress(recipientAddress, BigInt(payment.amount), NETWORK);
    for (let i = 0; i < opNum; i++) {
      dummyTx.addOutput({ script: opReturnOutput, amount: BigInt(0) }); //TODO:
    }
    // '我们的服务费' > 0 &&  dummyTx.addOutputAddress("我们的地址", BigInt("我们的服务费"), NETWORK);
    COMPANY_FEE > 0 &&
      dummyTx.addOutputAddress(
        currentNetwork === "testnet" ? payment.address : COMPANY_ADDRESS,
        BigInt(COMPANY_FEE),
        NETWORK
      );

    let response = await axios.get(
      `${SERVER_URL}/address/${payment.address}/utxo`
    );

    if (!response || response.status !== 200 || !response.data) {
      console.error("No payment UTXO exist");
      return;
    }

    let paymentUtxos = response.data;
    paymentUtxos = paymentUtxos.filter((utxo: any) => !utxo.isSpent);
    paymentUtxos = paymentUtxos.sort((a: any, b: any) => b.value - a.value);
    let paymentUtxoCount = 0;

    for (const paymentUtxo of paymentUtxos) {
      const paymentInput = await getInputInfo(
        payment.addressType,
        hex.decode(payment.publicKey),
        paymentUtxo.txid,
        paymentUtxo.vout,
        paymentUtxo.value
      );

      const dummyPaymentInput = await getInputInfo(
        payment.addressType,
        dummyPublicKey,
        paymentUtxo.txid,
        paymentUtxo.vout,
        paymentUtxo.value
      );

      tx.addInput(paymentInput);

      dummyTx.addInput(dummyPaymentInput);

      paymentUtxoCount++;

      let feeTx = btc.Transaction.fromPSBT(dummyTx.toPSBT());
      feeTx.sign(hex.decode(DUMMY_PRIVATEKEY));
      feeTx.finalize();

      let feeAmount = feeTx.vsize * feeRate;
      feeAmount = feeAmount < MIN_RELAY_FEE ? MIN_RELAY_FEE : feeAmount; //

      totalUtxoValue += paymentUtxo.value;
      console.log(
        "----psbt total----:",
        payment.amount + feeAmount + COMPANY_FEE + feeAmount * 0.05
      );
      if (
        totalUtxoValue >=
        payment.amount + feeAmount + COMPANY_FEE + Math.ceil(feeAmount * 0.05)
      ) {
        dummyTx.addOutputAddress(payment.address, BigInt(feeAmount), NETWORK);

        feeTx = btc.Transaction.fromPSBT(dummyTx.toPSBT());
        feeTx.sign(hex.decode(DUMMY_PRIVATEKEY));
        feeTx.finalize();

        feeAmount = feeTx.vsize * feeRate;
        feeAmount = feeAmount < MIN_RELAY_FEE ? MIN_RELAY_FEE : feeAmount;

        if (
          totalUtxoValue >=
          payment.amount +
            100 * feeRate +
            feeAmount +
            COMPANY_FEE +
            Math.ceil(feeAmount * 0.05)
        ) {
          tx.addOutputAddress(
            payment.address,
            BigInt(
              totalUtxoValue -
                payment.amount -
                feeAmount -
                COMPANY_FEE -
                Math.ceil(feeAmount * 0.05)
            ),
            NETWORK
          );
        }

        const psbt = tx.toPSBT();
        const psbtBase64 = base64.encode(psbt);

        return {
          psbt,
          psbtBase64,
          paymentUtxoCount,
          vsize: feeTx.vsize,
        };
      } else {
        return {
          vsize: feeTx.vsize,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const pushPsbt = async (psbt: any) => {
  try {
    const tx = btc.Transaction.fromPSBT(psbt);
    tx.finalize();

    const response = await axios.post(`${SERVER_URL}/sendRawTransaction`, {
      rawTransaction: tx.hex,
    });

    if (response && response.status === 200 && response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
