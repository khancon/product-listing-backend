import log from 'loglevel';
import fs from 'fs';

const logFile = fs.createWriteStream('./app.log', { flags: 'a' });

log.methodFactory = function (methodName, level, loggerName) {
    const originalFactory = log.methodFactory;
    const rawMethod = originalFactory(methodName, level, loggerName);

    return function (message) {
        rawMethod(message); // Log to console
        logFile.write(`${new Date().toISOString()} [${me