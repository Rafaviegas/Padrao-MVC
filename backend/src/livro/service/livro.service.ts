import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CloudwatchLoggerService } from 'src/cloudwatch-logger/cloudwatch-logger.service';
import { CreateLivroDto, EditLivroDto } from '../dtos/livro.dto';

@Injectable()
export class LivroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CloudwatchLoggerService
  ) {}

  async create(data: CreateLivroDto) {
    const livro = await this.prisma.livro.create({ data });
    this.logger.log('Livro criado com sucesso', { id: livro.id, nome: livro.nome });
    return livro;
  }

  async getAll() {
    const livros = await this.prisma.livro.findMany({ include: { categoria: true } });
    this.logger.log('Listagem de livros', { quantidade: livros.length });
    return livros;
  }

  async getById(id: string) {
    const livro = await this.prisma.livro.findUnique({
      where: { id },
      include: { categoria: true, emprestimos: true },
    });

    if (!livro) {
      this.logger.warn('Livro não encontrado', { id });
      throw new NotFoundException('Livro não encontrado');
    }

    this.logger.log('Livro encontrado', { id });
    return livro;
  }

  async edit(id: string, data: EditLivroDto) {
    const livro = await this.prisma.livro.findUnique({ where: { id } });

    if (!livro) {
      this.logger.warn('Tentativa de edição de livro inexistente', { id });
      throw new NotFoundException('Livro não encontrado');
    }

    const updated = await this.prisma.livro.update({ where: { id }, data });
    this.logger.log('Livro editado', { id, camposEditados: Object.keys(data) });
    return updated;
  }

  async delete(id: string) {
    const livro = await this.prisma.livro.findUnique({ where: { id } });

    if (!livro) {
      this.logger.warn('Tentativa de deletar livro inexistente', { id });
      throw new NotFoundException('Livro não encontrado');
    }

    await this.prisma.livro.delete({ where: { id } });
    this.logger.log('Livro deletado com sucesso', { id });
    return { message: 'Livro deletado com sucesso' };
  }
}
