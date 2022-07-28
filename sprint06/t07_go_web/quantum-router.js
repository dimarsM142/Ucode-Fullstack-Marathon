let start = new Date("01-01-1939");
let difference = 7;

exports.calculateTime = () => {
    let resultDate = [];
    let currentDate = new Date();
    console.log(`${currentDate} -- ${start}`);

    currentDate = new Date(Math.round((currentDate.getTime() - start.getTime()) / difference + start.getTime()));
    resultDate.push(currentDate.getFullYear() - start.getFullYear());
    resultDate.push(currentDate.getMonth() - start.getMonth());
    resultDate.push(currentDate.getDate() - start.getDate());
    return resultDate;
}
exports.currentDate = () => {
    let currentDate = new Date();
    currentDate = new Date(Math.round((currentDate.getTime() - start.getTime()) / difference + start.getTime()));
    return currentDate;
}