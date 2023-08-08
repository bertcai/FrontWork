import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CccFilter } from 'src/ccc.filter';
import { CccException } from 'src/CccException';

@Controller('api/person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    @Inject('API_KEY') private readonly API_KEY: string, // 使用注入的方式获取配置
    @Inject('person') private readonly person: { name: string; age: number }, // 使用注入的方式获取配置
    @Inject('person2') private readonly person2: any, // 使用异步注入的方式获取配置
    @Inject('person3') private readonly person3: any, // 使用别名注入的方式获取配置
  ) {}

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: './uploads',
    }),
  )
  upload(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.personService.upload(createPersonDto, files);
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @UseFilters(CccFilter)
  findAll() {
    console.log(this.API_KEY);
    console.log(this.person);
    console.log(this.person2);
    console.log(this.person3);
    throw new CccException('aaa', 'bbb');
    return this.personService.findAll();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return this.personService.query(name, age);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
