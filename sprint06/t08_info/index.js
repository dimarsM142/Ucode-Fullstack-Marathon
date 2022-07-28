const process = require('process');
const path = require('path');
const os = require('os');
const express = require('express');
const application = express();

application.listen(3000,"127.0.0.1", function(){
    console.log("Open http://127.0.0.1:3000/ \nPress Ctrl+C to stop server");
});
application.get('/', function(request, response){
    console.log(render(request));
    let finishResult = `View the result in the development environment logs - refresh the page to update the result</br>`;
    finishResult = finishResult + `View GET request parameters  <a href="?one=1&two=eee&three=234">>>>></a>`;
    response.send(finishResult);

});

function render(request) {
    let finishResult = '';
    
    finishResult = finishResult + loginOfPerson(`arguments passed to the script`, process.argv.map((item) => {return item;}));
    finishResult = finishResult + loginOfPerson(`a name of file of the executed script`, path.basename(__filename));
    finishResult = finishResult + loginOfPerson(`IP address of the server`, os.networkInterfaces().en0[1].address);
    finishResult = finishResult + loginOfPerson(`a name of host that invokes the current script`, os.hostname());
    finishResult = finishResult + loginOfPerson(`User-Agent information`, request.headers["user-agent"]);
    finishResult = finishResult + loginOfPerson(`IP address of the client`, request.connection.remoteAddress);
    finishResult = finishResult + loginOfPerson(`a name and a version of the information protocol`, request.protocol);
    finishResult = finishResult + loginOfPerson(`a query method`, request.method);
    finishResult = finishResult + loginOfPerson(`a list of parameters passed by URL`, JSON.stringify(request.query));
    return finishResult;
}

function loginOfPerson(name, value) {
    let finishResult = '';
    finishResult = finishResult + "-------> " + name + " <--------\n";
    finishResult = finishResult + '-------> start <--------\n';
    finishResult = finishResult +  value + '\n';
    finishResult = finishResult + '-------> end <--------\n\n';
    return finishResult;
}