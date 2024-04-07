export class LoggingService {
    logStatusChange(accountStatus) {
        console.log('A server status changed, new status:: ' + accountStatus);
    }
}