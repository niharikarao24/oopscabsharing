document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.username === currentUser);
        if (user) {
            showAccountDetails(user);
        }
    }
});

function showAccountDetails(user) {
    let accountInfo = `Username: ${user.username}\nRole: ${user.role}\nGender: ${user.gender}`;
    if (user.role === 'driver') {
        accountInfo += `\nName: ${user.name}\nPhone: ${user.phone}\nCar Model: ${user.carModel}\nCar Number: ${user.carNumber}`;
    }
    document.getElementById('account-info').innerText = accountInfo;
    document.getElementById('account-profile-picture').src = user.profilePicture;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function home() {
    window.location.href = 'home.html';
}
