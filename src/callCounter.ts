import {
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from 'node:path';

type AppStorage = {
  openWeather: {
    count: number,
    date: Date,
    maxCallsPerDay: number,
  }
}

const CALL_COUNT_FILE = 'callCount.json';
const DATA_DIRECTORY = './data';
const CALL_COUNT_FILE_PATH = path.join(DATA_DIRECTORY, CALL_COUNT_FILE);

const defaultAppStorage: AppStorage = {
  openWeather: {
    count: 0,
    date: new Date(),
    maxCallsPerDay: 0,
  }
}

function initializeDataStorage() {
  if (!existsSync(DATA_DIRECTORY)) {
    mkdirSync(DATA_DIRECTORY);
  }

  if (!existsSync(CALL_COUNT_FILE_PATH)) {
    openSync(CALL_COUNT_FILE_PATH, 'w');
  }
}

function shouldReset(lastDate: Date, currentDate: Date) {
  return lastDate.getFullYear() < currentDate.getFullYear() ||
    lastDate.getMonth() < currentDate.getMonth() ||
    lastDate.getDate() < currentDate.getDate()
}

export function getCallCount() {
  if (!existsSync(CALL_COUNT_FILE_PATH)) {
    return 0;
  }

  const file = readFileSync(CALL_COUNT_FILE_PATH, 'utf-8');

  return JSON.parse(file).openWeather.count;
}

export async function updateCallCount() {
  let data: AppStorage = defaultAppStorage;
  let file;

  try {
    file = readFileSync(CALL_COUNT_FILE_PATH, 'utf-8');
  } catch (err) {
    console.log('Error reading the file: ', err);
  }

  if (!file) {
    initializeDataStorage();
  } else {
    data = JSON.parse(file);
  }

  let currentCount = data.openWeather.count;
  const lastDate = new Date(data.openWeather.date);
  const currentDate = new Date();

  if (shouldReset(lastDate, currentDate)) {
    data.openWeather.date = currentDate;
    currentCount = 0;
  }

  currentCount += 1;

  data.openWeather.count = currentCount;

  if (data.openWeather.maxCallsPerDay < currentCount) {
    data.openWeather.maxCallsPerDay = currentCount;
  }

  try {
    writeFileSync(CALL_COUNT_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing the file:", err);
    throw new Error("Could not write file")
  }
}