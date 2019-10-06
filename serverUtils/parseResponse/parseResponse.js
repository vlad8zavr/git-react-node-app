
module.exports = {

    parseCommitList: function(out) {
        let arrayOfCommits = [];
        out.split('\n').forEach(item => {
            if (item.trim() !== '') {
                let hash = item.split('<><><>')[0].trim();
                let date = item.split('<><><>')[1].split('|||')[0].trim();
                let commit = item.split('|||')[1].trim();
                arrayOfCommits.push({ hash: hash, commit: commit, date: date });
            }
        });
        return arrayOfCommits;
    },

    parseRepositoryContent: function(out, param) {
        let divider = '/';
        let temp = '';
        let isdir = null;
        let path = (param !== '.') ? `${param}/` : null;
        let arrayOfFiles = [];
        
        out.split('\n').forEach(item => {
            if (item.trim() !== '') {
                temp = (path) ? item.trim().split(path)[1] : item.trim();
                arrayOfFiles.push(temp);
            };
        })

        if (arrayOfFiles.length > 0) {
            let newArray = [];
            newArray.push(arrayOfFiles[0]);
            for (let i = 1, length = arrayOfFiles.length; i < length; i++) {
                newArray.push(arrayOfFiles[i]);
                let currentItem, previousItem;
                if (arrayOfFiles[i].match(divider) && arrayOfFiles[i-1].match(divider)) {
                    currentItem = arrayOfFiles[i].split(divider)[0];
                    previousItem = arrayOfFiles[i-1].split(divider)[0];
                    if (currentItem === previousItem) {
                        newArray.pop();
                    }
                }
            }

            let result = newArray.map(item => {
                isdir = !!item.match(divider);
                temp = (isdir) ? item.split(divider)[0] : item;
                return {
                    "name": temp, 
                    "isdir": isdir
                }
            })

            return result;
        }
        else return arrayOfFiles;
    },

    getPathFromUrl: function(req, repositoryId, commitHash, variant) {
        const urlpath = req.originalUrl.replace(req.baseUrl, "");
        const startLine = (commitHash) ? `/api/repos/${repositoryId}/${variant}/${commitHash}/` : `/api/repos/${repositoryId}/${variant}/`;
        const filepath = urlpath.replace(startLine, '');

        // if (urlpath.slice(-1) === '/') return filepath;
        return filepath;
    },

    getPathDeleteMethod: function(req) {
        const urlpath = req.originalUrl.replace(req.baseUrl, "");
        const startLine = '/api/repos/';
        return urlpath.replace(startLine, '');
    }

}
