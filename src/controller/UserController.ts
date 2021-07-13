import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

export class UserController {
   protected static client_id: string = process.env.GITHUB_CLIENT_ID as string;
   protected static client_secret: string = process.env.GITHUB_CLIENT_SECRET as string;

   public async loginAuth(req: Request, res: Response) {
      try {
         res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
         res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
         res.setHeader("Content-Type", "application/json");

         const url: string = `https://github.com/login/oauth/authorize?client_id=${UserController.client_id}&redirect_uri=http://localhost:3000/login/callback`

         res.redirect(url)
      } catch (error) {
         const { statusCode, message } = error;
         res.status(statusCode || 400).send({ message });
      };
   };
}

export default new UserController();