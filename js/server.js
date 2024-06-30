const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8000;

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;

    const mimeType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    fs.exists(pathname, (exist) => {
        if (!exist) {
            fs.readFile(path.join(__dirname, '../404.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end(`Error getting the file: ${err}.`);
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
            return;
        }

        if (fs.statSync(pathname).isDirectory()) pathname += '/index.html';

        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error getting the file: ${err}.`);
            } else {
                const ext = path.parse(pathname).ext;
                res.writeHead(200, {'Content-Type': mimeType[ext] || 'text/plain'});
                res.end(data);
            }
        });
    });

}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);