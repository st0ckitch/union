// Сюда перенесены вызовы что подтягивают внешние ресурсы, для оптимизации
// Bitrix   24
window.addEventListener('onBitrixLiveChat', function (event) {
  try {
    var widget = event.detail.widget;

    // Обработка событий
    widget.subscribe({
      type: BX.LiveChatWidget.SubscriptionType.widgetOpen,
      callback: function (data) {
        goToEvent('Jivo_Client_initiate_chat', {}, 'Jivo');
      }
    });
    widget.subscribe({
      type: BX.LiveChatWidget.SubscriptionType.userMessage,
      callback: function (data) {
        goToEvent('jivo_onmessagesent', {}, 'Jivo');
        goToEvent('Jivo_Chat_established', {}, 'Jivo');
      }
    });
  } catch (e) {
    console.error('No events b24 subscribe');
  }
});

//loadScript('https://www.google.com/recaptcha/api.js?onload=recaptchaLoadCallback&amp;render=explicit&amp;hl=ru');
//loadScript('https://mod.calltouch.ru/init.js?id=725d3dad');
loadScript('https://d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js', 'Bugsnag.start({ apiKey: \'82a5c1c1030114ee0469e2063be6007a\' })');
// setTimeout(function () {
//   try {
//     !function () {
//       var t = document.createElement("script");
//       t.type = "text/javascript", t.async = !0, t.src = 'https://vk.com/js/api/openapi.js?169', t.onload = function () {
//         VK.Retargeting.Init("VK-RTRG-1402605-dsV0V"), VK.Retargeting.Hit()
//       }, document.head.appendChild(t)
//     }();
//   } catch (e) {
//
//   }
// }, 1500);
console.info('Async scripts INIT');


