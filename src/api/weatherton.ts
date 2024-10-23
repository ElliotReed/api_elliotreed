import express from 'express';
import { getCallCount, updateCallCount } from '../callCounter';

const router = express.Router();
const CALL_LIMIT = 900;

router.get<{}, any>('/', async (req, res, next) => {
  const { lon, lat } = req.query;
  const key = process.env.OPEN_WEATHER_KEY!
  const callCount = await getCallCount();
  console.log('callCount: ', callCount);

  try {
    if (callCount === undefined) return next();

    if (callCount > CALL_LIMIT) {
      throw new Error('Too many api calls');
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    await updateCallCount(callCount);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
