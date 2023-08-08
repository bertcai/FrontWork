import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnApplicationBootstrap,
  OnModuleInit,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Controller('bbb')
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('BbbController onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('BbbController onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('BbbController onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('BbbController beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('BbbController onApplicationShutdown', signal);
  }
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
