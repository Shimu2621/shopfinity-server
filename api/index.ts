import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;

const serverlessHandler = serverless(app);

export const handler = async (req: any, res: any) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    return serverlessHandler(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Internal server error",
        details: (err as Error).message,
      }),
    );
  }
};
