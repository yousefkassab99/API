import express from "express";

 import { UserRouter } from "../api/User.mjs";
 import { tagRouter } from "../api/tag.mjs";
import { postRouter } from "./Post.mjs";
import { commentRouter } from "../api/comment.mjs";

// import swaggerUi from "swagger-ui-express";
// import swagDocs from "./../../swagger.json" assert { type: "json" };

//  import jwt from "jsonwebtoken";


export const apiRouter = express.Router();
apiRouter.use(express.json());

apiRouter.use((req, res, next) => {
  console.log(`New request: ${req.url}`);
  next();
});
//auth
/*
 apiRouter.use("/authors", [Authorize,UserRouter]);
 apiRouter.use("/tag", [Authorize,tagRouter]);

 apiRouter.use("/post", [Authorize,postRouter]);
 */

/*
//no auth
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swagDocs));
apiRouter.use("/comment", commentRouter);
apiRouter.use("/auth", login_route);
*/
apiRouter.use('/post',postRouter);
 apiRouter.use('/tag',tagRouter);
 apiRouter.use('/user',UserRouter);
 apiRouter.use('/comment',commentRouter);

// export function Authorize(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = !authHeader ? null : authHeader.split(" ")[1];
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({ message: "the token undefined !!" });
//     }
//     jwt.verify(token, _app.secret_key, (err, user) => {
//       if (err) {
//         console.log(err);
//         return res.status(403).json();
//       }
//       console.log(user);
//       req.user = user;
//       next();
//     });
//   }