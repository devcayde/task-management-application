import * as dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT || 3002);
export const isDev = process.env.NODE_ENV !== "production";
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
