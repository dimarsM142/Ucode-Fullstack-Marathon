let start = new Date("01-01-1939");
exports.calculateTime = () => {

    let resultDate = {};
    let now = new Date();
    resultDate.years = () => {
        return now.getFullYear() - start.getFullYear();
    };
    resultDate.months = () => {
        return now.getMonth() - start.getMonth();
    };
    resultDate.days = () => {
        return now.getDate() - start.getDate();
    };
    return resultDate;
}
exports.now = () => {
    let now = new Date();
    return now;
}