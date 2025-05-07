import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/service/users.service";
import { userEntity } from "src/auth/models/user.entity";
import { CloudwatchLoggerService } from "src/cloudwatch-logger/cloudwatch-logger.service";
import * as bcrypt from "bcrypt";
import { access } from "fs";



@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly logger: CloudwatchLoggerService
    ){}

    async validateUser(email: string, password: string): Promise<userEntity> {
       
        // Busca o usuario no banco de dados pelo email ultilizando o prisma
        const user = await this.userService.findByEmail(email);
        if (!user) {
            this.logger.warn('Login falhou: email não encontrado' + { email });
            throw new UnauthorizedException('Usuario Não encontrado');
        }


        // Se eu achar o usuario pelo email, comparo as senhas ultilizando o bcrypt que ja gera o hash e compara com o banco
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            this.logger.warn('Login falhou: Senha Invalida' + {email})
            throw new UnauthorizedException('Senha inválida');
        }

        return new userEntity(user) 
     }

    async login(user: userEntity){
        const payload = {sub: user.id, email: user.email};
        const token = this.jwtService.sign(payload)
        this.logger.log("Login efetuado com sucesso: " + {userId: user.id, email: user.email});
        return {
            access_token : token
        }
    }


}