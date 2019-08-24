// omnibox
chrome.omnibox.onInputEntered.addListener(function(text) {
  // const url = !text.includes('http')
  //   ? `https://www.baidu.com/s?ie=UTF-8&wd=${text}`
  //   : text;
  const url = `https://search.bilibili.com/all?keyword=${text}&from_source=banner_search=`;
  if (text.includes('activity.m.duibadev')) {
    navigate('http://activity.m.duibadev.com.cn/test/inner4me');
    setTimeout(() => {
      navigate(url);
    }, 300);
  } else {
    navigate(url);
  }
});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  if (text.includes('dev')) {
    suggest([
      {
        content: `http://activity.m.duibadev.com.cn/chw/visual-editor/skins?id=${text.slice(
          4
        )}`,
        description: '开发页面'
      }
    ]);
  } else {
    suggest([
      {
        content: `http://activity.m.duibadev.com.cn/chw/visual-editor/skins?id=${text}`,
        description: '开发页面'
      },
      { content: text + ' for mac', description: '搜索 mac' }
    ]);
  }
});

function openTab(url) {
  chrome.tabs.create({ url });
}
function navigate(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.update(tabs[0].id, { url: url });
  });
}

// 下载
var down = document.getElementById('down');
down &&
  down.addEventListener('click', function() {
    var options = {
      url:
        'https://cms-origin.battlenet.com.cn/cms/blog_thumbnail/01/01ZMKLKV95ZM1532759670729.jpg',
      filename: 'wow.jpg',
      conflictAction: 'overwrite',
      method: 'GET'
    };
    chrome.downloads.download(options, function() {});
  });

// 右键菜单
chrome.contextMenus.create({
  title: '最简单的菜单',
  contexts: ['page'],
  onclick: function() {
    alert('点我干啥');
  }
});

function sendMessage(action, args) {
  chrome.runtime.sendMessage(
    {
      action,
      args
    },
    response => {}
  );
}
// cookie
var GET_COOKIES = 'GET_COOKIES';
var GET_CURRENT_COOKIES = 'GET_CURRENT_COOKIES';
var SET_COOKIES = 'SET_COOKIES';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var action = request.action;
  var args = request.args;
  console.log(action);
  switch (action) {
    case GET_COOKIES:
      chrome.cookies.getAllCookieStores(function(cookieStores) {
        sendResponse({ action: GET_COOKIES, args: cookieStores });
      });
      return true;
    case GET_CURRENT_COOKIES:
      chrome.cookies.getAll({ url: 'https://www.baidu.com' }, function(
        cookies
      ) {
        sendResponse({ action: GET_CURRENT_COOKIES, args: cookies });
      });
      return true;
    case SET_COOKIES:
      chrome.cookies.set({
        url: 'https://www.baidu.com',
        name: 'name',
        value: 'dani',
        domain: 'www.baidu.com'
      });
      break;
    default:
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: '../img/128-128.jpg',
        title: '消息通知',
        message: 'background接受到消息啦啦啊~'
      });
      break;
  }
});

// // 网络请求
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     const url = details.url;

//     if (
//       (url.includes('//yun.duiba.com') && url.includes('jpg')) ||
//       url.includes('png') ||
//       url.includes('jpeg')
//      ) {
//       return {
//         redirectUrl: 'http://yun.duiba.com.cn/images/201907/pkhzgjfpea.jpg'
//         // cancel: true
//       };
//     }

//     return { cancel: false };
//   },
//   { urls: ['<all_urls>'] },
//   ['blocking']
// );

// storage
chrome.storage.local.set({ key: 'dani' }, function() {
  console.log('Value is set to ' + 'dani');
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

chrome.storage.local.set({ key: 'dani2222' }, function() {
  console.log('Value is set to ' + 'dani');
});

chrome.storage.sync.set({ key: 'hello dani' }, function() {
  console.log('Value is set to ' + 'hello dani');
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log(
      '存储键“%s”（位于“%s”命名空间中）已更改。' +
        '原来的值为“%s”，新的值为“%s”。',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
  }
});

// 国际化
const hello = chrome.i18n.getMessage('HELLO');

const COMM = {
  FETCH_PIPE: 'FETCH_PIPE',
  USE_THEME: 'USE_THEME'
};

// 长连接: 被动连接方
chrome.runtime.onConnect.addListener(port => {
  switch (port.name) {
    case COMM.FETCH_PIPE:
      port.onMessage.addListener(msg => {
        chrome.notifications.create(null, {
          type: 'basic',
          iconUrl: '../img/128-128.jpg',
          title: '消息通知',
          message: '收到长连接的消息啦~'
        });
      });
      break;
    case COMM.USE_THEME:
      // if (msg.checked) {
      // sendMessage('THEME', {checked: true});
      // }
      break;
    default:
      
      break;
  }
});

// 设置图标的badget
// chrome.browserAction.setBadgeText({ text: 'new' });
// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
