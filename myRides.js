document.addEventListener('DOMContentLoaded', () => {
    displayMyRides();
});

function getRides() {
    const rides = JSON.parse(localStorage.getItem('rides'));
    return rides ? rides : [];
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function displayMyRides() {
    const myRidesList = document.getElementById('my-rides-list');
    const rides = getRides();
    const currentUser = getCurrentUser();

    myRidesList.innerHTML = '';

    const hostedRides = rides.filter(ride => ride.host === currentUser);
    const participatedRides = rides.filter(ride => ride.riders.includes(currentUser) && ride.host !== currentUser);

    if (hostedRides.length === 0 && participatedRides.length === 0) {
        myRidesList.innerHTML = '<p>No rides to display.</p>';
    } else {
        if (hostedRides.length > 0) {
            myRidesList.innerHTML += '<h3>Hosted Rides</h3>';
            hostedRides.forEach(ride => {
                const rideElement = document.createElement('div');
                rideElement.className = 'ride';
                rideElement.innerHTML = `
                    <p>From: ${ride.startLocation}</p>
                    <p>To: ${ride.endLocation}</p>
                    <p>Date: ${ride.date}</p>
                    <p>Time: ${ride.time}</p>
                    <p>Seats: ${ride.seats}</p>
                    <p>Driver: ${ride.driverDetails}</p>
                    <p>Host: ${ride.host}</p>
                    <p>Riders: ${ride.riders.join(', ')}</p>
                `;
                myRidesList.appendChild(rideElement);
            });
        }

        if (participatedRides.length > 0) {
            myRidesList.innerHTML += '<h3>Participated Rides</h3>';
            participatedRides.forEach(ride => {
                const rideElement = document.createElement('div');
                rideElement.className = 'ride';
                rideElement.innerHTML = `
                    <p>From: ${ride.startLocation}</p>
                    <p>To: ${ride.endLocation}</p>
                    <p>Date: ${ride.date}</p>
                    <p>Time: ${ride.time}</p>
                    <p>Seats: ${ride.seats}</p>
                    <p>Driver: ${ride.driverDetails}</p>
                    <p>Host: ${ride.host}</p>
                    <p>Riders: ${ride.riders.join(', ')}</p>
                `;
                myRidesList.appendChild(rideElement);
            });
        }
    }
}
function home() {
    window.location.href = 'home.html';
}

function logout() {
    window.location.href = 'index.html';
}


function logout() {
    window.location.href = 'index.html';
}
