import { Module } from "@nestjs/common";
import { CloudwatchLoggerModule } from "src/cloudwatch-logger/cloudwatch-logger.module";
import { PrismaModule } from "src/database/prisma.module";
import { UserController } from "src/users/controller/users.controller";
import { UserService } from "src/users/service/users.service";


@Module({
    imports: [PrismaModule, CloudwatchLoggerModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
