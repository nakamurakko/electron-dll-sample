document.getElementById('info').innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

paths.dirName()
  .then(response => {
    document.getElementById('dir-name').innerText = response;
  });

paths.resourcesPath()
  .then(response => {
    document.getElementById('resources-path').innerText = response;
  });

document.getElementById('edge-native').innerText = paths.edgeNative();

document.getElementById('greeting-button')
  .addEventListener('click', (ev) => {

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
