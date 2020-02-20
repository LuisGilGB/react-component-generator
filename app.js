const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const {getLast} = require('@luisgilgb/js-utils');

const argv = require('./config/yargs').argv;

const {name: moduleName, dirName: moduleDirName = getLast(moduleName.split('/'))} = argv;

const capitalize = str => str.length ? `${str.charAt(0).toUpperCase()}${str.substring(1)}` : str;

const cmpName = getLast(moduleName.split('/')).split('-').map(s0 => capitalize(s0)).join('');

console.log(`Everything ready for the scaffolding of the new component ${cmpName}, with the NodeJS module being named ${moduleName}, at the directory ${moduleDirName}`);

const rootDir = path.resolve(moduleDirName);
const TEMPLATE_DIR = path.join(__dirname, './template');

fs.ensureDirSync(moduleDirName);

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
    name: moduleName,
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

const customizeFile = file => file.split('{{{MODULE_NAME}}}').join(moduleName).split('{{{CMP_NAME}}}').join(cmpName);

const readdir = (srcPath, opts, filesCallback) => {
    fs.readdir(`${TEMPLATE_DIR}${srcPath}`, opts, (err, files) => {
        if (err) {
            console.error(`An error happened while trying to read the directory files at ${TEMPLATE_DIR}${srcPath}`);
            console.error(err);
        } else {
            console.log(`The template files at ${TEMPLATE_DIR}${srcPath} have been successfully read`);
            console.log(files.map(({name}) => name));
            filesCallback(srcPath, opts, files);
        }
    });
}

const templateDirRecursiveStep = (srcPath, opts, files) => {
    // Writes the template files into the destination folder.
    files.forEach(dirItem => {
        const {name} = dirItem;
        const nextPath = `${srcPath}/${name}`;
        if (dirItem.isFile()) {
            copyFile(nextPath);
        } else if (dirItem.isDirectory()) {
            fs.ensureDirSync(path.join(rootDir, nextPath));
            readdir(nextPath, opts, templateDirRecursiveStep);
        }
    });
}

const copyFile = (filePath) => {
    // We pass the utf8 parameter as an encoding option param to return the file content
    // as a string.
    fs.readFile(path.join(`${TEMPLATE_DIR}${filePath}`), 'utf8', (err, file) => {
        if (err) {
            console.error(`An error happened while trying to read the file ${fileName}`);
            console.error(err);
        } else {
            console.log(`Will copy the file ${filePath}`);
            fs.writeFileSync(path.join(rootDir, filePath), customizeFile(file));
        }
    });
}

// Reads all the files in the template directory.
readdir('', {withFileTypes : true}, templateDirRecursiveStep);

const originalDirectory = process.cwd();
process.chdir(rootDir);