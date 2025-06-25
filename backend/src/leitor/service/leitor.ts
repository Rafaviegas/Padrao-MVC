import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CloudwatchLoggerService } from 'src/cloudwatch-logger/cloudwatch-logger.service';
import { CreateLeitorDto, EditLeitorDto } from '../dto/leitor';

@Injectable()
export class LeitorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CloudwatchLoggerService
  ) {}

  async create(data: CreateLeitorDto) {
    const exists = await this.findByEmail(data.email);
    if (exists) {
      this.logger.warn('Tentativa de criação com email já existente', { email: data.email });
      throw new ConflictException('Email já cadastrado');
    }

    const leitor = await this.prisma.leitor.create({ data });
    this.logger.log('Leitor criado com sucesso', { id: leitor.id });
    return leitor;
  }

  async findByEmail(email: string) {
    return this.prisma.leitor.findUnique({ where: { email } });
  }

  async getAll() {
    const leitores = await this.prisma.leitor.findMany();
    this.logger.log('Listagem de leitores', { quantidade: leitores.length });
    return leitores;
  }

  async getById(id: string) {
    const leitor = await this.prisma.leitor.findUnique({ where: { id }, include: { emprestimos: true } });
    if (!leitor) {
      this.logger.warn('Leitor não encontrado por ID', { id });
      throw new NotFoundException('Leitor não encontrado');
    }
    this.logger.log('Leitor encontrado', { id });
    return leitor;
  }

  async edit(id: string, data: EditLeitorDto) {
    const leitor = await this.prisma.leitor.findUnique({ where: { id } });
    if (!leitor) {
      this.logger.warn('Tentativa de edição de leitor inexistente', { id });
      throw new NotFoundException('Leitor não encontrado');
    }

    const updated = await this.prisma.leitor.update({ where: { id }, data });
    this.logger.log('Leitor editado com sucesso', { id, camposEditados: Object.keys(data) });
    return updated;
  }

  async delete(id: string) {
    const leitor = await this.prisma.leitor.findUnique({ where: { id } });
    if (!leitor) {
      this.logger.warn('Tentativa de deletar leitor inexistente', { id });
      throw new NotFoundException('Leitor não encontrado');
    }

    await this.prisma.leitor.delete({ where: { id } });
    this.logger.log('Leitor deletado com sucesso', { id });
    return { message: 'Leitor deletado com sucesso' };
  }
}
