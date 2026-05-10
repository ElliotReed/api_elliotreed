import express from 'express';
import { getCallCount, updateCallCount } from '../callCounter';

const router = express.Router();
const CALL_LIMIT = 900;
const ONE_CALL_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const LIMIT_REACED_MESSAGE = 'Too Many Requests. Key quota of requests to this API was exceeded. You may retry request after some time.';

router.get<{}, any>('/', async (req, res, next) => {
  const { lon, lat } = req.query;
  const key = process.env.OPEN_WEATHER_KEY!
  const callCount = await getCallCount();
  console.log('callCount: ', callCount);

  try {
    if (callCount === undefined) return next();

    if (callCount > CALL_LIMIT) {
      throw new Error(LIMIT_REACED_MESSAGE);
    }

    const response = await fetch(
      `${ONE_CALL_BASE_URL}?lat=${lat}&lon=${lon}&appid=${key}`
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(LIMIT_REACED_MESSAGE)
      }

      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    await updateCallCount();

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
