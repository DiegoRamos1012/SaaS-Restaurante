import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Adiciona um header CSP permitindo conexões ao backend
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000"
  );
  next();
});

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

router.get("/menu", (req, res) => {
  fs.readFile("./data/menu.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao carregar o menu" });
    }
    res.json(JSON.parse(data));
  });
});

router.get("/addons", (req, res) => {
  fs.readFile("./data/addons.json", "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao carregar os acompanhamentos" });
    }
    res.json(JSON.parse(data));
  });
});

router.post("/order", (req, res) => {
  res.json({ message: "Pedido recebido", order: req.body });
});

// aplica /api em todas as rotas acima
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
