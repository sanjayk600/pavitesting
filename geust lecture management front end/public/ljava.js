function validateLogin(event) {
    event.preventDefault();
      var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
      var group = validateCredentials(username, password);
  
    if (group === 'admin') {
      window.location.href = 'admindashboard.html';
    } else if (group === 'user') {
      window.location.href = 'homepage.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
  
  function validateCredentials(username, password) {
    var adminUsername = 'admin';
    var adminPassword = 'admin123';
    var userUsername = 'user';
    var userPassword = 'user123';
  
    if (username === adminUsername && password === adminPassword) {
      return 'admin';
    } else if (username === userUsername && password === userPassword) {
      return 'user';
    } else {
      return null;
    }
  }
  
  