exports.allReposOutArr = [
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

exports.allReposExpectedResult = [ 
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