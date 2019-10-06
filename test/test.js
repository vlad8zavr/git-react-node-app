
const { assert } = require('assert');
var chai = require('chai')
const { showAllRepos, showTree, showBlob } = require('../serverUtils/controllers/controllers');

describe('showAllRepos', function() {
    it('Должен возвращать объект', function() {
      
        const out = [
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

        global.pathToRep = '../';
        const path = global.pathToRep;

        global.AppfsReaddir = function(path, out) {
            console.log('TEST FUNCTION');
            console.log('out', out);
            const result = out
            .filter(item => item.name !== '.git')
            .map(item => {
                return {
                    "name": item.name, 
                    "isdir": item.isDirectory()
                }
            })

            return { data: result };
        }

        let result = showAllRepos();
        chai.expect(result).to.be.an('object');
    });
});