import log from 'loglevel';
import fs from 'fs';

// Create a write stream for logging to a file
const logFile = fs.createWriteStream('./app.log', { flags: 'a' });

// Capture the original methodFactory before redefining it
const originalFactory = log.methodFactory;

log.methodFactory = function (methodName, level, loggerName) {
    const rawMethod = originalFactory(methodName, level, loggerName); // Use the captured originalFactory

    return function (message) {
        rawMethod(message); // Log to console
        logFile.write(`${new Date().toISOString()} [${methodName}]: ${message}\n`);
    };
};

// Apply the custom method factory
log.setLevel('info'); // Levels: trace, debug, info, warn, error, silent

export default log;
