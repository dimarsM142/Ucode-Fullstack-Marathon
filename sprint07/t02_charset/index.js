const e = require("express");
const express = require("express");
const app = express();
const Iconv = require("iconv").Iconv;
const INPUTCHARSET = 1;
const CHECKCHARSET = 2;

app.use(express.urlencoded({ extended: true }));

function viewPage(type, result = "") {
    let input = `<h1>Charset</h1>
        <form action="/" method="POST">
        <label for="text">Change charset:</label>
        <input type="text" name="labelForInput"placeholder="Input string">
        <br><br>
        <span>Select charset or several charsets:</span>
        <select name="charset" id="charset" multiple>
            <option value="UTF-8">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="Windows-1252">Windows-1252</option>
        </select>
        <button type="submit">Change charset</button>
        <button onclick="location.href='/'">Clear</button>
        </form>`;
    let check = `<h1>Charset</h1>
        <form action="/" method="POST">
        <label for="labelForInput">Change charset:</label>
        <input type="text" name="labelForInput"placeholder="Input string">
        <br><br>
        <span>Select charset or several charsets:</span>
        <select name="charset" id="charset" multiple>
            <option value="UTF-8">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="Windows-1252">Windows-1252</option>
        </select>
        <button type="submit">Change charset</button>
        <button onclick="location.href='/'">Clear</button>
        </form>
        ${result}`;
  if (type === INPUTCHARSET) {
    return input;
  }
  if (type === CHECKCHARSET) {
    return check;
  }
}

function ObjToString(typeOfText, inputString) {
    if (typeOfText === "UTF-8") {
        return `<p>${typeOfText}<textarea type="current_charset" cols="20" rows="3" placeholder="${inputString}"></textarea><p>`;
    } 
    else if(typeOfText === "Windows-1252") {
        return `<p>${typeOfText}<textarea type="current_charset" cols="20" rows="3" placeholder="${new Iconv('UTF-8', typeOfText)
        .convert(inputString)
        .toString()}"></textarea><p>`;
    }
    else {
        return `<p>${typeOfText}<textarea type="current_charset" cols="20" rows="3" placeholder="${new Iconv('ISO-8859-1','UTF-8')
            .convert(inputString)
            .toString()
        }"></textarea><p>`;
    }
}

function getCharset(string) {
    let result = `<p>Input string:<textarea type="current_charset" placeholder="${string.labelForInput}" cols="20" rows="3" ></textarea><p>`;
    if (typeof string.charset != "string") {
        string.charset.forEach((item) => {
            result = result + ObjToString(item, string.labelForInput);
        });
        return result;
    } else {
        return result + ObjToString(string.charset, string.labelForInput);
    }
}

app.post("/", (req, res) => {
    let buffer = req.body;
     if (!buffer.labelForInput || !buffer.charset) {
         res.send(viewPage(INPUTCHARSET));
     } else {
         res.send(viewPage(CHECKCHARSET, getCharset(buffer)));
     }
     console.log(buffer);
 });
 
app.get("/", (req, res) => {
  res.send(viewPage(INPUTCHARSET));
});


app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});

