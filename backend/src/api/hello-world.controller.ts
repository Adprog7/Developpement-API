import { Request, Response } from 'express';

export class HelloWorldController {
  static get(req: Request, res: Response): void {
    res.send('Hello world');
  }
}