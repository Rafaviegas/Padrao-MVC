import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "src/auth/services/auth.service";
import { LoginDto } from "src/auth/dtos/login.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
       const user = await this.authService.validateUser(loginDto.email, loginDto.password);
       return this.authService.login(user);
    }
}