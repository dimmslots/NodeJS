const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// gunakan ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    contacts: contacts,
    msg: req.flash('msg'),
  });
});

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout',
  });
});

// proses data contact
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama contact sudah ada!');
      }
      return true;
    }),
    check('noHP', 'Nomer HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash('msg', 'Data contact berhasil ditambahkan!');
      res.redirect('/contact');
    }
  }
);

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
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
