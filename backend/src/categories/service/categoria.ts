import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CloudwatchLoggerService } from 'src/cloudwatch-logger/cloudwatch-logger.service';
import { CreateCategoriaDto, EditCategoriaDto } from '../dtos/categories';

@Injectable()
export class CategoriaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CloudwatchLoggerService
  ) {}

  async create(data: CreateCategoriaDto) {
    const nomeExists = await this.findByNome(data.nome);

    if (nomeExists) {
      this.logger.warn('Tentativa de criação com nome de categoria já existente', {
        nome: data.nome,
      });
      throw new ConflictException('Categoria já cadastrada com esse nome');
    }

    const categoria = await this.prisma.categoria.create({
      data: {
        nome: data.nome,
      },
    });

    this.logger.log('Categoria criada com sucesso', { id: categoria.id, nome: categoria.nome });

    return categoria;
  }

  async findByNome(nome: string) {
    return this.prisma.categoria.findUnique({
      where: { nome },
    });
  }

  async getAll() {
    const categorias = await this.prisma.categoria.findMany();
    this.logger.log('Listagem de todas as categorias', { quantidade: categorias.length });
    return categorias;
  }

  async getById(id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: { livros: true }, // Inclui livros se necessário
    });

    if (!categoria) {
      this.logger.warn('Categoria não encontrada por ID', { id });
      throw new NotFoundException('Categoria não encontrada');
    }

    this.logger.log('Categoria encontrada por ID', { id });
    return categoria;
  }

  async edit(id: string, data: EditCategoriaDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      this.logger.warn('Tentativa de editar categoria inexistente', { id });
      throw new NotFoundException('Categoria não encontrada');
    }

    const updated = await this.prisma.categoria.update({
      where: { id },
      data: { ...data },
    });

    this.logger.log('Categoria editada com sucesso', {
      id,
      camposEditados: Object.keys(data),
    });

    return updated;
  }

  async delete(id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      this.logger.warn('Tentativa de deletar categoria inexistente', { id });
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.prisma.categoria.delete({
      where: { id },
    });

    this.logger.log('Categoria deletada com sucesso', { id });
    return { message: 'Categoria deletada com sucesso' };
  }
}
