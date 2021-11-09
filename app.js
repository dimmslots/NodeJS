const {simpanContact, pertanyaan} = require('./contacts');

const main = async () => {
  const nama = await pertanyaan('Masukkan Nama Anda : ');
  const noHP = await pertanyaan('Masukkan No HP Anda : ');

  simpanContact(nama, noHP);
};

main();
