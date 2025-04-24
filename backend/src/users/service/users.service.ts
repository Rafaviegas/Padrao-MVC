import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from "../dtos/user.dto";
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
}
