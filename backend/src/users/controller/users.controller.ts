import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../service/users.service";
import { CreateUserDto } from "../dtos/user.dto";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data)
    };

}