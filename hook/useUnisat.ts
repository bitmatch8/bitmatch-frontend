export default () => {
  let unisat = (window as any).unisat

//   for (let i = 1; i < 10 && !unisat; i += 1) {
//     await new Promise((resolve) => setTimeout(resolve, 100 * i))
//     unisat = (window as any).unisat
//   }
  return { unisat }
}
