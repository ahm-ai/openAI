
// try {
//     console.log("hello from content script");

//     chrome.runtime.onMessage.addListener(async (req, p1, p2) => {

//         console.log("message received", req);
//     });

//     chrome.runtime.onMessage.addListener(function (msg, sender) {
//         console.log({ msg });
//         if (msg?.cmd == "toggle") {
//             // toggle();
//         }
//     });

//     var iframe = document.createElement('iframe');
//     iframe.style.background = "white";
//     iframe.style.height = "100%";
//     iframe.style.width = "0"
//     iframe.style.position = "fixed";
//     iframe.style.top = "0px";
//     iframe.style.right = "0px";
//     iframe.style.zIndex = "9999";
//     iframe.frameBorder = "none";
//     iframe.src = chrome.runtime.getURL("index.html")

//     console.log(iframe.src, chrome.runtime);
//     document.body.appendChild(iframe);

//     function toggle() {
//         if (iframe.style.width == "0px") {
//             iframe.style.width = "50%";
//         }
//         else {
//             iframe.style.width = "0px";
//             //   iframe.style.width="400px";
//         }
//     }


// } catch (error) {
//     console.log(error);
// }
