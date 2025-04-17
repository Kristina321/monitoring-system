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