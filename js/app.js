const http = require('http');
const fs = require('http');

const server = http.createServer(function(req, res){
   if(req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream(__dirname + 'index.html').pipe(res);
   }
});


server.listen(3000, '127.0.0.1');