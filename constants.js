// Список URL сервисов для мониторинга
export const SERVICES = [
  'https://formit.fake/',
  'https://datavalidator.fake/',
  'https://leadsync.fake/',
  'https://bitdashboard.fake/',
];

export const ABORT_CONTROLLER_TIMEOUT = 5000; // Таймаут для отмены запроса через AbortControlle
export const UNSTABLE_RESPONSE_TIME_LIMIT = 2000; // Пороговое значение времени ответа для определения стабильности (мс)
export const MONITORING_INTERVAL = 5 * 60 * 1000; // Интервал между циклами проверки сервисов (мс)
export const LOG_FILE = 'monitor_service.log'; // Имя файла для логов мониторинга
