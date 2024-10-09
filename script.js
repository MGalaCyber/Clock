let wakeLock = null;

function displayTime() {
    var now = new Date();
    var getYear = now.getFullYear();
    var getHours = now.getHours();
    var getMinutes = now.getMinutes();
    var getSeconds = now.getSeconds();

    getHours = (getHours < 10) ? "0" + getHours : getHours;
    getMinutes = (getMinutes < 10) ? "0" + getMinutes : getMinutes;
    getSeconds = (getSeconds < 10) ? "0" + getSeconds : getSeconds;

    var timeString = getHours + ":" + getMinutes;
    document.getElementById("clock-hm").childNodes[0].nodeValue = timeString;
    document.getElementById("clock-sc").innerHTML = getSeconds;

    document.getElementById("year-background").innerText = getYear;

    setTimeout(displayTime, 1000);
}

function displayMiniSeconds() {
    var now = new Date();
    var getMiliSeconds = now.getMilliseconds();

    getMiliSeconds = (getMiliSeconds < 100) ? "0" + getMiliSeconds : getMiliSeconds;

    document.getElementById("clock-ms").innerHTML = getMiliSeconds;
    setTimeout(displayMiniSeconds, 0);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active.');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            wakeLock = null;
            console.log('Wake Lock has been released.');
        });
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        requestWakeLock(); // Request Wake Lock when entering fullscreen
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            releaseWakeLock(); // Release Wake Lock when exiting fullscreen
        }
    }
}

function fullscreenChange() {
    var fullscreenBtn = document.getElementById('fullscreen-btn');
    if (document.fullscreenElement) {
        fullscreenBtn.style.display = 'none';
        requestWakeLock(); // Ensure Wake Lock is requested if fullscreen
    } else {
        fullscreenBtn.style.display = 'block';
        releaseWakeLock(); // Release Wake Lock when not fullscreen
    }
}

document.addEventListener('fullscreenchange', fullscreenChange);

displayTime();
displayMiniSeconds();