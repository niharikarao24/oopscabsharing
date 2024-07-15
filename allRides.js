document.addEventListener('DOMContentLoaded', () => {
    displayAllRides();
});

function getRides() {
    const rides = JSON.parse(localStorage.getItem('rides'));
    return rides ? rides : [];
}

function saveRides(rides) {
    localStorage.setItem('rides', JSON.stringify(rides));
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    return users ? users : [];
}

function displayAllRides() {
    const ridesList = document.getElementById('rides-list');
    const rides = getRides();
    const currentUser = getCurrentUser();
    const users = getUsers();
    const user = users.find(user => user.username === currentUser);
    
    ridesList.innerHTML = '';
    
    if (rides.length === 0) {
        ridesList.innerHTML = '<p>No available rides.</p>';
    } else {
        rides.forEach(ride => {
            const rideElement = document.createElement('div');
            rideElement.className = 'ride';
            rideElement.innerHTML = `
                <p>From: ${ride.startLocation}</p>
                <p>To: ${ride.endLocation}</p>
                <p>Date: ${ride.date}</p>
                <p>Time: ${ride.time}</p>
                <p>Seats: ${ride.seats}</p>
                <p>Driver: ${ride.driverDetails ? ride.driverDetails : 'No driver found'}</p>
                <p>Host: ${ride.host}</p>
                <p>Riders: ${ride.riders.join(', ')}</p>
                ${user.role === 'driver' && !ride.driverDetails ? `<button onclick="becomeDriver('${ride.startLocation}', '${ride.endLocation}', '${ride.date}', '${ride.time}', '${ride.host}')">Become Driver for this Ride</button>` : ''}
            `;
            ridesList.appendChild(rideElement);
        });
    }
}

function becomeDriver(startLocation, endLocation, date, time, host) {
    const currentUser = getCurrentUser();
    const rides = getRides();
    const users = getUsers();
    const user = users.find(user => user.username === currentUser);

    for (let ride of rides) {
        if (ride.startLocation === startLocation && ride.endLocation === endLocation && ride.date === date && ride.time === time && ride.host === host) {
            ride.driverDetails = `Name: ${user.name}, Phone: ${user.phone}, Car Model: ${user.carModel}, Car Number: ${user.carNumber}`;
            saveRides(rides);
            alert('You have become the driver for this ride.');
            window.location.reload();
            return;
        }
    }
}

function home() {
    window.location.href = 'home.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
