const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repsository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repsository);

  return response.json(repsository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repsositoryIndex = repositories.findIndex(repsository => repsository.id === id);

  if (repsositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repsository = {
    id,
    title,
    url, 
    techs,
    likes: repositories[repsositoryIndex].likes,
  }

  repositories[repsositoryIndex] = repsository;

  return response.json(repsository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repsositoryIndex = repositories.findIndex(repsository => repsository.id === id);

  if (repsositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repsositoryIndex, 1); //para excluir um registro do array

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repsository = repositories.find(repsository => repsository.id === id);

  if (!repsository) {
    return response.status(400).send();
  }

  repsository.likes += 1;

  return response.json(repsository);
});

module.exports = app;
