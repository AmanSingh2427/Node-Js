const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New request recieved\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        
        switch(req.url){
            case '/':
                res.end("This is home page");
                break;
            case '/about':
                res.end("Hello I am Aman Singh");
                break;
            default:
                res.end("Error 404")
        }
    })
})
// console.log(req.headers);
// console.log("New Request Received");

myServer.listen(8000, () => {
    console.log("Server is running on port 8000");
});

