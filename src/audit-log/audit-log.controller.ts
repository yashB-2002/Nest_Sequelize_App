import { Controller, Get } from '@nestjs/common';
import { AuditService } from './audit-log.service';

@Controller('audit-log')
export class AuditLogController {
    constructor(private readonly auditService: AuditService) {}

    @Get()
    async getAllAuditLogs() {
        return this.auditService.getAllAuditLogs();
    }
}
