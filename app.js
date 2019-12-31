const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const argv = require('./config/yargs').argv;

const {pkg, name} = argv;

console.log(`Everything ready for the scaffolding of the new component ${name} with package name ${pkg}`);

const rootDir = path.resolve(pkg);

fs.ensureDirSync(pkg);

// Rutina para detener la creación en caso de que no sea seguro crearlo por conflictos
// con archivos previamente existentes.
// TODO: función isSafeToCreateProjectIn
// if (!isSafeToCreateProjectIn(rootDir, name)) {
//     process.exit(1);
// }

console.log();
console.log(`A new React component package will be created at ${rootDir}`);
console.log();

const packageJson = {
    name: pkg,
    version: '0.1.0'
}

fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
);

const originalDirectory = process.cwd();
process.chdir(rootDir);