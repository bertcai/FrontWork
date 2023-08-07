import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person: ' + JSON.stringify(createPersonDto);
  }

  upload(createPersonDto: CreatePersonDto, files: Array<Express.Multer.File>) {
    return (
      'This action adds a new person: ' +
      JSON.stringify(createPersonDto) +
      ' and files: ' +
      JSON.stringify(files)
    );
  }

  findAll() {
    return `This action returns all person`;
  }

  query(name: string, age: number) {
    return `This action returns all person with name: ${name} and age: ${age}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
