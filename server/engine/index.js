const { Engine } = require('node-uci');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // parser JSON request bodies

// Use the cors middleware
app.use(cors());

app.post('/engine/move', async (req, res) => {
  try {
    const getFen = req.body.data;
    const bestMove = await engineMove(getFen);
    res.json({ bestMove });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'internal server Error' });
  }
});

const stockfishPath = '/usr/local/bin/stockfish';
const engine = new Engine(stockfishPath);

async function engineMove(fen) {
  try {
    await engine.init();
    await engine.position(fen);
    const result = await engine.go({ depth: 10 });
    const bestMove = result.bestmove;
    console.log('Best Move:', bestMove);
    await engine.quit();
    return bestMove;
  } catch (error) {
    console.error('Error in engineMove:', error);
    throw error;
  }
}

const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
