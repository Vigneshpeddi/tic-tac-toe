const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost/tic-tac-toe',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
const gameSchema = new mongoose.Schema({
    board: Array,
    winner: String,
});
const Game = mongoose.model('Game', gameSchema);
app.get('/api/game/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.json(game);
});
app.post('/api/game', async(req, res) => {
    const newGame = new Game({
        board: Array(9).fill(null),
        winner: null
    });
    await newGame.save();
    res.json(newGame);
});
app.put('/api/game/:id', async(req, res) => {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(game);
});
app.listen(port, () => {
    console.log('Server on http://localhost:${port}')
});