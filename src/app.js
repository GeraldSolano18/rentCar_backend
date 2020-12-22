import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import carRouter from './routes/car.routes'
import orderRouter from './routes/order.routes'
import {createRoles} from './libs/initialSetup'

const app = express();

//Create roles
createRoles();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('pkg',pkg);


app.get ('/',(req, res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version:app.get('pkg').version
    })
})

//body parser
app.use(express.json());

//middleware
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes )
app.use('/api/cars',carRouter)
app.use('/api/order',orderRouter)

export default app;