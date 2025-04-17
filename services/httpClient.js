import fetch from 'node-fetch';
import { ABORT_CONTROLLER_TIMEOUT } from '../constants.js';

/**
 * Выполняет HTTP-запрос к сервису и возвращает данные для мониторинга
 * @param {string} url - URL для запроса
 * @returns {<object>} Объект с результатом запроса
 */
export async function requestServiceStatus(url) {
  const resultBase = createBaseResult(url);
  const startTime = Date.now();
  const controller = new AbortController();

  try {
    const timeout = setTimeout(() => controller.abort(), ABORT_CONTROLLER_TIMEOUT);
    const response = await makeHttpRequest(url);
    clearTimeout(timeout);

    return createSuccessResponse(resultBase, response, startTime);
  } catch (error) {
    return createErrorResponse(resultBase, error, startTime);
  }
}

/**
 * Создает базовый объект результата для указанного URL
 * @param {string} url - URL сервиса для мониторинга
 * @returns {object} Объект результата с начальными значениями
 */
function createBaseResult(url) {
  return {
    time: new Date().toISOString(),
    url,
    statusCode: 0,
    responseTime: 0
  };
}

/**
 * Выполняет непосредственно HTTP-запрос
 * @param {string} url - URL для запроса
 */
async function makeHttpRequest(url) {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Создает объект результата для успешного HTTP-ответа
 * @param {object} resultBase - Базовый объект результата
 * @param {Response} response - Объект ответа от fetch
 * @param {number} startTime - Время начала запроса (timestamp)
 */
function createSuccessResponse(resultBase, response, startTime) {
  return {
    ...resultBase,
    statusCode: response.status,
    responseTime: Date.now() - startTime
  };
}

/**
 * Создает объект результата для ошибочного сценария
 * @param {object} resultBase - Базовый объект результата
 * @param {Error} error - Объект ошибки
 * @param {number} startTime - Время начала запроса (timestamp)
 */
function createErrorResponse(resultBase, error, startTime) {
  console.error(`Error ${resultBase.url}`, error);
  return {
    ...resultBase,
    statusCode: getErrorStatusCode(error),
    responseTime: Date.now() - startTime
  };
}

/**
 * Извлекает HTTP-статус код из объекта ошибки.
 * @param {Error} error - Объект ошибки
 * @returns {number} HTTP-статус код (503 по умолчанию если не удалось определить)
 */
function getErrorStatusCode(error) {
  if (!error.message) return 503;

  const statusMatch = error.message.match(/\b\d{3}\b/); // Ищем 3 цифры подряд (HTTP-статус)

  if (!statusMatch) return 503;

  const statusCode = parseInt(statusMatch[0]);

  return (statusCode >= 400 && statusCode <= 599) ? statusCode : 503
}
