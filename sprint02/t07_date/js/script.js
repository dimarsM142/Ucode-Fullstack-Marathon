function getFormattedDate(dateObject) {
    let formatDate = {
        day: dateObject.getDate(),
        month: dateObject.getMonth() + 1,
        year: dateObject.getFullYear(),
        hour: dateObject.getHours(),
        minute: dateObject.getMinutes(),
        weekday: dateObject.toLocaleString("en-US", {weekday: 'long'})
    }
    function time(time) {
        if(String(time).length === 1){
           return '0' + time;
        }
        else{
          return time;
        }
    }
    function date(date) {
        if(String(date).length === 1){
          return '0' + date;
        } 
        else { 
          return date;
    
        }
    }
    return date(formatDate.day) + "." + date(formatDate.month) + "." + formatDate.year + " " + time(formatDate.hour) + ":" + time(formatDate.minute) + " " +formatDate.weekday;
}