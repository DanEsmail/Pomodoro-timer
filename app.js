var timeSet;
// 0 work timer, 1 break timer
var timerStatus = 0;

function changeTimer(str, change, arr){
  if(change == "plus"){
    arr[0] += 1
    $(str).html(arr[0] + ":00")
  }else{
    if(arr[0] > 0){
      arr[0] -= 1
      $(str).html(arr[0] + ":00")
    }
  }
}

function timer(timer){
  console.log("in")
  var arr = getTime(timer)
  var tick = 100/((arr[0]*60)+ arr[1])
  var percentage = 100;
    timeSet = setInterval(function(){
    if(arr[1] == 0){
      arr[0] -= 1
      arr[1] = 59
      percentage -= tick;
      $("#timer").html(arr[0]+ ":" + arr[1]);
      $(".fill-clock").css("height", percentage+"%")
    }else if(arr[0] == 0 && arr[1] == 1){
      $("#timer").html("0:00");
      $(".fill-clock").css("height", "0%")
      clearInterval(timeSet)
      newTimer()
    }else{
      arr[1] -= 1
      if(arr[1] > 9){
        $("#timer").html(arr[0]+ ":" + arr[1]);
      }else{
        $("#timer").html(arr[0]+ ":0" + arr[1]);
      }
      percentage -= tick;
      $(".fill-clock").css("height", percentage+"%")
    }
  },1000)
}

function newTimer(){
  if(timerStatus == 0){
    timerStatus = 1;
    timer("#break-timer")
  }else{
    timerStatus = 0;
    timer("#work-timer")
  }
}

function getTime(str){
  var time = $(str).html();
  var arr = time.split(":");
  return [parseInt(arr[0]),parseInt(arr[1])]
}


$(document).ready(function(){
  //setting the work timer with buttons
  $("#work-plus").on("click", function(){
    changeTimer("#work-timer", "plus", getTime("#work-timer"))
  })
  $("#work-minus").on("click", function(){
    changeTimer("#work-timer", "minus", getTime("#work-timer"))
  })
  //seting the break timer with buttons
  $("#break-minus").on("click", function(){
    changeTimer("#break-timer", "minus", getTime("#break-timer"))
  })
  $("#break-plus").on("click", function(){
    changeTimer("#break-timer", "plus", getTime("#break-timer"))
  })
  //sarting the clock
  $("#start").on('click', function(){
    timer("#work-timer")
  })
  //pause Timer
  $("#pause").on("click", function(){
    if(timerStatus == 0){
      $("#work-timer").html($("#timer").html())
      clearInterval(timeSet)
    }else{
      $("#break-timer").html($("#timer").html())
      clearInterval(timeSet)
    }

  })
  //stop timer
  $("#stop").on("click",function(){
    $("#timer").html("0:00");
    $(".fill-clock").css("height", "100%")
    clearInterval(timeSet)
  })
})
