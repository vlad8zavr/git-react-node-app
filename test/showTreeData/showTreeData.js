

exports.showTreeData = `
.gitignore
README.md
client/.gitignore
client/package-lock.json   
client/package.json        
client/public/favicon.ico  
client/public/index.html   
client/public/logo192.png  
client/public/logo512.png  
client/public/manifest.json
client/public/robots.txt   
client/src/App.js
client/src/App.scss
client/src/App.test.js
client/src/assets/assets.scss
client/src/assets/color/color.scss
client/src/assets/font/font.scss
client/src/assets/reused/reused.scss
client/src/components/Footer/Footer.js
client/src/components/Footer/Footer.scss
client/src/components/Header/Header.js
client/src/components/Header/Header.scss
client/src/components/Header/HeaderLogo/HeaderLogo.js
client/src/components/Main/Main.js
client/src/components/Main/Main.scss
client/src/components/contents/CurrentInfo/CurrentInfo.js
client/src/components/contents/CurrentInfo/CurrentInfo.scss
client/src/components/contents/CurrentPath/CurrentPath.js
client/src/components/contents/CurrentPath/CurrentPath.scss
client/src/components/contents/ListItem/ListItem.js
client/src/components/contents/ListItem/ListItem.scss
client/src/components/contents/MainMenu/MainMenu.js
client/src/components/contents/MainMenu/MainMenu.scss
client/src/components/contents/Redactor/Redactor.js
client/src/components/contents/Redactor/Redactor.scss
client/src/components/contents/Redactor/RedactorBody/RedactorBody.js
client/src/components/contents/Redactor/RedactorHead/RedactorHead.js
client/src/components/contents/Redactor/RedactorLine/RedactorLine.js
client/src/components/contents/RepoList/RepoList.js
client/src/components/contents/RepoList/RepoList.scss
client/src/index.css
client/src/index.js
client/src/logo.svg
client/src/pages/PageCurrentRepo/PageCurrentRepo.js
client/src/pages/PageFile/PageFile.js
client/src/pages/PageStart/PageStart.js
client/src/serviceWorker.js
package-lock.json
package.json
screenshots/page-1.png
screenshots/page-2.png
screenshots/page-3.png
server.js
serverUtils/controllers/controllers.js
serverUtils/parseResponse/parseResponse.js
test/investigation.js
test/test.js`;

exports.showTreeDataExpected = [ 
    { name: '.gitignore', isdir: false },
    { name: 'README.md', isdir: false },
    { name: 'client', isdir: true },
    { name: 'package-lock.json', isdir: false },
    { name: 'package.json', isdir: false },
    { name: 'screenshots', isdir: true },
    { name: 'server.js', isdir: false },
    { name: 'serverUtils', isdir: true },
    { name: 'test', isdir: true }
];