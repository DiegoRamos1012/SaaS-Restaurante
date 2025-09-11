import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Backend do restaurante funcionando 🚀" });
});

// Rota para ler o menu (menu.json na pasta backend)
app.get("/menu", (req, res) => {
  fs.readFile("./menu.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao carregar o menu" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
