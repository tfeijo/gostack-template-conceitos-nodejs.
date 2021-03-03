const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  
  repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado"})
  }
  
  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repositorie

  return response.json(repositories[repositoryIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado"})
  }
  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
    
  repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado"})
  }

  const likes = repositories[repositoryIndex].likes + 1
  
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    likes
  }

  return response.json(repositories[repositoryIndex])});

module.exports = app;
