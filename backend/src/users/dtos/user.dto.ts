import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty,MinLength} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: 'lucas@gmail.com'})
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'MeuGatinhoLindo123'})
    password: string;

    @IsNotEmpty()
    @ApiProperty({example: 'Lucas Maciel Campos'})
    name: string;
}