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

const FILE_ENCODINGS = {
    png: 'base64',
    ico: 'binary',
    defaultEnc: 'utf8'
}

const getFileEncoding = filePath => FILE_ENCODINGS[getLast(filePath.split('.'))] || FILE_ENCODINGS.defaultEnc;

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
    main: "dist/index.js",
    scripts: {
        "test": "echo \"Error: no test specified\" && exit 1",
        "demostart": "webpack-dev-server --mode development --config webpack.demo.config.js",
        "transpile": "babel src -d dist-transpiled --copy-files --presets=@babel/preset-env,@babel/preset-react",
        "build": "webpack --mode production",
        "clean-install": "rm -rf ./node_modules && npm install",
        "clean-build": "rm -rf ./dist && npm run build",
        "ibuild": "npm run clean-install && npm run clean-build",
        "publish-pro": "npm run ibuild && npm publish --access public"
    },
    files: [
        "/dist"
    ],
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
        "webpack": "^4.42.0",
        "webpack-cli": "^3.3.11",
        "webpack-dev-server": "^3.10.3"
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

const formatDotPreffix = str => {
    const segments = str.split('/');
    const fileName = getLast(segments);
    return fileName && fileName.startsWith('dot.') ? [...segments.slice(0,-1), fileName.slice(3)].join('/') : str;
}
const removeTemplateSuffix = str => str.endsWith('.template') ? str.slice(0,-9) : str;
const customizeFileName = str => str.replace('Component.', `${cmpName}.`);
const formatFileName = str => formatDotPreffix(removeTemplateSuffix(customizeFileName(str)));
const customizeFile = file => file.split('{{{MODULE_NAME}}}').join(moduleName).split('{{{CMP_NAME}}}').join(cmpName).split('{{{UNSCOPED_MODULE_NAME}}}').join(moduleDirName);

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
    const fileEncoding = getFileEncoding(filePath);
    fs.readFile(path.join(`${TEMPLATE_DIR}${filePath}`), fileEncoding, (err, file) => {
        if (err) {
            console.error(`An error happened while trying to read the file ${filePath}`);
            console.error(err);
        } else {
            const destinationPath = formatFileName(filePath);
            if (destinationPath === filePath) {
                console.log(`Will copy the file ${filePath}`);
                fs.writeFileSync(path.join(rootDir, destinationPath), file, fileEncoding);
            } else {
                console.log(`File ${destinationPath} will be generated from ${filePath}`);
                fs.writeFileSync(path.join(rootDir, destinationPath), customizeFile(file), fileEncoding);
            }
        }
    });
}

// Reads all the files in the template directory.
readdir('', {withFileTypes : true}, templateDirRecursiveStep);

const originalDirectory = process.cwd();
process.chdir(rootDir);