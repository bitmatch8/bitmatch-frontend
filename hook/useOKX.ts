import { useMemo } from "react"

export default () => {
  let okxwallet = (window as any).okxwallet

  const isInstalled = async ()=>{
    for (let i = 1; i < 10 && !okxwallet; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i))
    }
    const unisatInstalled = !!okxwallet
    return unisatInstalled
  }
  // const result = await okxwallet.bitcoin
  return {
    wallter:okxwallet[process.env.NEXT_PUBLIC_TEST === "test" ? 'bitcoinTestnet':'bitcoin'],
    isInstalled
  }
}
