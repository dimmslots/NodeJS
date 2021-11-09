const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('dimas@gmail.com'));
// console.log(validator.isMobilePhone('0895365891088', ''));
// console.log(validator.isNumeric('0895365891088a'));

const pesan = chalk`Warna yang ditampilkan adalah {bgRed.black Merah}`;
console.log(pesan);
console.log(chalk.bgBlue.black('Hello World'));