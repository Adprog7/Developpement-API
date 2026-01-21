import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "banane", // La clé qui signe vos jetons
      signOptions: { expiresIn: '1h' },
    }),
  ], // Si tu utilises TypeOrm plus tard, ajoute TypeOrmModule.forFeature([User])
  controllers: [TokenController],
  providers: [UsersService], // Indispensable pour corriger l'erreur d'injection
})
export class AuthModule {}