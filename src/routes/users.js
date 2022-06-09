import express from 'express';
import { body, validationResult } from 'express-validator';

let router = express.Router();

router.get('/:userName/:urlCode', (req, res, next) => {
  const userName = req.params.userName;
  const urlCode = req.params.urlCode;
});

router.post(
  '/',
  body('urlCode')
    .trim()
    .isAlphanumeric('-')
    .withMessage('UrlCode contains invalid characters')
    .escape(),
  body('url').trim().isURL().withMessage('Invalid website url').escape(),
  body('title')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('1 <= tilte <= 30')
    .escape(),
  body('image_url').trim().isURL().withMessage('Invalid image url').escape(),
  body('description')
    .trim()
    .isLength({ min: 0, max: 100 })
    .withMessage('description too long')
    .escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('TBD');
  }
);

module.exports = router;
