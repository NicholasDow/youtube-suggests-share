function getSuggestedLinks() {
    const suggestedLinks = [];
    const linkElements = document.querySelectorAll('a#video-title-link');
    
    linkElements.forEach(linkElement => {
      const linkUrl = linkElement.href;
      suggestedLinks.push(linkUrl);
    });
  
    return suggestedLinks;
  }
  
  function sendSuggestedLinksToBackground(links) {
    chrome.runtime.sendMessage({ suggestedLinks: links });
  }
  
  (function detectPageLoad() {
    if (window.location.hostname === 'www.youtube.com' && window.location.pathname === '/') {
      setTimeout(() => {
        const suggestedLinks = getSuggestedLinks();
        sendSuggestedLinksToBackground(suggestedLinks);
      }, 3000);
    }
  })();