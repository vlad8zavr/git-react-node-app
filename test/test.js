
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

const expectedResult = [ 
    { name: '02-nodejs', isdir: true },
    { name: 'architecture-redux', isdir: true },
    { name: 'arhitecture', isdir: true },
    { name: 'eslint-plugin-lodash-to-native', isdir: true },
    { name: 'git-react-node-app', isdir: true },
    { name: 'node-task', isdir: true },
    { name: 'node_modules', isdir: true },
    { name: 'package-lock.json', isdir: false },
    { name: 'package.json', isdir: false },
    { name: 'promise-polyphill', isdir: true },
    { name: 'site-analysis', isdir: true },
    { name: 'site-analysis-local', isdir: true },
    { name: 'verstka-task', isdir: true } 
];

describe('showAllRepos', function() {

    const testPath = '../';
    const testOptions = { withFileTypes: true };

    it('При входных данных представленных в виде массива - на выходе объект', function() {

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

    it('При входных данных представленных в виде пустого массива - на выходе в объекте пустой массив', function() {

        const stubFs = {
            readdir: function(req, res, path, options) {
                let err = false;
                testCallback(req, res, err, []);
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
                    
            chai.expect(result).to.be.empty;
        }

        _showAllRepos2(null, null, stubFs, testPath, testOptions, testCallback);

    })

    it('При заранее известных данных получен ожидаемый результат', function() {
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
                    
            chai.expect(result).to.eql(expectedResult);
            //let final = {data: result};
            //chai.expect(final).to.be.an('object');
        }

        _showAllRepos2(null, null, stubFs, testPath, testOptions, testCallback);
    })
});