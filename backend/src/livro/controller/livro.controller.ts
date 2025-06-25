import {
  Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus,
} from '@nestjs/common';
import { LivroService } from '../service/livro.service';
import { CreateLivroDto, EditLivroDto } from '../dtos/livro.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('livros')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo livro' })
  async create(@Body() data: CreateLivroDto) {
    return this.livroService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  async getAll() {
    return this.livroService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter livro por ID' })
  async getById(@Param('id') id: string) {
    return this.livroService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar livro' })
  async edit(@Param('id') id: string, @Body() data: EditLivroDto) {
    return this.livroService.edit(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover livro' })
  async delete(@Param('id') id: string) {
    return this.livroService.delete(id);
  }
}
