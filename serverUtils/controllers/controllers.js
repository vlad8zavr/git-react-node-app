
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { parseCommitList, parseRepositoryContent, getPathFromUrl, getPathDeleteMethod } = require('../parseResponse/parseResponse');

//////////// Interface for tests ///////////

callbackShowAllRepos = (req, res, err, out) => {
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

_showAllRepos2 = (req, res, system, path, options, callback) => {
    path && system.readdir(path, options, (err, out) => {
        callback(req, res, err, out);
    })
}

exports._showAllRepos2 = _showAllRepos2;

exports.showAllRepos2 = (req, res) => {
    _showAllRepos2(req, res, fs, global.pathToRep, { withFileTypes: true }, callbackShowAllRepos);
}

// -----------------------------------------

_showTree2 = (req, res, thispath, testData, callbackReturn) => {

    const { repositoryId, path: pathParam, commitHash } = req.params;

    const repoPath = (thispath[thispath.length - 1] === '/') 
        ? `${thispath}${repositoryId}` 
        : `${thispath}/${repositoryId}`;

    //const repoPath = `${thispath}/${repositoryId}`;

    let commit = `${commitHash || 'master'}`;
    let param = `${pathParam || '.'}`;

    let result = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['ls-tree', '-r', '--name-only', `${commit}`, `${param}`], {cwd: repoPath});

        workerProcess.stdout.on('data', data => {
            result += data.toString();
        });

        workerProcess.stderr.on('data', err => {
            console.log('stderr: ' + err);
            res.json({ err });
        });

        workerProcess.on('close', code => {
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

exports.showTree2 = (req, res) => {
    const testData = false;
    const thispath= global.pathToRep;
    callBack = () => 1;

    _showTree2(req, res, thispath, testData, callBack);
}

// -----------------------------------------

_showBlob2 = (req, res, thispath, testData, callbackReturn) => {

    const {repositoryId, commitHash, pathToFile} = req.params;

    let result = '';

    if (testData === false) {
        let workerProcess = spawn('git', ['show', `${commitHash}:./${pathToFile.replace(/ /g, '\\ ')}`], {cwd: `${global.pathToRep}/${repositoryId}`});

        workerProcess.stdout.on('data', data => {
            result += data.toString();
        });
    
        workerProcess.stderr.on('data', err => {
            console.log('stderr: ' + err);
            res.json({ err });
        });
    
        workerProcess.on('close', code => {
            console.log(`Exit with code ${code}`);

            res.json({ pathToFile: pathToFile, data: result });
        });
    }
    else if (testData || testData === '') {
        callbackReturn(testData);
    }
}

exports._showBlob2 = _showBlob2;

exports.showBlob2 = (req, res) => {
    const testData = false;
    const thispath= global.pathToRep;
    callBack = () => 1;

    _showBlob2(req, res, thispath, testData, callBack);
}

////////////////////////////////////////////


exports.showAllRepos = (req, res) => {
    global.pathToRep && fs.readdir(global.pathToRep, { withFileTypes: true }, (err, out) => {
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

        if (!global.isAppTesting) {
            res.json({ data: result })
        }
        else {
            return {data: result};
        }
    })
}

exports.showTree = (req, res) => {
    const { repositoryId, path: pathParam, commitHash } = req.params;
    const repoPath = `${global.pathToRep}/${repositoryId}`;

    let commit = `${commitHash || 'master'}`;
    let param = `${pathParam || '.'}`;

    let result = '';

    let workerProcess = spawn('git', ['ls-tree', '-r', '--name-only', `${commit}`, `${param}`], {cwd: repoPath});

    workerProcess.stdout.on('data', data => {
        result += data.toString();
    });

    workerProcess.stderr.on('data', err => {
        console.log('stderr: ' + err);
        res.json({ err });
    });

    workerProcess.on('close', code => {
        console.log(`Exit with code ${code}`);

        let arrayOfFiles = parseRepositoryContent(result, param);
        res.json({ path: param, data: arrayOfFiles });
    });
}

exports.showBlob = (req, res) => {
    console.log('[showBlob]');
    const {repositoryId, commitHash, pathToFile} = req.params;
    console.log(`repositoryId : ${repositoryId}`);
    console.log(`commitHash : ${commitHash}`);
    console.log(`pathToFile : ${pathToFile}`);

    console.log(`modded pathToFile : ${pathToFile.replace(/ /g, '\\ ')}`);

    let result = '';

    let workerProcess = spawn('git', ['show', `${commitHash}:./${pathToFile.replace(/ /g, '\\ ')}`], {cwd: `${global.pathToRep}/${repositoryId}`});

    workerProcess.stdout.on('data', data => {
        result += data.toString();
    });

    workerProcess.stderr.on('data', err => {
        console.log('stderr: ' + err);
        res.json({ err });
    });

    workerProcess.on('close', code => {
        console.log(`Exit with code ${code}`);
        res.json({ pathToFile: pathToFile, data: result });
    });
}
