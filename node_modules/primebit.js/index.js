const colors = require('./colors');

class p {
  static setColor(type, color) {
    if (type === 'logs') {
      colors.logs = color;
    } else if (type === 'log' || type === 'success' || type === 'error' || type === 'warning') {
      throw new Error(`Unknown property "${type}". Cannot set property color as the default one.`);
    } else {
      colors[type] = color;
    }
  }

  static colorize(message, color, filled = false) {
    return filled ? `${color}${message}\x1b[0m` : message;
  }

  static logMessage(type, message, { options = {} } = {}) {
    if (arguments.length > 3) {
      throw new Error(`The "${type}" function does not accept more than two arguments.`);
    }

    const { filled = false } = options;

    const color = colors[type];
    const logType = type.toUpperCase();
    const coloredLogType = `${color}[${logType}]\x1b[0m`;
    const coloredMessage = this.colorize(message, color, filled);
    console.log(`${coloredLogType}: ${coloredMessage}`);
  }

  static success(message, { options = {} } = {}) {
    this.logMessage('success', message, { options });
  }

  static error(message, { options = {} } = {}) {
    this.logMessage('error', message, { options });
  }

  static warning(message, { options = {} } = {}) {
    this.logMessage('warning', message, { options });
  }

  static log(message, { options = {} } = {}) {
    this.logMessage('logs', message, { options });
  }
}

module.exports = p;