// @link WebViewerInstance: https://docs.apryse.com/api/web/WebViewerInstance.html
// @link UI.loadDocument: https://docs.apryse.com/api/web/UI.html#loadDocument__anchor

WebViewer(
  {
    path: 'https://cdnjs.cloudflare.com/ajax/libs/pdftron/7.3.1',
    initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    disabledElements: [
                'downloadButton', // Disable download button
                'printButton', // Disable print button
                'searchButton', // Disable search button
                'selectToolButton', // Disable select tool button
                'menuButton' // Disable menu button
            ]
  },
  document.getElementById('viewer')
).then(instance => {
  samplesSetup(instance);

  document.getElementById('select').onchange = e => {
    instance.UI.loadDocument(e.target.value);
  };

  document.getElementById('file-picker').onchange = e => {
    const file = e.target.files[0];
    if (file) {
      instance.UI.loadDocument(file);
    }
  };

  document.getElementById('url-form').onsubmit = e => {
    e.preventDefault();
    instance.UI.loadDocument(document.getElementById('url').value);
  };
});
