import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
// import { payload } from "../dtos/user.dto";
import { IntegerType } from "typeorm";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string, length: number) {
    return bcrypt.hashSync(password, length);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  // static generateToken(payload: payload) {
  //   return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  // }
}