function checkBrackets(str) {
    let buff = [];
    if (!(typeof str === "string") || !str.match(/[()]/)) {
      return -1;
    } 
    for (let i = 0; i <= str.length; i++) {
        if (str[i] == ")") {
            buff.push(")");
        }
        if (str[i] == "(") {
            buff.push("(");
        }
      }
      buff = buff.join("");
      for (let counter = 0; counter <= str.length; counter++) {
          buff = buff.replace(/\(\)/, "");
      }
    return buff.length;
  }