const opts = {
    pkg: {
        demand: true,
        alias: 'p'
    },
    name: {
        demand: true,
        alias: 'n'
    }
}

const argv = require('yargs')
    .command('create', 'Generates the scaffolding for a React component module', opts)
    .help()
    .argv;

module.exports = {
    argv
}