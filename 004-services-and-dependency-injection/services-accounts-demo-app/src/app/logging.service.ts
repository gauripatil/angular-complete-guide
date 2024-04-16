import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoggingService {
    logStatusChange(accountStatus) {
        console.log('A server status changed, new status:: ' + accountStatus);
    }
}