function updateTime() {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);
