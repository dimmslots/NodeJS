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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, noHP) => {
    const contact = { nama, noHP };
    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();
  
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
};

const listContact = () => {
    const contacts = loadContact();
    console.log('Daftar Contact');
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact) {
        console.log(`${nama} tidak ada di daftar contact!`);
        return false;
    }

    console.log('contact ditemukan!');
    console.log(`Nama kontak : ${contact.nama}`);
    console.log(`No HP kontak : ${contact.noHP}`);
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(contacts.length === newContacts.length) {
        console.log(`${nama} tidak ditemukan!`);
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(`data contact '${nama}' berhasil dihapus!`);
};

module.exports = {simpanContact, listContact, detailContact, deleteContact};