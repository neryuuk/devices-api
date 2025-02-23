import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
  protected override formatPid(pid: number): string {
    return pid.toString()
  }

  protected override getTimestamp(): string {
    return new Date().toISOString().split('T').join(' ')
  }

  protected override formatMessage(logLevel: LogLevel, message: unknown, pidMessage: string, formattedLogLevel: string, contextMessage: string, timestampDiff: string): string {
    return `[${this.colorize(pidMessage, logLevel)}|${this.colorize(formattedLogLevel, logLevel)}] ${this.getTimestamp()} ${contextMessage}${this.stringifyMessage(message, logLevel)}${timestampDiff}\n`;
  }
}
