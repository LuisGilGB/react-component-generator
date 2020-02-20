const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const argv = require('./config/yargs').argv;

const {pkg, name} = argv;

console.log(`Everything ready for the scaffolding of the new component ${name} with package name ${pkg}`);

const rootDir = path.resolve(pkg);
const TEMPLATE_DIR = path.join(__dirname, './template');

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

const readdir = (srcPath, ...opts, filesCallback) => {
    fs.readdir(`${TEMPLATE_DIR}/${srcPath}`, ...opts, (err, files) => {
        if (err) {
            console.error('An error happened while trying to read the directory files');
            console.error(err);
        } else {
            console.log('The template files have been successfully read');
            console.log(files);
            filesCallback(srcPath, ...opts, files);
        }
    });
}

const templateDirRecursiveStep = (srcPath, ...opts, files) => {
    // Writes the template files into the destination folder.
    files.forEach(dirItem => {
        const {name} = dirItem;
        if (dirItem.isFile()) {
            copyFile(`${srcPath}/${name}`);
        } else if (dirItem.isDirectory()) {
            readdir(`${srcPath}/${name}`, ...opts, templateDirRecursiveStep);
        }
    });
}

const copyFile = (filePath) => {
    // We pass the utf8 parameter as an encoding option param to return the file content
    // as a string.
    fs.readFile(path.join(`${TEMPLATE_DIR}/${filePath}`), 'utf8', (err, file) => {
        if (err) {
            console.error(`An error happened while trying to read the file ${fileName}`);
            console.error(err);
        } else {
            console.log('Will copy file');
            console.log(typeof file);
            fs.writeFileSync(path.join(rootDir, filePath), file);
        }
    });
}

// Reads all the files in the template directory.
readdir('', {withFileTypes : true}, templateDirRecursiveStep);

const originalDirectory = process.cwd();
process.chdir(rootDir);