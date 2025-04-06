document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // Save user to storage (optional)
        chrome.storage.local.set({ username }, () => {
          // Redirect to dashboard
          window.location.href = 'dashboard.html';
        });
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
});
