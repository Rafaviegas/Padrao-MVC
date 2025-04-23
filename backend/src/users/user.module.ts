import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { UserController } from "src/users/controller/users.controller";
import { UserService } from "src/users/service/users.service";


@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
