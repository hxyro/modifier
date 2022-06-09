<<<<<<< HEAD
import express from 'express';
let router = express.Router();
=======
import express from "express"
import {body, validationResult} from 'express-validator'

let router = express.Router()
>>>>>>> cc1f96fe90299cb9bd5f10252ebe14f4ac1cc9ed

router.get('/:userName/:urlCode', (req, res, next) => {
  const userName = req.params.userName;
  const urlCode = req.params.urlCode;
  res.send('TBD');
});

<<<<<<< HEAD
router.post('/', (req, res) => {
  res.send('TBD');
});
=======
router.post(
    '/',
    body('urlCode')
        .trim().
        isAlphanumeric("-")
        .withMessage('UrlCode contains invalid characters')
        .escape(),
    body('url')
        .trim()
        .isURL()
        .withMessage('Invalid website url')
        .escape(),
    body('title')
        .trim()
        .isLength({min: 1, max: 30})
        .withMessage('1 <= tilte <= 30')
        .escape(),
    body('image_url')
        .trim()
        .isURL()
        .withMessage('Invalid image url')
        .escape(),
    body('description')
        .trim()
        .isLength({min: 0, max: 100})
        .withMessage("description too long")
        .escape(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.send('TBD')
})
>>>>>>> cc1f96fe90299cb9bd5f10252ebe14f4ac1cc9ed
