import { SERVICES, MONITORING_INTERVAL } from '../constants.js';
import { requestServiceStatus } from './httpClient.js';
import { logResult } from './logger.js';
import { checkAndNotifyInstability } from './stability.js';

/**
 * Запускает периодический мониторинг сервисов:
 * Сразу выполняет первую проверку всех сервисов
 * Устанавливает периодическую проверку по интервалу
 */
export function startMonitoring() {
  monitorAllServices().catch(console.error);
  setInterval(() => monitorAllServices().catch(console.error), MONITORING_INTERVAL);
}
/**
 * Запускает мониторинг всех сервисов
 */
async function monitorAllServices() {
  for (const url of SERVICES) {
    try {
      await monitorService(url);
    } catch (error) {
      console.error(`Service ${url} monitoring failed:`, error);
    }
  }
}

/**
 * Мониторит один сервис по URL
 * @param {string} url - URL сервиса
 */
async function monitorService(url) {
  try {
    const result = await requestServiceStatus(url);
    logResult(result);
    checkAndNotifyInstability(result);
  } catch (error) {
    console.error(`Monitoring failed for ${url}:`, error);
    throw error;
  }
}
