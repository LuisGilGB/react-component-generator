const argv = require('./config/yargs').argv;

const {pkg, name} = argv;

console.log(`Everything ready for the scaffolding of the new component ${name} with package name ${pkg}`);