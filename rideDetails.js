document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const startLocation = urlParams.get('startLocation');
    const endLocation = urlParams.get('endLocation');
    const date = urlParams.get('date');
    const time = urlParams.get('time');
    const host = urlParams.get('host');
    
    displayRideDetails(startLocation, endLocation, date, time, host);
});

function getRides() {
    const rides = JSON.parse(localStorage.getItem('rides'));
    return rides ? rides : [];
}

function displayRideDetails(startLocation, endLocation, date, time, host) {
    const rideInfo = document.getElementById('ride-info');
    const rides = getRides();

    for (let ride of rides) {
        if (ride.startLocation === startLocation && ride.endLocation === endLocation && ride.date === date && ride.time === time && ride.host === host) {
            rideInfo.innerHTML = `
                <p>From: ${ride.startLocation}</p>
                <p>To: ${ride.endLocation}</p>
                <p>Date: ${ride.date}</p>
                <p>Time: ${ride.time}</p>
                <p>Seats: ${ride.seats}</p>
                <p>Driver: ${ride.driverDetails}</p>
                <p>Host: ${ride.host}</p>
                <p>Riders: ${ride.riders.join(', ')}</p>
            `;
            break;
        }
    }
}

function logout() {
    window.location.href = 'index.html';
}
