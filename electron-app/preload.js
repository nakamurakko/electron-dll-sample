const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sampleLib', {
  greeting: (whoIs) => ipcRenderer.invoke('greeting', whoIs)
});
