import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Homepage
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers");
    res.render("index", { coins: response.data, selected: null });
  } catch (error) {
    res.render("index", { coins: [], error: "API failed to load." });
  }
});

// Handle form submission
app.post("/search", async (req, res) => {
  const symbol = req.body.symbol;

  try {
    const response = await axios.get("https://api.blockchain.com/v3/exchange/tickers");

    const coin = response.data.find(c => c.symbol === symbol);

    res.render("index", {
      coins: response.data,
      selected: coin
    });

  } catch (error) {
    res.render("index", { coins: [], error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});