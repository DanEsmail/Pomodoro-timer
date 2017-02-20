var workTimer = 25;
var breakTimer = 4;
// 0 = work/ 1 = break
var timerStatus = 0;
// 0 = off / 1 = on
var clockStatus = 0;
// minutes and seconds
var minutes = 0;
var seconds = 0;

var workInterval;
var breakInterval;

function runTimer(clock,interval) {
  //$("#clock").html(clock);
  //console.log(minutes + ":" + seconds);
  if (minutes === 0 && seconds === 0) {
    console.log(minutes + ":" + seconds)
    switch(timerStatus){
      case 0:
        timerStatus = 1;
        break;
      case 1:
        timerStatus = 0;
        break;
    }
    clearInterval(interval)
    switchClocks()

  } else if (seconds == 0) {
    minutes -= 1;
    seconds = 59;
    $("#clock").html(minutes + ":" + seconds);
  } else if( seconds < 11 && seconds > 0) {
    seconds -=1;
    $("#clock").html(minutes + ":0" + seconds);

  }else {
    seconds -= 1;
    $("#clock").html(minutes + ":" + seconds);
  }

}
// function to switch what the clocks are doing
function switchClocks() {
  if(timerStatus == 0){
  minutes = workTimer;
    $("#clock").html(workTimer + ":00");
  workInterval = setInterval(function(){runTimer(workTimer,workInterval)}, 1000);
  }else{
    $("#clock").html(breakTimer + ":00");
  minutes = breakTimer;
  breakInterval = setInterval(function(){runTimer(workTimer,breakInterval)}, 1000);
}
}
//adding and subtracting time.
//worktimer buttons
$("#work-add").click(function() {
  workTimer += 1;
  $("#work-timer").html(workTimer);
})
$("#work-sub").click(function() {
  if (workTimer > 0) {
    workTimer -= 1;
    $("#work-timer").html(workTimer);
  }
})

//breakTimer buttons
$("#break-add").click(function() {
  breakTimer += 1;
  $("#break-timer").html(breakTimer);
})
$("#break-sub").click(function() {
  if (breakTimer > 0) {
    breakTimer -= 1;
    $("#break-timer").html(breakTimer);
  }
})

$("#start-button").click(function() {
  if(clockStatus == 0){
    switchClocks();
    $("#start-button").html("reset");
    clockStatus = 1
  }else{
    $("#clock").html("0");
    $("#start-button").html("start");
    seconds = 0;
    clockStatus = 0;

    if(timerStatus === 0){
      clearInterval(workInterval);
    }else{
      clearInterval(breakInterval);
      timerStatus = 0;
    }
  }

})
$(document).ready(function(){
  $("#work-timer").html(workTimer);
  $("#break-timer").html(breakTimer);
})
