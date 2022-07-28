let symbolsCalc = ['+', '-', '*', '/', '=', '%', '^', '&#8730'];
let memory = [];
let memSym = [];
let history = '...';
let screenMem = '';
let checkPoint = false;
let checkIntrst = false;
let checkSym = true;
let checkFinish = true;
let checkLokPoint = true;

document.querySelector(".input").textContent = '0';

function pressedNum(numb) {
    if(checkFinish) {
        document.querySelector(".input").innerHTML = '';
        checkFinish = false;
    }
    document.querySelector(".input").innerHTML += String(numb);
    screenMem += '' + String(numb);
    console.log('Value of screenMemory:', screenMem);
    checkSym = false;
    checkIntrst = false;
    checkPoint = false;
}

function calcPoint() {
    if(checkPoint) {
        document.querySelector(".input").innerHTML += String(".");
        screenMem += '' + String(".");
        console.log('Value of screenMemory:', screenMem);
        checkPoint = false;
    }
}

function calcClean() {
    memory = [];
    screenMem = '';
    document.querySelector('.input').innerHTML = '0';
    checkFinish = true;
}

function calcSym(numb) {
    if(!checkSym) {
        if(!checkPoint) {
            checkPoint = true;
        }
        if(!checkIntrst) {
            console.log("op");
            console.log(screenMem);
            if(memory[memory.length-1] !== screenMem) {
                memory.push(screenMem);
            }
        }
        document.querySelector('.input').innerHTML += symbolsCalc[numb];
        memory.push(symbolsCalc[numb]);
        screenMem = '';
        console.log('Memory:', memory);
        checkSym = true;
        checkIntrst = false;
    }
}

function cleanCalc() {
    let temp = memory.length;
    for (let i = 0; i < temp; i++) {
        if(memory[i] === '') {
            memory.splice(i, 1);
        }
        else if(i > 0 && memory[i-1] == memory[i]) {
            memory.splice(i-1,1);
        }
    }
}

function calcResult() {
    if(!checkPoint) {
        memory.push(screenMem);
        let countPer = 0;
        let countFac = 0;
        let countRoot = 0;
        for(let i = 0; i <=memory.length; i++) {
            if(memory[i] === '%') {
                countPer++;
            }
            if(memory[i] == '!') {
                countFac++;
            }
            if(memory[i] == '&#8730') {
                countRoot++;
            }
        }
        for(let i = 0; i <= memory.length; i++) {
            if(countPer === 0 && countFac === 0 && countRoot === 0) {
                if (memory[i] === '+') {
                    cleanCalc();
                    let result = Number(memory[i-1]) + Number(memory[i+1]);
                    memory.splice(i-1, 2);
                    memory[i-1] = result;
                    i = i - 1;
                    document.querySelector('.input').innerHTML = result;
                    screenMem = result;
                    console.log(memory);
                }
                else if (memory[i] === '-') {
                    cleanCalc();
                    let result = Number(memory[i-1]) - Number(memory[i+1]);
                    memory.splice(i-1, 2);
                    memory[i-1] = result;
                    i = i - 1;
                    document.querySelector('.input').innerHTML = result;
                    screenMem = result;
                    console.log(memory);
                }
                else if (memory[i] === '*') {
                    cleanCalc();
                    let result = Number(memory[i-1]) * Number(memory[i+1]);
                    memory.splice(i-1, 2);
                    memory[i-1] = result;
                    i = i - 1;
                    document.querySelector('.input').innerHTML = result;
                    screenMem = result;
                    console.log(memory);
                }
                else if (memory[i] === '/') {
                    cleanCalc();
                    let result = Number(memory[i-1]) / Number(memory[i+1]);
                    memory.splice(i-1, 2);
                    memory[i-1] = result;
                    i = i - 1;
                    document.querySelector('.input').innerHTML = result;
                    screenMem = result;
                    console.log(memory);
                }
                else if (memory[i] === '^') {
                    cleanCalc();
                    let result = Math.pow(memory[i-1], memory[i+1]);
                    memory.splice(i-1, 2);
                    memory[i-1] = result;
                    i = i - 1;
                    document.querySelector('.input').innerHTML = result;
                    screenMem = result;
                    console.log(memory);
                }
            }
            else if(memory[i] === '%') {
                cleanCalc();
                let result = Number(memory[i-1]) / 100;
                memory.splice(i, 1);
                memory[i-1] = result;
                i = i-1;
                document.querySelector('.input').innerHTML = result;
                screenMem = result;
                console.log(memory);
                countPer--;
                if(countPer == 0) {
                    i = 0;
                }
            }
            else if(memory[i] === '!') {
                cleanCalc();
                let result = 1;
                console.log(memory[i-1])
                for(let j = memory[i-1]; j >0; j--) {
                    console.log(result);
                    result *= j;
                }
                memory.splice(i, 1);
                memory[i-1] = result;
                i = i-1;
                document.querySelector('.input').innerHTML = result;
                screenMem = result;
                console.log(memory);
                countFac--;
                if(countFac == 0) {
                    i = 0;
                }
            }
            else if(memory[i] === '&#8730') {
                cleanCalc();
                let result = Math.sqrt(memory[i-1]);
                memory.splice(i, 1);
                memory[i-1] = result;
                i = i-1;
                document.querySelector('.input').innerHTML = result;
                screenMem = result;
                console.log(memory);
                countRoot--;
                if(countRoot == 0) {
                    i = 0;
                }
            }
        }
        cleanCalc();
        console.log(memory);
        history = memory[0];
        document.querySelector(".history").innerHTML = history;
        console.log(history);
        checkPoint = true;
    }
}

function swapSymb() {
    screenMem *= -1;
    document.querySelector(".input").innerHTML = '';
    document.querySelector(".input").innerHTML += screenMem;
}

function calcSymIntrst() {
    if(!checkPoint && !checkSym && !checkIntrst) {
        memory.push(screenMem);
        document.querySelector(".input").innerHTML += String("%");
        screenMem = '';
        memory.push("%");
        console.log('Memory:', memory);
        console.log('Value of screenMemory:', screenMem);
        checkIntrst = true;
    }
}

function memRead() {
    document.querySelector(".input").innerHTML = String(history);
    screenMem = '' + String(history);
    memory = [];
    memory.push(history);
    console.log('Value of screenMemory:', screenMem);
    checkSym = false;
    checkIntrst = false;
}

function memClean() {
    history = '...';
    document.querySelector(".history").textContent = '...';
}

function memCon() {
    if(!checkIntrst && history != '...') {
        calcSym(0);
        pressedNum(history);
        calcResult();
    }
}

function memSub() {
    if(!checkIntrst && history != '...') {
        calcSym(1);
        pressedNum(history);
        calcResult();
        memory = [];
        document.querySelector('.input').innerHTML = '0';
        checkFinish = true;
    }
}

function calcFact() {
    if(!checkPoint && !checkSym && !checkIntrst) {
        memory.push(screenMem);
        document.querySelector(".input").innerHTML += String("!");
        screenMem = '';
        memory.push("!");
        console.log('Memory:', memory);
        console.log('Value of screenMemory:', screenMem);
        checkIntrst = true;
    }
}

function calcRoot() {
    if(!checkPoint && !checkSym && !checkIntrst) {
        memory.push(screenMem);
        document.querySelector(".input").innerHTML += String("&#8730");
        screenMem = '';
        memory.push("&#8730");
        console.log('Memory:', memory);
        console.log('Value of screenMemory:', screenMem);
        checkIntrst = true;
    }
}