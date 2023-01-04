const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('paths', {
  dirName: () => ipcRenderer.invoke('dirName'),
  resourcesPath:() => ipcRenderer.invoke('resourcesPath'),
  edgeNative: () => process.env.EDGE_NATIVE
});


contextBridge.exposeInMainWorld('sampleLib', {
  greeting: () => ipcRenderer.invoke('greeting')
});
