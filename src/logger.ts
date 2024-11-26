import log from 'loglevel';
import fs from 'fs';

// Create a write stream for logging to a file
const logFile = fs.createWriteStream('./app.log', { flags: 'a' });

// Capture the original methodFactory before redefining it
const originalFactory = log.methodFactory;

log.methodFactory = function (methodName, level, loggerName) {
    const rawMethod = originalFactory(methodName, level, loggerName); // Use the captured originalFactory

    return function (message) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: methodName,
            message
        };
        const jsonLogEntry = JSON.stringify(logEntry)
        rawMethod(jsonLogEntry); // Log to console
        logFile.write(`${jsonLogEntry}\n`);
    };
};

// Apply the custom method factory
log.setLevel('info'); // Levels: trace, debug, info, warn, error, silent
log.rebuild();

export default log;
