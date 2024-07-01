import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 5070;

app.use(cors());
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook request from client');

  setTimeout(async () => {
    try {
      await axios.post('http://localhost:3001/webhook', { message: 'Hello from the mock-api' });
      res.status(200).send('Success');
    } catch (error) {
      console.error('Error sending to Node/Express server:', error);
      res.status(500).send('Error sending to Node/Express server');
    }
  }, 10000);
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
