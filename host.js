function hostRide() {
    const startLocation = document.getElementById('start-location').value;
    const endLocation = document.getElementById('end-location').value;
    const seats = document.getElementById('seats').value;
    const date = document.getElementById('ride-date').value;
    const time = document.getElementById('ride-time').value;
    const driverDetails = document.getElementById('driver-details').value || 'No driver found';
    const currentUser = localStorage.getItem('currentUser');

    if (startLocation && endLocation && seats && date && time && driverDetails) {
        const ride = { startLocation, endLocation, seats, date, time, driverDetails, host: currentUser, riders: [currentUser] };
        saveRide(ride);
        alert(`Ride hosted from ${startLocation} to ${endLocation} on ${date} at ${time} with ${seats} seats.`);
    } else {
        alert('Please fill in all fields');
    }
}

function getRides() {
    const rides = JSON.parse(localStorage.getItem('rides'));
    return rides ? rides : [];
}

function saveRides(rides) {
    localStorage.setItem('rides', JSON.stringify(rides));
}

function saveRide(ride) {
    const rides = getRides();
    rides.push(ride);
    saveRides(rides);
}

function home() {
    window.location.href = 'home.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
