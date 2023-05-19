import { connect, ConnectOptions } from 'mongoose';

export const dcConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('Connect succesfully!'),
        (error) => console.log(error)
    )
}