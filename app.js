// Core Module

// File System
const fs = require('fs');

// Menulis string ke file (sync)
// try {
//     fs.writeFileSync('string.txt', 'Hello World');
// } catch (error) {
//     console.log(error);
// }

// Menulis string ke file (async)
// fs.writeFile('data/string.txt', 'Async Hello World', (err) => {
//   console.log(err);
// });

// Membaca isi file (sync)
// const syncRead = fs.readFileSync('data/string.txt', 'utf-8');
// console.log(syncRead);

// Membaca isi file (async)
// const asyncRead = fs.readFile('data/string.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukkan Nama Anda : ', (nama) => {
  rl.question('Masukkan Nomor HP Anda : ', (noHP) => {
    const contact = {nama, noHP};
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log("Terima kasih telah memasukkan data");
    rl.close();
  });
});
