function updateTime() { 
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes    + ' ' + period;
    document.getElementById('time').innerHTML = timeString;
}
setInterval(updateTime, 1000);
document.addEventListener('DOMContentLoaded', function() { 
    var today = new Date();
    var dateElement = document.getElementById('date');
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
});
