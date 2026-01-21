import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors();
  
  // Récupérer le serveur HTTP pour Socket.IO
  const httpServer = app.getHttpServer();
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  
  // Socket.IO
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connecté`);
    
    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} déconnecté : ${reason}`);
    });
  });
  
  await app.listen(3000);
  console.log('Server running at http://localhost:3000');
}

bootstrap();