import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Liste d'utilisateurs en dur pour tester (l'annuaire)
  private users = [
    { email: 'j.doe@fake.com', password: 'apollo-13', name: 'John Doe' },
    { email: 'admin@festival.fr', password: 'password123', name: 'Administrateur' }
  ];

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }
}