const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const uuid= require("uuid");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  noCors: true,
  logger: true,
  bodyParser: true,
});

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = uuid.v4();
    req.body.createdAt = Date.now()
  }

  if(req.method === 'PUT') {
    req.body.updatedAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
