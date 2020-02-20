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
    version: '0.1.0',
    devDependencies: {
        "@babel/cli": "^7.7.4",
        "@babel/core": "^7.6.4",
        "@babel/preset-env": "^7.6.3",
        "@babel/preset-react": "^7.6.3",
        "babel-loader": "^8.0.6",
        "css-loader": "^3.2.0",
        "html-webpack-plugin": "^3.2.0",
        "nodemon": "^1.19.4",
        "react": "^16.8.6",
        "react-dom": "^16.8.6",
        "style-loader": "^1.0.0",
        "webpack": "^4.41.5",
        "webpack-cli": "^3.3.9",
        "webpack-dev-server": "^3.9.0"
    },
    peerDependencies: {
        "react": "^16.8.6",
        "react-dom": "^16.8.6"
    }
}

// Writes the package.json file for the new module.
fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
);

// Reads all the files in the template directory.
fs.readdir(path.join(__dirname, './template'), (err, files) => {
    if (err) {
        console.error('An error happened while trying to read the directory files');
        console.error(err);
    } else {
        console.log('The template files have been successfully read');
        console.log(files);
        // Writes the template files into the destination folder.
        files.forEach(fileName => {
            fs.readFile(path.join(__dirname, `./template/${fileName}`), (err, file) => {
                if (err) {
                    console.error(`An error happened while trying to read the file ${fileName}`);
                    console.error(err);
                } else {
                    console.log('Will copy file');
                    console.log(typeof file);
                    fs.writeFileSync(path.join(rootDir, fileName), file);
                }
            });
        })
    }
})

const originalDirectory = process.cwd();
process.chdir(rootDir);