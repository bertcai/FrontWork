import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    {
      provide: 'API_KEY',
      useValue: '123456789',
    },
    {
      provide: 'person',
      useFactory: (key: string, PersonService: PersonService) => {
        return {
          name: '张三',
          age: 18,
          describe: PersonService.greeting('张三' + key),
        };
      },
      inject: ['API_KEY', PersonService],
    },
    {
      provide: 'person2', // 异步注入
      useFactory: async (PersonService: PersonService) => {
        return await PersonService.findOne(1);
      },
      inject: [PersonService],
    },
    {
      provide: 'person3', // 别名注入
      useExisting: 'person2',
    },
  ],
})
export class PersonModule {}
