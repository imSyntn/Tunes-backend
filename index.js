const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { proxyRoute } = require('./Routes/ProxyRoutes')
const { userRoute } = require('./Routes/userRoute');
const { userDataRoute } = require('./Routes/userDataRoute');
const { RestrictToUser } = require('./Middleware/RestrictToUser');
const { errorMiddleware } = require('./Middleware/ErrorMiddleware');
const cluster = require('cluster')
const os = require('node:os')

const app = express();
dotEnv.config()



if (!cluster.isMaster) {
    const cpus = os.cpus().length
    console.log(cpus)
    for (let i = 0; i < cpus; i++) {
        console.log(process.pid)
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart a new worker
    });
} else {

    // process.env.MONGODB_URL
    // 'mongodb://127.0.0.1:8080/user'
    mongoose.connect('mongodb://127.0.0.1:8080/user')
        .then(() => console.log('MongoDB connected.'))
        .catch(e => console.log(e))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    // app.use(function (req, res, next) {

    //     var allowedDomains = ['https://stream-tunes.vercel.app', 'http://localhost:5173'];
    //     var origin = req.headers.origin;
    //     if (allowedDomains.indexOf(origin) > -1) {
    //         res.setHeader('Access-Control-Allow-Origin', origin);
    //     }

    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    //     res.setHeader('Access-Control-Allow-Credentials', true);

    //     next();
    // })

    // process.env.ORIGIN
    app.use(cors({
        origin: true,
        credentials: true
    }));

    app.set('view engine', 'ejs')

    app.use('/api', proxyRoute)
    app.use('/api/user', userRoute)

    app.use('/api/user/data', RestrictToUser, userDataRoute)

    app.use(errorMiddleware)


    app.listen(8000, () => {
        console.log('Server started on port 8000');
    });

}