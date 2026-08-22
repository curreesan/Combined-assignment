// start creating server here
import http from "http";

const todos = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
    return;
  }

  if (req.method === "POST" && pathname === "/create/todo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { title, description } = JSON.parse(body);
      const newTodo = { id: nextId, title, description };
      nextId++;
      todos.push(newTodo);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todos));
    });
    return;
  }

  if (req.method === "GET" && pathname === "/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
    return;
  }

  if (req.method === "GET" && pathname === "/todo") {
    const id = Number(parsedUrl.searchParams.get("id"));
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Todo not found" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
    return;
  }

  if (req.method === "DELETE" && pathname === "/todo") {
    const id = Number(parsedUrl.searchParams.get("id"));
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Todo not found" }));
      return;
    }

    todos.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Todo deleted" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
