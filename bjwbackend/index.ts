import express from "express";

const app = express();
const PORT = 8000;

app.get("/backend/test", (req, res) =>
  res.send({ message: "hello from the backend" })
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
