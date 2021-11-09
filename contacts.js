const fs = require('fs');
const validator = require('validator');


// Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

const simpanContact = (nama, noHP) => {
    const contact = { nama, noHP };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
  
    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        (console.log('Contact sudah ada!'));
        return false;
    }

    // cek email
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log('Nomor HP tidak valid!');
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  
    console.log('Terima kasih telah memasukkan data');
}

module.exports = {simpanContact};