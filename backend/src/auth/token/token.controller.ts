import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // N'oublie pas cet import !
import { UsersService } from '../users.service';

@Controller('auth/token')
export class TokenController {
  // On injecte UsersService ET JwtService
  constructor(
    private users: UsersService,
    private jwts: JwtService
  ) {}

  @Get()
  async signIn(@Headers("Authorization") auth: string) {
    const args = auth && auth.split(" ");
    
    if (args && args.length == 2 && args[0] == "Basic") {
      const credentials = Buffer.from(args[1], 'base64').toString('utf-8').split(":");
      const [email, password] = credentials;

      const user = await this.users.findByEmail(email);

      // On vérifie le mot de passe (si tu n'as pas encore bcrypt, garde user.password === password)
      if (user && user.password === password) {
        
        // C'EST ICI QUE TOUT SE JOUE : On génère le token
        const payload = { 
            sub: user.email, // L'identifiant du sujet
            role: 'admin',   // Tu peux ajouter des infos personnalisées
            name: user.name 
        };

        return {
          access_token: this.jwts.sign(payload), // On signe le jeton avec la clé "banane"
          expires_in: 3600
        };
      }
    }
    throw new UnauthorizedException();
  }
}