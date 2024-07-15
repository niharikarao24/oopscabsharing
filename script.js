function showSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function showLoginForm() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function toggleDriverFields() {
    const role = document.getElementById('signup-role').value;
    const driverFields = document.getElementById('driver-fields');
    if (role === 'driver') {
        driverFields.classList.remove('hidden');
    } else {
        driverFields.classList.add('hidden');
    }
}

function getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    return users ? users : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', user.username);
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password');
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    const gender = document.getElementById('signup-gender').value;
    const profilePictureInput = document.getElementById('signup-profile-picture');
    const profilePicture = profilePictureInput.files[0];
    const users = getUsers();

    if (users.find(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        let user = { username, password, role, gender, profilePicture: e.target.result };
        if (role === 'driver') {
            const name = document.getElementById('driver-name').value;
            const phone = document.getElementById('driver-phone').value;
            const carModel = document.getElementById('driver-car-model').value;
            const carNumber = document.getElementById('driver-car-number').value;
            user = { ...user, name, phone, carModel, carNumber };
        }
        users.push(user);
        saveUsers(users);
        alert('Account created successfully');
        showLoginForm();
    };
    reader.readAsDataURL(profilePicture);
}
