import { UNSTABLE_RESPONSE_TIME_LIMIT } from '../constants.js';

const serviceStatusStats = {};

/**
 * Проверяет и уведомляет о нестабильности сервиса
 * @param {object} result - Результат проверки сервиса
 */
export function checkAndNotifyInstability(result) {
  const isUnstable = isServiceUnstable(result) ||
                   checkRecurrentStatusCode(result.url, result.statusCode);

  if (isUnstable) {
    console.warn(`Сервис ${result.url} нестабилен!`);
    // Здесь можно добавить функционал для нестабильного сервиса, например, запуск Telegram-бота
  }
}

/**
 * Проверяет повторяющиеся ошибки для указанного URL
 * @param {string} url - URL сервиса
 * @param {number} statusCode - Текущий статус-код
 * @returns {boolean} true если ошибка повторилась 3+ раза подряд
 */
function checkRecurrentStatusCode(url, statusCode) {
  if (!serviceStatusStats[url]) { // Инициализируем статистику для URL, если её нет
    serviceStatusStats[url] = { lastStatus: null, count: 0 };
  }

  const stats = serviceStatusStats[url];
  const isErrorCode = statusCode >= 400; // Проверяем, является ли статус кодом ошибки (4xx или 5xx)

  // Сбрасываем счетчик, если:
  // 1. Статус изменился
  // 2. Текущий статус не является ошибкой (но предыдущий был ошибкой)
  if (statusCode !== stats.lastStatus || !isErrorCode) {
    stats.lastStatus = statusCode;
    stats.count = isErrorCode ? 1 : 0;
    return false;
  }

  stats.count++; // Увеличиваем счетчик только для повторяющихся ошибок
  return stats.count >= 3; // Возвращаем true если ошибка повторилась 3+ раз
}

/**
 * Проверяет, является ли результат запроса нестабильным
 * @param {object} result - Результат запроса
 * @returns {boolean} true если сервис нестабилен
 */
function isServiceUnstable(result) {
  const { statusCode, responseTime } = result;
  const isUnstableStatus = statusCode < 200 || statusCode >= 300;
  const isUnstableResponseTime = responseTime > UNSTABLE_RESPONSE_TIME_LIMIT;
  const isUnstableArray = [isUnstableStatus, isUnstableResponseTime];
  return isUnstableArray.some(item => item === true);
}
