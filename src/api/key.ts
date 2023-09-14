import express from 'express';

const router = express.Router();

type KeyResponse = { key: string };

router.get<{}, KeyResponse>('/weatherton', (req, res) => {
  res.status(200).send({ key: process.env.OPEN_WEATHER_KEY! });
});

export default router;
