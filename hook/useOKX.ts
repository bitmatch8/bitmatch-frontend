import { useEffect, useMemo, useState } from "react"

export default () => {
  let okxwallet = (window as any).okxwallet
  const name='OKX'
  
  return {
    name,
    wallter:process.env.NEXT_PUBLIC_TEST === "test" ? okxwallet?.bitcoin:okxwallet?.bitcoin,
    installed:!!okxwallet,
  }
}
