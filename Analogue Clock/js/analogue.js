document.addEventListener('DOMContentLoaded', displayTime);

    //function to get current time
function displayTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    var timeString = formatHour(hour) + ":" + addZero(minute) + ":" + addZero(second) + " " + getPeriod(hour);
document.querySelector("#current-time").innerHTML = timeString;
}
    // Function wil add extra zero to the time to display 2 digits
function addZero(num) {
    if (num < 10) {
        return "0" + String(num);
    }
    else {
        return String(num);
    }
}
    // formats 24hrs to 12hrs
function formatHour(hour) {
    var new_hour = hour % 12;
    if (new_hour == 0) {
        hour = 12;
    }
    return String(new_hour)
}
// returns AM if hour is less than 12 and PM if not
function getPeriod(hour) {
    return (hour < 12) ? "AM" : "PM";
}
