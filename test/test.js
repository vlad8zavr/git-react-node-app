
const { assert } = require('assert');
var chai = require('chai');

const { _showAllRepos2 } = require('../serverUtils/controllers/controllers');
const { parseCommitList, parseRepositoryContent, getPathFromUrl, getPathDeleteMethod } = require('../serverUtils/parseResponse/parseResponse');

const { allReposOutArr, allReposExpectedResult } = require('./showAllReposData/showAllReposData');
const { showTreeData, showTreeDataExpected, showTreeDataClient, showTreeDataClientExpected } = require('./showTreeData/showTreeData');


describe('Контроллеры - обработчики запросов', () => {
    describe('Запрос /api/repos - showAllRepos', () => {

        const testPath = '../';
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