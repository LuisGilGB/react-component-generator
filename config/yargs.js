const opts = {
    name: {
        demand: true,
        alias: 'n'
    },
    dirname: {
        demand: false,
        alias: 'd'
    }
}

const argv = require('yargs')
    .command('create', 'Generates the scaffolding for a React component module', opts)
    .help()
    .argv;

module.exports = {
    argv
}