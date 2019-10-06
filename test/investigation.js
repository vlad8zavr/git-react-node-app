const { _showAllRepos2, showTree, showBlob } = require('../serverUtils/controllers/controllers');

const outArr = [
    { name: '02-nodejs', isDirectory: () => true },
    { name: 'architecture-redux', isDirectory: () => true },
    { name: 'arhitecture', isDirectory: () => true },
    { name: 'eslint-plugin-lodash-to-native', isDirectory: () => true },
    { name: 'git-react-node-app', isDirectory: () => true },
    { name: 'node-task', isDirectory: () => true },
    { name: 'node_modules', isDirectory: () => true },
    { name: 'package-lock.json', isDirectory: () => false },
    { name: 'package.json', isDirectory: () => false },
    { name: 'promise-polyphill', isDirectory: () => true },
    { name: 'site-analysis', isDirectory: () => true },
    { name: 'site-analysis-local', isDirectory: () => true },
    { name: 'verstka-task', isDirectory: () => true }
]

const req = '/api/repos';
const res = '';

const testPath = global.pathToRep;
const testOptions = { withFileTypes: true };

const stubFs = {
    readdir: function(req, res, path, options, callback) {
       callback(req, res, err, outArr);
    }
};

function testCallback(req, res, err, out) {
    console.log('[TestCallBack]');
}

_showAllRepos2(req, res, stubFs, testPath, testOptions, testCallback);