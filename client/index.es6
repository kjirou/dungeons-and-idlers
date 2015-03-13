import App from 'client/app'


window.addEventListener('load', function(){
  var app = new App();
  window._app = app;
  var container = window.document.querySelector('#js-game-container');
  app.renderTo(container);
  app.start().then(() => {
    console.log('Started app at', new Date());
  });
});
