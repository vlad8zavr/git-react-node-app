
const { assert } = require('assert');
var chai = require('chai');

const { _showAllRepos2, _showTree2, _showBlob2 } = require('../serverUtils/controllers/controllers');
const { parseCommitList, parseRepositoryContent, getPathFromUrl, getPathDeleteMethod } = require('../serverUtils/parseResponse/parseResponse');

const { allReposOutArr, allReposExpectedResult } = require('./showAllReposData/showAllReposData');
const { showTreeData, showTreeDataExpected, showTreeDataClient, showTreeDataClientExpected } = require('./showTreeData/showTreeData');
const { showBlobData } = require('./showBlobData/showBlobData');

const testPath = '../';

describe('Контроллеры - обработчики запросов', () => {
    describe('Запрос /api/repos - showAllRepos', () => {

        const testOptions = { withFileTypes: true };
    
        it('При входных данных представленных в виде массива - на выходе объект', () => {
    
            const stubFs = {
                readdir: function(req, res, path, options) {
                    let err = false;
                    testCallback(req, res, err, allReposOutArr);
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
    
        it('При входных данных представленных в виде пустого массива - на выходе в объекте пустой массив', () => {
    
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
    
        it('При заранее известных данных получен ожидаемый результат', () => {
            const stubFs = {
                readdir: function(req, res, path, options) {
                    let err = false;
                    testCallback(req, res, err, allReposOutArr);
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
                        
                chai.expect(result).to.eql(allReposExpectedResult);
            }
    
            _showAllRepos2(null, null, stubFs, testPath, testOptions, testCallback);
        })
    });

    describe('Запросы /api/repos/:repositoryId и /api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)? - showTree', () => {

        it('При входных данных представленных в виде строки - на выходе объект', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app'
                }
            };
    
            const callbackReturn = (testData, param) => {

                let arrayOfFiles = parseRepositoryContent(testData, param);
                let final = { path: param, data: arrayOfFiles };
                chai.expect(final).to.be.an('object');
            }
    
            _showTree2(req, null, testPath, showTreeData, callbackReturn);
        })

        it('При входных данных представленных в виде пустой строки - на выходе в объекте пустой массив', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app'
                }
            };
    
            const callbackReturn = (testData, param) => {

                let arrayOfFiles = parseRepositoryContent(testData, param);
                chai.expect(arrayOfFiles).to.be.empty;
            }
    
            _showTree2(req, null, testPath, '', callbackReturn);
        })

        it('При заранее известных входных данных получен ожидаемый результат (/api/repos/:repositoryId)', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app'
                }
            };
    
            const callbackReturn = (testData, param) => {

                let arrayOfFiles = parseRepositoryContent(testData, param);
                chai.expect(arrayOfFiles).to.eql(showTreeDataExpected);
            }
    
            _showTree2(req, null, testPath, showTreeData, callbackReturn);
        })

        it('При заранее известных входных данных получен ожидаемый результат (/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?)', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app',
                    path: 'client',
                    commitHash: 'master'
                }
            };
    
            const callbackReturn = (testData, param) => {

                let arrayOfFiles = parseRepositoryContent(testData, param);
                chai.expect(arrayOfFiles).to.eql(showTreeDataClientExpected);
            }
    
            _showTree2(req, null, testPath, showTreeDataClient, callbackReturn);
        })
    })

    describe('Запрос /api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*) - showBlob', () => {
        
        it('При входных данных представленных в виде строки - на выходе строка', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app',
                    pathToFile: 'package.json',
                    commitHash: 'master'
                }
            };
    
            const callbackReturn = (testData) => {

                chai.expect(testData).to.be.a('string');
            }

            _showBlob2(req, null, testPath, showBlobData, callbackReturn);
        })

        it('При входных данных представленных в виде пустой строки - на выходе пустая строка', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app',
                    pathToFile: 'package.json',
                    commitHash: 'master'
                }
            };
    
            const callbackReturn = (testData) => {

                chai.expect(testData).to.be.empty;
            }

            _showBlob2(req, null, testPath, '', callbackReturn);
        })

        it('При заранее известных входных данных получен ожидаемый результат', () => {
            const req = {
                params: {
                    repositoryId: 'git-react-node-app',
                    pathToFile: 'package.json',
                    commitHash: 'master'
                }
            };
    
            const callbackReturn = (testData) => {

                chai.expect(testData).to.equal(showBlobData);
            }

            _showBlob2(req, null, testPath, showBlobData, callbackReturn);
        })

    })
})

describe('Парсеры - обработчики принятой информации', () => {
    describe('Обработка содержимого репозитория (tree)', () => {

        it('При входных данных в виде строки - на выходе массив', () => {

            const param = '.';
            let arrayOfFiles = parseRepositoryContent(showTreeData, param);
            chai.expect(arrayOfFiles).to.be.an('array');
        })

        it('При входной пустой строке - на выходе пустой массив', () => {

            const result = '';
            const param = '.';

            let arrayOfFiles = parseRepositoryContent(result, param);
            chai.expect(arrayOfFiles).to.be.empty;
        })

        it('При заранее известных данных получен ожидаемый результат (param = .)', () => {
            const param = '.';
            let arrayOfFiles = parseRepositoryContent(showTreeData, param);
            chai.expect(arrayOfFiles).to.eql(showTreeDataExpected);
        })

        it('При заранее известных данных получен ожидаемый результат (param = client)', () => {
            const param = 'client';
            let arrayOfFiles = parseRepositoryContent(showTreeDataClient, param);
            chai.expect(arrayOfFiles).to.eql(showTreeDataClientExpected);
        })
    })
})