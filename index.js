import { initializeLogFile } from './services/logger.js';
import { startMonitoring } from './services/monitor.js';

/**
 * Инициализирует и запускает систему мониторинга сервисов
 */
function setupAndStartMonitoring() {
  initializeLogFile();
  startMonitoring();
}

setupAndStartMonitoring();

//import fs from 'node:fs';
//import fetch from 'node-fetch';

/*const SERVICES = [
  'https://sb-film.skillbox.cc/films',
  'https://formit.fake/',
  //'https://datavalidator.fake/',
  //'https://leadsync.fake/',
  //'https://bitdashboard.fake/'
];

const REQUEST_TIMEOUT_MS = 5000;
const UNSTABLE_RESPONSE_TIME_MS = 2000;
const MONITORING_INTERVAL_MS = 5 * 60 * 1000;
const LOG_FILE = 'monitor_service.log';*/

//const errorStats = {};

/*function createBaseResult(url) {
  return {
    time: new Date().toISOString(),
    url,
    statusCode: 0,
    responseTime: 0
  };
}*/

/*function setupRequestTimeout(controller, timeoutMs = REQUEST_TIMEOUT_MS) {
  return setTimeout(() => controller.abort(), timeoutMs);
}

async function executeRequest(url) {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

function handleSuccessResponse(resultBase, response, startTime) {
  return {
    ...resultBase,
    statusCode: response.status,
    responseTime: Date.now() - startTime
  };
}

function handleErrorResponse(resultBase, error, startTime) {
  console.error(`Error ${resultBase.url}`, error);
  return {
    ...resultBase,
    statusCode: getErrorStatusCode(error),
    responseTime: Date.now() - startTime
  };
}*/

/*async function sendPostRequest(url) {
  const resultBase = createBaseResult(url);
  const startTime = Date.now();
  const controller = new AbortController();

  try {
    const timeout = setupRequestTimeout(controller);
    const response = await executeRequest(url);
    clearTimeout(timeout);

    return handleSuccessResponse(resultBase, response, startTime);
  } catch (error) {
    return handleErrorResponse(resultBase, error, startTime);
  }
}*/

/*function getErrorStatusCode(error) {
  if (!error.message) return 503;

  const statusMatch = error.message.match(/\b\d{3}\b/); // Ищем 3 цифры подряд (HTTP-статус)

  if (!statusMatch) return 503;

  const statusCode = parseInt(statusMatch[0]);

  return (statusCode >= 400 && statusCode <= 599) ? statusCode : 503
}*/

/*function logResult(result) {
  fs.appendFileSync(LOG_FILE, JSON.stringify(result) + '\n', 'utf8');
}*/

/*function checkRecurrentStatusCode(url, statusCode) {
  if (!errorStats[url]) { // Инициализируем статистику для URL, если её нет
    errorStats[url] = { lastStatus: null, count: 0 };
  }

  const stats = errorStats[url];
  const isErrorCode = statusCode >= 400; // Проверяем, является ли статус кодом ошибки (4xx или 5xx)

  // Сбрасываем счетчик, если:
  //1. Статус изменился
  //2. Текущий статус не является ошибкой (но предыдущий был ошибкой)
  if (statusCode !== stats.lastStatus || !isErrorCode) {
    stats.lastStatus = statusCode;
    stats.count = isErrorCode ? 1 : 0;
    return false;
  }

  stats.count++; // Увеличиваем счетчик только для повторяющихся ошибок

  return stats.count >= 3; // Возвращаем true если ошибка повторилась 3+ раз
}*/

/*unction getUnstable(result) {
  const { statusCode, responseTime } = result;
  const isUnstableStatus = statusCode < 200 || statusCode >= 300;
  const isUnstableResponseTime = responseTime > UNSTABLE_RESPONSE_TIME_MS;
  const isUnstableArray = [isUnstableStatus, isUnstableResponseTime];
  return isUnstableArray.some(item => item === true);
}*/

/*function checkAndNotifyInstability(result) {
  const isUnstable = getUnstable(result) ||
                   checkRecurrentStatusCode(result.url, result.statusCode);

  if (isUnstable) {
    console.warn(`Сервис ${result.url} нестабилен!`);
    // Здесь можно добавить функционал для нестабильного сервиса, например, запуск Telegram-бота
  }
}*/

/*async function monitorService(url) {
  try {
    const result = await sendPostRequest(url);
    logResult(result);
    checkAndNotifyInstability(result);
  } catch (error) {
    console.error(`Monitoring failed for ${url}:`, error);
    throw error;
  }
}*/

/*function initializeLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
  }
}*/

/*async function monitorAllServices() {
  initializeLogFile();
  for (const url of SERVICES) {
    try {
      await monitorService(url);
    } catch (error) {
      console.error(`Service ${url} monitoring failed:`, error);
    }
  }
}*/

/*async function startMonitoring() {
  try {
    await monitorAllServices();
  } catch (error) {
    console.error('Ошибка мониторинга:', error.message);
  }
}

function startPeriodicMonitoring() {
  // Первый запуск сразу
  startMonitoring();

  // Затем каждые 5 минут
  const intervalId = setInterval(startMonitoring, MONITORING_INTERVAL_MS);

  // Возвращаем функцию для остановки (на будущее)
  return () => clearInterval(intervalId);
}

const stopMonitoring = startPeriodicMonitoring();*/
// Для остановки мониторинга можно будет вызвать:
// stopMonitoring();



// Запуск мониторинга
/*monitorAllServices().catch(error => {
  console.error('Ошибка мониторинга:', error.message);
});*/
