// chrome.runtime.onInstalled.addListener(() => {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//         chrome.declarativeContent.onPageChanged.addRules([
//             {
//                 conditions: [
//                     new chrome.declarativeContent.PageStateMatcher({
//                         pageUrl: {
//                             urlMatches: ""
//                         },
//                     }),
//                 ],
//                 actions: [new chrome.declarativeContent.ShowPageAction()],
//             },
//         ]);
//     });
// });

// chrome.webNavigation.onCompleted.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { cmd: "fetch" }, () => { });
//         chrome.tabs.sendMessage(tab.id,"toggle");
//     });
// });


// chrome.browserAction.onClicked.addListener(function(tab){
//         console.log("CLIKED", tab);
//         chrome.tabs.sendMessage(tab?.id,"toggle");
// });

chrome.action.onClicked.addListener(tab => {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });