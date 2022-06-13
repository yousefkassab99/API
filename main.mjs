
import express from 'express'
import 'dotenv/config'
import { apiRouter } from './api/router-api.mjs'
import cors from 'cors'
import paginate from 'express-paginate'
import passport from 'passport'
import mongoose from 'mongoose'
//  import swaggerUi from 'swagger-ui-express'
//  import swaggerFile from  './swagger-gen.mjs'




const app = express();
// const router = require("./routes/index");
export const mainApiRouter =express.Router();
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
// require("./middleware/passport-middleware")(passport);




app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

app.use('./api', apiRouter);
// app.use(router);
//  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));





const runApp = async () => {
    try {
         mongoose. connect(process.env.MONGO_DB, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`Successfully connected to database ${process.env.MONGO_DB}`);
        app.listen(process.env.PORT, () => {
            console.log(`Server started successfully on PORT ${process.env.PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
};
runApp();

