const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
  invoke: async (channel, url) => {
    let validChannels = ['getRate', 'getSymbols', 'getCountries']
    if (validChannels.includes(channel)) {
      const data = await ipcRenderer.invoke(channel, url)
      return data
    }
  }
})