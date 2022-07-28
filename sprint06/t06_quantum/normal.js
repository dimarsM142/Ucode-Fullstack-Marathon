exports.calculateTime = function() {
    let norm_date = new Date(1939, 1, 1)
    let curr_date = new Date()

    Date.prototype.years = () => { 
        return curr_date.getFullYear() - norm_date.getFullYear(); 
    }
    Date.prototype.months = () => { 
        return curr_date.getMonth() - norm_date.getMonth(); 
    }
    Date.prototype.days = () => { 
        return curr_date.getDate() - norm_date.getDate(); 
    }

    return norm_date;
}
