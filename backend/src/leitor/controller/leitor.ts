import {
  Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus,
} from '@nestjs/common';
import { LeitorService } from '../service/leitor';
import { CreateLeitorDto, EditLeitorDto } from '../dto/leitor';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Leitores')
@Controller('leitores')
export class LeitorController {
  constructor(private readonly leitorService: LeitorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo leitor' })
  async create(@Body() data: CreateLeitorDto) {
    return this.leitorService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os leitores' })
  async getAll() {
    return this.leitorService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter leitor por ID' })
  async getById(@Param('id') id: string) {
    return this.leitorService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar leitor' })
  async edit(@Param('id') id: string, @Body() data: EditLeitorDto) {
    return this.leitorService.edit(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar leitor' })
  async delete(@Param('id') id: string) {
    return this.leitorService.delete(id);
  }
}
