const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

// Mengambil argument dari command line

yargs
  .command({
    command: 'add',
    describe: 'Menambah contact baru',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
      noHP: {
        describe: 'Nomer HP',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        noHP: argv.noHP,
      };
      simpanContact(argv.nama, argv.noHP);
    },
  })
  .demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no HP contact',
  handler() {
    listContact();
  },
});

// menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});


yargs.parse();
