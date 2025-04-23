import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from "../dtos/user.dto";
import * as bcrypt from "bcrypt";




@Injectable()
export class UserService { 
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
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
