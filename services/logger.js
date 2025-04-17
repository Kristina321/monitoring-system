import fs from 'node:fs';
import { LOG_FILE } from '../constants.js';

/**
 * Записывает результат проверки сервиса в лог-файл
 * @param {object} result - Результат проверки сервиса
 */
export function logResult(result) {
  // Добавляем JSON-строку с результатом в конец файла
  fs.appendFileSync(LOG_FILE, JSON.stringify(result) + '\n', 'utf8');
}

/**
 * Инициализирует лог-файл для записи результатов мониторинга.
 * Создает пустой файл если он не существует.
 */
export function initializeLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
  }
}
