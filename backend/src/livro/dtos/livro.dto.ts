import { IsNotEmpty, IsString, IsInt, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLivroDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  editor: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantidade: number;

  @ApiProperty({ description: 'ID da categoria (cuid)' })
  @IsString() 
  @IsNotEmpty()
  categoriaId: string;
}


export class EditLivroDto {
  @ApiProperty({ required: false })
  @IsString()
  nome?: string;

  @ApiProperty({ required: false })
  @IsString()
  autor?: string;

  @ApiProperty({ required: false })
  @IsString()
  editor?: string;

  @ApiProperty({ required: false })
  @IsInt()
  quantidade?: number;

  @ApiProperty({ required: false })
  @IsString()
  categoriaId?: string;
}
