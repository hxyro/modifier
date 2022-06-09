import express from 'express';
let router = express.Router();

router.get('/:userName/:urlCode', (req, res, next) => {
  const userName = req.params.userName;
  const urlCode = req.params.urlCode;
  res.send('TBD');
});

router.post('/', (req, res) => {
  res.send('TBD');
});
