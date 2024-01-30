import { useEffect, useMemo, useState } from "react"

export default () => {
  let unisat = (window as any).unisat
  const name = 'UniSat'
  
  return {
    name,
    wallter:unisat,
    installed:!!unisat,
  }
}
