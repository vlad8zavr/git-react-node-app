
exports.showBlobData = `
{
    "name": "example-create-react-app-express",
    "version": "1.0.0",
    "author": "vlad8zavr",
    "license": "ISC",
    "scripts": {
      "client": "cd client && yarn start",
      "server": "nodemon server.js",
      "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\"",
      "test": "mocha"
    },
    "dependencies": {
      "body-parser": "^1.18.3",
      "chai": "^4.2.0",
      "express": "^4.16.4",
      "fs-extra": "^8.1.0",
      "mocha": "^6.2.1"
    },
    "devDependencies": {
      "concurrently": "^4.0.1"
    }
  }
  
`;
