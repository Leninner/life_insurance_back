import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from './controllers/auth.controller'
import { UserController } from './controllers/user.controller'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { User } from './entities/user.entity'
import { Role } from './entities/role.entity'
import { RoleService } from './services/role.service'
import { RoleController } from './controllers/role.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('NODE_ENV') === 'development' ? '7d' : '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UserController, RoleController],
  providers: [AuthService, UserService, JwtStrategy, ConfigService, RoleService],
  exports: [AuthService, UserService, RoleService],
})
export class AuthModule {}
