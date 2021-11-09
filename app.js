const http = require('http');
const fs = require('fs');

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write('Error : File not found.');
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const url = req.url;
    switch (url) {
      case '/about':
        renderHTML('./public/about.html', res);
        break;

      case '/contact':
        renderHTML('./public/contact.html', res);
        break;

      default:
        renderHTML('./public/index.html', res);
        break;
    }
    // if (url === '/about') {
    //   renderHTML('./public/about.html', res);
    // } else if (url === '/contact') {
    // } else {
    //   renderHTML('./public/index.html', res);
    // }
  })
  .listen(3000, () => {
    console.log('Server is listening on port 3000...');
    console.log('Check here! : http://localhost:3000');
  });
