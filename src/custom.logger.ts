import { ConsoleLogger } from '@nestjs/common'

export class CustomLogger extends ConsoleLogger {
  protected override formatPid(pid: number): string {
    return `[Nest] ${pid} - `
  }

  protected override getTimestamp(): string {
    return new Date().toISOString().split('T').join(' ')
  }
}
