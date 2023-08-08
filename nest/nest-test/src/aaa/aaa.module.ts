import {
  BeforeApplicationShutdown,
  Global,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('AaaModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('AaaModule onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('AaaModule onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('AaaModule beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    const aaaService = this.moduleRef.get(AaaService, { strict: false });
    console.log('-----------------------', aaaService.findAll());
    console.log('AaaModule onApplicationShutdown');
  }
}
