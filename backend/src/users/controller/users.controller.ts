import { Body, Controller, Delete, HttpCode, Param, Post, Put, Get, UseGuards} from "@nestjs/common";
import { UserService } from "../service/users.service";
import { CreateUserDto, EditUserDto } from "../dtos/user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { ApiBearerAuth } from "@nestjs/swagger";



@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    @HttpCode(202)
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data)
    };

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt-auth')
    @HttpCode(200)
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt-auth')
    @HttpCode(200)
    edit(@Body() data: EditUserDto, @Param('id') id: string) {
        return this.userService.edit(id, data)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt-auth')
    @HttpCode(200)
    getById(@Param('id') id: string){
        return this.userService.getById(id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt-auth')
    @HttpCode(200)
    getAll(){
        return this.userService.getAll()
    }
    

}

