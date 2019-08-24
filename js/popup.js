// 连接发起方
let PORT = null;
const COMM = {
  FETCH_PIPE: 'FETCH_PIPE',
  USE_THEME: 'USE_THEME'
};
// 向background发消息
PORT = chrome.runtime.connect({ name: COMM.FETCH_PIPE });
document.getElementById('down').addEventListener(
  'click',
  function() {
    PORT.postMessage({ cmd: 'connect_pipe' });
  },
  true
);
PORT.onDisconnect.addListener(() => {  console.log('disconnect');
});
PORT.onMessage.addListener((msg) => {    
  // 处理过程
  console.log(msg);
});

// 向content-scripts发消息
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}
document.getElementById('theme').addEventListener(
  'click',
  function() {
    sendMessageToContentScript(
      { cmd: 'theme', value: document.getElementById('theme').checked },
      function(response) {
        console.log('来自content的回复：' + response);
      }
    );
  },
  true
);