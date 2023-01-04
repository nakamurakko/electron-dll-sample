/** @type {HTMLElement} */
const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

/** @type {HTMLElement} */
const dirName = document.getElementById('dir-name');
paths.dirName()
  .then(response => {
    dirName.innerText = response;
  });

/** @type {HTMLElement} */
const resourcesPath = document.getElementById('resources-path');
paths.resourcesPath()
  .then(response => {
    resourcesPath.innerText = response;
  });

/** @type {HTMLElement} */
const edgeNative = document.getElementById('edge-native');
edgeNative.innerText = paths.edgeNative();

/** @type {HTMLElement} */
const greeting = document.getElementById('greeting');
sampleLib.greeting()
  .then(response => {
    greeting.innerText = response;
  });
