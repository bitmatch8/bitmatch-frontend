export default {
  post: async (url: string, data: any = {}) => {
    return await fetch(`/api${url}`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(console.log)
  },
  get: async (url: string) => {
    return await fetch(`/api${url}`).then((res) => res.json()).catch(console.log)
  },
}
