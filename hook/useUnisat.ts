import { useMemo } from "react"

export default () => {
  let unisat = (window as any).unisat

  const isInstalled = async ()=>{
    for (let i = 1; i < 10 && !unisat; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i))
    }
    const unisatInstalled = !!unisat
    return unisatInstalled
  }
  return {
    wallter:unisat,
    isInstalled
  }
}
