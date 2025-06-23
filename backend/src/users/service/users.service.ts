import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto, EditUserDto } from "../dtos/user.dto";
import * as bcrypt from "bcrypt";
import { privateDecrypt } from "crypto";
import { CloudwatchLoggerService } from "src/cloudwatch-logger/cloudwatch-logger.service";
import { find } from "rxjs";
import { ConflictException } from "@nestjs/common";




@Injectable()
export class UserService { 
    constructor(
        private prisma: PrismaService,
        private readonly logger: CloudwatchLoggerService
    ) {}

    async create(data: CreateUserDto) {

        // Trata se o usuario ja existe na base 
        const emailExists = await this.findByEmail(data.email);
        if (emailExists) {
            this.logger.warn('Tentativa de cadastro com email já existente', {
              email: data.email,
            });
            throw new ConflictException('Email já cadastrado');
          }

        // Gera o Hash da senha e  compara 
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                cargo: data.cargo,
                dataEfetivacao: data.dataEfetivacao,

            },
        });

        const { password, ...result} = user;
        return result;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email },
        });
    }

    async delete(id: string) {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                this.logger.warn('Tentativa de deletar usuário inexistente', { id });
                throw new NotFoundException("Usuário não encontrado");
            }

            await this.prisma.user.delete({ where: { id } });

            this.logger.log('Usuário deletado com sucesso', { id });
            return { message: 'Usuário deletado com sucesso' };
        }

    async edit(id: string, data: EditUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            this.logger.warn('Tentativa de editar usuário inexistente', { id });
            throw new NotFoundException("Usuário não encontrado");
        }

        const updated = await this.prisma.user.update({
            where: { id },
            data: { ...data }
        });

        this.logger.log('Usuário editado com sucesso', {
            id,
            camposEditados: Object.keys(data)
        });

        return updated;
    }

    async getAll() {
        const users = await this.prisma.user.findMany();
        this.logger.log('Listagem de todos os usuários', { quantidade: users.length });
        return users;
    }

    async getById(id: string) {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });

            if (user) {
                this.logger.log('Usuário encontrado por ID', { id });
            } else {
                this.logger.warn('Usuário não encontrado por ID', { id });
            }

            return user;
        }
}