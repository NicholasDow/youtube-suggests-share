const serverUrl = 'http://localhost:3000/api/video';

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.videoId) {
//     fetch(`${serverUrl}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ videoId: request.videoId }),
//     });
//   }
// });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.suggestedLinks) {
      const suggestedLinks = request.suggestedLinks;
      // Send the suggestedLinks array to the server
      sendLinksToServer(suggestedLinks);
    }
  });
  
  function sendLinksToServer(links) {
    const url = 'http://localhost:3000/api/video';
  
    links.forEach(link => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoId: link })
      })
      .then(response => {
        if (response.ok) {
          console.log('Link sent successfully:', link);
        } else {
          console.error('Failed to send link:', link);
        }
      })
      .catch(error => {
        console.error('Error sending link:', link, error);
      });
    });
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab && tab.url && tab.url.includes('youtube.com')) {
      chrome.tabs.executeScript(tab.id, { file: 'content.js' });
    }
  });
