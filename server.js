import express from 'express'; 
import fetch from 'node-fetch';

const app = express();

const PORT = 4000;
const API_ENDPOINT = 'https://api.bitfinex.com/v1/pubticker';

app.get('/ticker', (req, res) => {
  fetch(`${API_ENDPOINT}/btcusd`)
    .then(response => response.json())
    .then(response => res.send(response))
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});


