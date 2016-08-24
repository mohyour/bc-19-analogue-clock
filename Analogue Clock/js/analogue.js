document.addEventListener('DOMContentLoaded', startTimer);
  // Get timezone data from api
  $.get("http://api.timezonedb.com/v2/list-time-zone?key=4E8GH2Z6KVYV&format=json",function(data){
    zones = data.zones;
    // Get zone names and offsets from api data
    var properzones = [];
    zones.map(function(currentzone){
        properzones.push([currentzone.zoneName,(currentzone.gmtOffset/3600)]);
    })
    // Parse timezone and offsets into html
    var options = '';
    properzones.forEach(function(item){
        options += '<option value='+item[1]+'>' + item[0] + '</option>';
    })
    document.getElementById('tzSelect').innerHTML = options
    });

  //Set time interval
function startTimer() {
    setInterval(displayTime, 1000);
    displayTime();
}

    //function to get current time
function displayTime() {
    var now = new Date();

    var offset_value = document.getElementById('tzSelect').value-1
    var hour = now.getHours() + offset_value;
    var minute = now.getMinutes();
    var second = now.getSeconds();

    var timeString = formatHour(hour) + ":" + addZero(minute) + ":" + addZero(second) + " " + getPeriod(hour);
    document.querySelector("#current-time").innerHTML = timeString;

     // --- Analog clock ---//
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");

    //make changes to the clock size
    var clockRadius = 180;

    // Centers the clock in the canvas
    var clockX = canvas.width / 2;
    var clockY = canvas.height / 2;

    Math.TAU = 2 * Math.PI;

   function drawArm(progress, armThickness, armLength, armColor) {
    var armRadians = (Math.TAU * progress) - (Math.TAU/4);
    var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
    var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

    context.lineWidth = armThickness;
    context.strokeStyle = armColor;

    context.beginPath();
    context.moveTo(clockX, clockY); // Start at the center
    context.lineTo(targetX, targetY); // Draw a line outwards
    context.stroke();
}
context.clearRect(0, 0, canvas.width, canvas.height);
drawArm(hour / 12, 5, 0.30, '#000000'); // Hour
drawArm(minute / 60,  2, 0.50, '#000000'); // Minute
drawArm(second / 60,  1, 0.55, '#FF0000'); // Second

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
