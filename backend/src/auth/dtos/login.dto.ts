import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  
  @ApiProperty({example: 'lucas@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: "MeuGatinhoLindo123"})
  @IsNotEmpty()
  password: string;
}
