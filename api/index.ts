// import serverless from "serverless-http";
// import app from "../src/app";

export default function handler(req: any, res: any) {
  res.status(200).json({
    success: true,
    message: "Vercel function works",
  });
}

// export const handler = serverless(app);
