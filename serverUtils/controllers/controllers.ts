
export interface Global {
    pathToRep: string;
  }
  
declare var global: Global;

interface Options {
    withFileTypes: boolean;
}

interface ShowAllReposOut {
    name: string;
    isDirectory(): boolean;
}

interface ParamsShowTree {
    repositoryId: string;
    path: string;
    pathParam: string;
    commitHash: string;
}

interface ReqShowTree {
    params: ParamsShowTree;
}

interface ParamsShowBlob {
    repositoryId: string;
    pathToFile: string;
    commitHash: string;
}

interface ReqShowBlob {
    params: ParamsShowBlob;
}

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { parseRepositoryContent } = require('../parseResponse/parseResponse');

//////////// Interface for tests ///////////

const callbackShowAllRepos = (req: Object, res, err: string, out: Array<ShowAllReposOut>) => {
    if (err) {
        console.log(err);
    }

    const result = out
            .filter(item => item.name !== '.git')
            .map(item => {
                return {
                    "name": item.name, 
                    "isdir": item.isDirectory()
                }
            })

    res.json({ data: result })
}

const _showAllRepos2 = (req: Object, res, system, path: string, options: Options, callback: (req: Object, res: Object, err: string, out: Array<ShowAllReposOut>) => void) => {
    path && system.readdir(path, options, (err: string, out: Array<ShowAllReposOut>) => {
        callback(req, res, err, out);
    })
}

exports._showAllRepos2 = _showAllRepos2;

exports.showAllRepos2 = (req: Object, res) => {
    global.pathToRep && _showAllRepos2(req, res, fs, global.pathToRep, { withFileTypes: true }, callbackShowAllRepos);
}

// -----------------------------------------

const _showTree2 = (req: ReqShowTree, res, thispath: string, testData: string | boolean, callbackReturn: (testData: string | boolean, param: string) => void) => {

    const { repositoryId, path: pathParam, commitHash } = req.params;

    const repoPath: string = (thispath[thispath.length - 1] === '/') 
        ? `${thispath}${repositoryId}` 
        : `${thispath}/${repositoryId}`;

    //const repoPath = `${thispath}/${repositoryId}`;

    let commit: string = `${commitHash || 'master'}`;
    let param: string = `${pathParam || '.'}`;

    let result: string = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['ls-tree', '-r', '--name-only', `${commit}`, `${param}`], {cwd: repoPath});

        workerProcess.stdout.on('data', (data: string) => {
            result += data.toString();
        });

        workerProcess.stderr.on('data', (err: string) => {
            console.log('stderr: ' + err);
            res.json({ err });
        });

        workerProcess.on('close', (code: number) => {
            console.log(`Exit with code ${code}`);

            let arrayOfFiles = parseRepositoryContent(result, param);
            res.json({ path: param, data: arrayOfFiles });
        });
    }
    else if (testData || testData === '') {
        callbackReturn(testData, param);
    }
}

exports._showTree2 = _showTree2;

exports.showTree2 = (req: ReqShowTree, res) => {
    const testData: boolean = false;
    const thispath: string = global.pathToRep;
    const callBack = () => 1;

    _showTree2(req, res, thispath, testData, callBack);
}

// -----------------------------------------

const _showBlob2 = (req: ReqShowBlob, res, thispath: string, testData: string | boolean, callbackReturn: (testData: string | boolean) => void) => {

    const {repositoryId, commitHash, pathToFile} = req.params;

    let result: string = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['show', `${commitHash}:./${pathToFile.replace(/ /g, '\\ ')}`], {cwd: `${global.pathToRep}/${repositoryId}`});

        workerProcess.stdout.on('data', (data: string) => {
            result += data.toString();
        });
    
        workerProcess.stderr.on('data', (err: string) => {
            console.log('stderr: ' + err);
            res.json({ err });
        });
    
        workerProcess.on('close', (code: number) => {
            console.log(`Exit with code ${code}`);

            res.json({ pathToFile: pathToFile, data: result });
        });
    }
    else if (testData || testData === '') {
        callbackReturn(testData);
    }
}

exports._showBlob2 = _showBlob2;

exports.showBlob2 = (req: ReqShowBlob, res) => {
    const testData: boolean = false;
    const thispath: string = global.pathToRep;
    const callBack = () => 1;

    _showBlob2(req, res, thispath, testData, callBack);
}

////////////////////////////////////////////

