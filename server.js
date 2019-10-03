const express = require('express');
const bodyParser = require('body-parser');

const { showAllRepos, showCurrentRepo, showBlob } = require('./serverUtils/controllers/controllers');

global.pathToRep = process.argv[2];

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/repos', showAllRepos);

app.get('/api/repos/:repositoryId/dircontent', showCurrentRepo);

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', showBlob);


app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));