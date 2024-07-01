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

function fullscreenChange() {
    var fullscreenBtn = document.getElementById('fullscreen-btn');
    if (document.fullscreenElement) {
        fullscreenBtn.style.display = 'none';
    } else {
        fullscreenBtn.style.display = 'block';
    }
}

document.addEventListener('fullscreenchange', fullscreenChange);

displayTime();
displayMiniSeconds();