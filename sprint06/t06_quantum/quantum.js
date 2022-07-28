exports.calculateTime = function() {
    let quant_date_result = [];
    let new_date = new Date();
    let old_date = new Date(1939, 1, 1);
    let diff = (Math.abs(old_date) + Number(new_date)) / 7;
    let quantumDate = new Date(Number(old_date) + Number(diff));


    quant_date_result.push(quantumDate.getFullYear() - old_date.getFullYear());
    quant_date_result.push(quantumDate.getMonth() - old_date.getMonth());
    quant_date_result.push(quantumDate.getDate() - old_date.getDate());
    return quant_date_result;
}