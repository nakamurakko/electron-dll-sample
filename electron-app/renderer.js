document.getElementById('greeting-button')
  .addEventListener('click',
    /**
     * greeting-button クリック。
     *
     * @param {MouseEvent} ev イベントデータ。
     */
    (ev) => {
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
