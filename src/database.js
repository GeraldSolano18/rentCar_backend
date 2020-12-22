import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test-rentCar', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true
}).then(db => console.log('DATABASE RENT CAR is connected'))
.catch(err => console.log(err)); 