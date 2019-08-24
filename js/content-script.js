console.log('this is from content-script of dani demo');
// cookie

var GET_COOKIES = 'GET_COOKIES';
var GET_CURRENT_COOKIES = 'GET_CURRENT_COOKIES';
var SET_COOKIES = 'SET_COOKIES';

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('request', request);
//   if (request.action === 'THEME') {
//     $('body').addClass('dani-class');
//   }
// });

chrome.runtime.sendMessage( { action: GET_COOKIES, args: '' }, response => { console.log(response); } );

chrome.runtime.sendMessage( { action: GET_CURRENT_COOKIES, args: '' }, response => { console.log(response); } );

chrome.runtime.sendMessage( { action: SET_COOKIES, args: '' }, response => { console.log(response); } );

// theme主题： 接受来自popup的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.cmd == 'theme' && request.value === true) {
    $('body').addClass('dani-class');
  } else {
    $('body').removeClass('dani-class');
  }
});
// const COMM = {
//   USE_THEME: 'USE_THEME'
// };
// chrome.runtime.onConnect.addListener(port => {
//   switch (port.name) {
//     case COMM.USE_THEME:
//       port.onMessage.addListener(msg => {
//         if (msg.checked) {
//           $('body').addClass('dani-class');
//         } else {
//           $('body').removeClass('dani-class');
//         }
//       });
//       break;
//     default:
//       break;
//   }
// });



 