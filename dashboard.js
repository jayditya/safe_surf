document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['stats'], ({ stats }) => {
      if (!stats || !stats.threatsList) return;
  
      const todayList = document.getElementById('today-list');
      const weekList = document.getElementById('week-list');
      const monthList = document.getElementById('month-list');
  
      const now = new Date();
      const today = now.toDateString();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay()); // Start of week
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Start of month
  
      stats.threatsList.forEach(entry => {
        const { domain, timestamp } = typeof entry === 'string'
          ? { domain: entry, timestamp: new Date().toISOString() } // fallback for old entries
          : entry;
  
        const visitDate = new Date(timestamp);
        const item = document.createElement('li');
        item.textContent = `${domain} - ${visitDate.toLocaleString()}`;
  
        if (visitDate.toDateString() === today) {
          todayList.appendChild(item);
        }
        if (visitDate >= weekStart) {
          weekList.appendChild(item.cloneNode(true));
        }
        if (visitDate >= monthStart) {
          monthList.appendChild(item.cloneNode(true));
        }
      });
    });
  });
  