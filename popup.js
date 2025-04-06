document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['username', 'stats'], (data) => {
      document.getElementById('user-info').innerText = `Logged in as: ${data.username || 'Guest'}`;
  
      const stats = data.stats || { total: 0, threats: 0, threatsList: [] };
      document.getElementById('stats').innerHTML = `
        <p>Total Sites Visited: ${stats.total}</p>
        <p>Threats Detected: ${stats.threats}</p>
        <p>Threat Domains:</p>
        <ul>${stats.threatsList.map(d => `<li>${d}</li>`).join('')}</ul>
      `;
    });
  });