
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { parseCommitList, parseRepositoryContent, getPathFromUrl, getPathDeleteMethod } = require('../parseResponse/parseResponse');


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

        res.json({ data: result });
    })
}

exports.showCurrentRepo = (req, res) => {
    const {repositoryId} = req.params;
    console.log(`repositoryId : ${repositoryId}`);

    console.log(`global.pathToRep : ${global.pathToRep}`);
    console.log(`full path : ${global.pathToRep}/${repositoryId}`);

    repositoryId && fs.readdir(`${global.pathToRep}/${repositoryId}`, { withFileTypes: true }, (err, out) => {
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

        res.json({ data: result });
    })
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
        res.send( result );
    });
}