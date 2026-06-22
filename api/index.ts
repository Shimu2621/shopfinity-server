// import serverless from "serverless-http";
// import app from "../src/app";
// import { connectDB } from "../src/config/db";

// let isConnected = false;

// const serverlessHandler = serverless(app);

// const handler = async (req: any, res: any) => {
//   try {
//     if (!isConnected) {
//       await connectDB();
//       isConnected = true;
//     }
//   } catch (err) {
//     console.error("DB connection error:", err);
//   }
//   return serverlessHandler(req, res);
// };

// export default handler;

import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/db";

connectDB(); // 👈 ONLY ONCE (GLOBAL SCOPE)

export default serverless(app);
