function getTime(){
    console.clear();
    current_date = new Date();
    console.log(current_date.getHours(),":",current_date.getMinutes(),":",current_date.getSeconds());
  }
  
setInterval(getTime,1*1000);