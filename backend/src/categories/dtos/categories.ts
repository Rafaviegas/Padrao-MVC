import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;
}

export class EditCategoriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;
}
