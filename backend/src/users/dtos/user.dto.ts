import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsNotEmpty,MinLength, IsDate, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
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

    @IsNotEmpty()
    @ApiProperty({example: 'Recepcionista'})
    cargo: string
}


export class EditUserDto extends PartialType(CreateUserDto){}