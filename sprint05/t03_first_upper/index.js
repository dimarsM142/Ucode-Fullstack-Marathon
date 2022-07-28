exports.firstUpper = function(str) {
    let result;
    if(str == null){
        result = "";
    }
    else{
        result =  str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
    }
    return result;
    
}
