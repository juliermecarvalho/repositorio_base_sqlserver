var http = require('http');
var port = process.env.port || 1337;
global.__base = __dirname;
var app = require(__base + '/config/express')();
var repository = require(__base + '/repositories/repository')({ table: 'DUVIDAS_FREQUENTES' });

//var g = global;

http.createServer(app).listen(port, function () {
   
    
    
    
    
    console.log('Express Server escutando na porta ' + port);

    repository.findById({ id: '4' }).sucess(function (recordset) {
        // ... error checks 
        
        console.dir(recordset);
    });

});



//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);