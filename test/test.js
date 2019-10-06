
const { assert } = require('assert');
var chai = require('chai')
const { _showAllRepos2 } = require('../serverUtils/controllers/controllers');

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

describe('showAllRepos', function() {
    it('Должен возвращать объект при входных данных - содержание репозитория', function() {
      
        const testPath = '../';
        const testOptions = { withFileTypes: true };

        const stubFs = {
            readdir: function(req, res, path, options) {
                let err = false;
                testCallback(req, res, err, outArr);
            }
        };

        function testCallback(req, res, err, out) {
        
            const result = out
                    .filter(item => item.name !== '.git')
                    .map(item => {
                        return {
                            "name": item.name, 
                            "isdir": item.isDirectory()
                        }
                    })
                    
            let final = {data: result};
            chai.expect(final).to.be.an('object');
        }

        _showAllRepos2(null, null, stubFs, testPath, testOptions, testCallback);
    });
});