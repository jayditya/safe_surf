chrome.runtime.onInstalled.addListener(() => {
  // Open signup page when the extension is installed
  chrome.tabs.create({
    url: chrome.runtime.getURL("signup.html")
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    const domain = url.hostname.replace('www.', '');

    fetch(chrome.runtime.getURL('malicious_sites.json'))
      .then(response => response.json())
      .then(data => {
        chrome.storage.local.get(['stats'], (result) => {
          let stats = result.stats || { total: 0, threats: 0, threatsList: [] };
          stats.total += 1;

          if (data.malicious_domains.includes(domain)) {
            stats.threats += 1;
            stats.threatsList.push({ domain, timestamp: new Date().toISOString() });

            // Save the unsafe URL to localStorage so warning.html can access it
            chrome.scripting.executeScript({
              target: { tabId },
              func: (url) => localStorage.setItem('lastUnsafeUrl', url),
              args: [tab.url]
            });

            // Redirect to warning page
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL('warning.html') });
          }

          chrome.storage.local.set({ stats });
        });
      });
  }
});

// When the user clicks on the extension icon
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard.html")
  });
});
