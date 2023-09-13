import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { CircularDependAModule } from './circular-depend-a/circular-depend-a.module';
import { CircularDependBModule } from './circular-depend-b/circular-depend-b.module';

@Module({
  imports: [PersonModule, AaaModule, BbbModule, CircularDependAModule, CircularDependBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
