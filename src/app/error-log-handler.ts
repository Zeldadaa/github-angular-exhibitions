import { ErrorHandler } from '@angular/core';
export class ErrorLogHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log(`ERRORLOG:${error}`);
    }
}
