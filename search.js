function searchRide() {
    const startLocation = document.getElementById('search-start-location').value;
    const endLocation = document.getElementById('search-end-location').value;
    const date = document.getElementById('search-date').value;
    const time = document.getElementById('search-time').value;

    if (startLocation && endLocation) {
        const rides = getRides().filter(ride => 
            ride.startLocation === startLocation && 
            ride.endLocation === endLocation && 
            (!date || ride.date === date) && 
            (!time || ride.time >= time)
        );
        displayRides(rides);
    } else {
        alert('Please fill in all required fields');
    }
}

function getRides() {
    const rides = JSON.parse(localStorage.getItem('rides'));
    return rides ? rides : [];
}

function displayRides(rides) {
    const ridesList = document.getElementById('rides-list');
    ridesList.innerHTML = '';
    
    if (rides.length === 0) {
        ridesList.innerHTML = '<p>No available rides matching your criteria.</p>';
    } else {
        rides.forEach(ride => {
            if (ride.riders.length < ride.seats) {
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
                    <button onclick="joinRide('${ride.startLocation}', '${ride.endLocation}', '${ride.date}', '${ride.time}', '${ride.host}')">Join Ride</button>
                `;
                ridesList.appendChild(rideElement);
            }
        });
    }

    document.getElementById('search-results').classList.remove('hidden');
}

function joinRide(startLocation, endLocation, date, time, host) {
    const currentUser = localStorage.getItem('currentUser');
    const rides = getRides();

    for (let ride of rides) {
        if (ride.startLocation === startLocation && ride.endLocation === endLocation && ride.date === date && ride.time === time && ride.host === host) {
            if (!ride.riders.includes(currentUser)) {
                ride.riders.push(currentUser);
                saveRides(rides);
                alert('You have joined the ride.');
                window.location.href = `rideDetails.html?startLocation=${startLocation}&endLocation=${endLocation}&date=${date}&time=${time}&host=${host}`;
                return;
            } else {
                alert('You are already part of this ride.');
                return;
            }
        }
    }
}
function home() {
    window.location.href = 'home.html';
}



function logout() {
    window.location.href = 'index.html';
}

function saveRides(rides) {
    localStorage.setItem('rides', JSON.stringify(rides));
}

function logout() {
    window.location.href = 'index.html';
}
