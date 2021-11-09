const yargs = require('yargs');
const { simpanContact } = require('./contacts');

// Mengambil argument dari command line

yargs.command({
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
});

yargs.parse();