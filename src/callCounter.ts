import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import path from 'node:path';

const CALL_COUNT_FILE = 'callCount.json';
const DATA_DIRECTORY = './data';
const CALL_COUNT_FILE_PATH = path.join(DATA_DIRECTORY, CALL_COUNT_FILE);

function initializeDataStorage() {
  const defaultOpenWeatherCount = {
    openWeather: {
      count: 1,
      date: new Date(),
    }
  }

  if (!existsSync(DATA_DIRECTORY)) {
    mkdirSync(DATA_DIRECTORY);
  }

  if (!existsSync(CALL_COUNT_FILE_PATH)) {
    writeFileSync(CALL_COUNT_FILE_PATH, JSON.stringify(defaultOpenWeatherCount));
    return true;
  }
}

export function getCallCount() {
  if (!existsSync(CALL_COUNT_FILE_PATH)) {
    return 0;
  }

  const file = readFileSync(CALL_COUNT_FILE_PATH, 'utf-8');

  return JSON.parse(file).openWeather.count;
}

export async function updateCallCount(currentCount: number) {
  let resetCount = false;

  initializeDataStorage();

  try {
    const file = readFileSync(CALL_COUNT_FILE_PATH, 'utf-8');
    const data = JSON.parse(file);
    const storedDate = new Date(data.openWeather.date);
    const currentDate = new Date();

    if (storedDate.getFullYear() < currentDate.getFullYear() ||
      storedDate.getMonth() < currentDate.getMonth() ||
      storedDate.getDate() < currentDate.getDate()
    ) {
      data.openWeather.date = currentDate;
      resetCount = true;
    }

    data.openWeather.count = resetCount ? 1 : currentCount + 1;

    writeFileSync(CALL_COUNT_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('err: ', err);
    throw new Error("Data storage error")
  }
  return
}