import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsNotEmpty,MinLength, IsDate } from 'class-validator';
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

    @IsDate()
    @Type(() => Date) // do class-transformer
    @ApiProperty({ example: '2004-11-10T00:00:00.000Z' })
    dataEfetivacao: Date
}


export class EditUserDto extends PartialType(CreateUserDto){}