export interface NotificationService {
    notify(message: string): void;
}

export class EmailNotificationService implements NotificationService {
    notify(message: string): void {
        console.log(`[Via Email]: ${message}`);
    }
}

export class ConsoleNotificationService implements NotificationService {
    notify(message: string): void {
        console.log(`[Via Console]: ${message}`);
    }
}