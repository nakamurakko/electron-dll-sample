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

/** @type {HTMLInputElement} */
const greetingButton = document.getElementById('greeting-button');
greetingButton.addEventListener('click', (e) => {

  /** @type {HTMLInputElement} */
  const greetingTo = document.getElementById('greeting-to');

  /** @type {HTMLElement} */
  const greeting = document.getElementById('greeting');
  sampleLib.greeting(greetingTo.value)
    .then(
      response => {
        greeting.innerText = response;
      },
      rejected => {
        greeting.innerText = rejected;
      }
    );
});
