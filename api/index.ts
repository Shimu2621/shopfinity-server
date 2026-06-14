import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;

const serverlessHandler = serverless(app);

export const handler = async (req: any, res: any) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return serverlessHandler(req, res);
};
