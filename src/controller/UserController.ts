import { Request, Response } from "express";
import axios from 'axios';
import dotenv from 'dotenv';

import { LoginInputDTO } from "../business/entities/user";
import { CustomError } from "../errors/CustomError";

dotenv.config();

export class UserController {
   protected static client_id: string = process.env.GITHUB_CLIENT_ID as string;
   protected static client_secret: string = process.env.GITHUB_CLIENT_SECRET as string;
   protected static getAccessToken = async (code: any) => {
      const input: LoginInputDTO = {
         client_id: UserController.client_id,
         client_secret: UserController.client_secret,
         code
      }

      const res = await axios.post("https://github.com/login/oauth/access_token", input, {
         headers: {
            accept: 'application/json',
            'Access-Control-Allow-Origin': 'https://github.com',
            "Access-Control-Allow-Headers": "X-Requested-With, content-type"
         }
      })
      .then((response: any) => {
         const data: string = response.data.access_token;
         
         return data;
      })
      .catch((error: any) => {
         throw new CustomError(error.response.status, error.response.statusText)
      });

      return res;
   }

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
 
   public async loginCallback(req: Request, res: Response) {
      try {
         res.setHeader("Access-Control-Allow-Origin", "https://github.com");
         res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
         res.setHeader("Content-Type", "application/json");

         const { code } = req.query;

         const token: string = await UserController.getAccessToken(code) 

         res.send({ token })
      } catch (error) {
         const { statusCode, message } = error;
         res.status(statusCode || 400).send({ message });
      };
   }

   public async loginDetails(req: Request, res: Response) {
      try {
         const { body } = req;

         console.log(body)
      } catch (error) {
         const { statusCode, message } = error;
         res.status(statusCode || 400).send({ message });
      };
   };
}

export default new UserController();