const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const { loadContact } = require('./utils/contacts');

// gunakan ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);

app.get('/', (req, res) => {
  // res.sendFile('./public/index.html', { root: __dirname });
  const mahasiswa = [
    {
      nama: 'Dimas Adi P',
      nim: '0074',
    },
    {
      nama: 'Adi Dimas Q',
      nim: '0088',
    },
    {
      nama: 'Pangestu Dimas R',
      nim: '0140',
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Halaman Home',
    namepage: 'index.html',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
    namepage: 'about.html',
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    namepage: 'contact.html',
    contacts: contacts
  });
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('Page not found.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const fs = require('fs');

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write('Error : File not found.');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//     });
//     const url = req.url;
//     switch (url) {
//       case '/about':
//         renderHTML('./public/about.html', res);
//         break;

//       case '/contact':
//         renderHTML('./public/contact.html', res);
//         break;

//       default:
//         renderHTML('./public/index.html', res);
//         break;
//     }
//   })
//   .listen(3000, () => {
//     console.log('Server is listening on port 3000...');
//     console.log('Check here! : http://localhost:3000');
//   });
