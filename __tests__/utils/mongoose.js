import mongoose, { mongo } from 'mongoose'

export const connect = () => mongoose.connect('mongodb+srv://bikramaryal:bhadrakali@321@tigercafe-fdk21.mongodb.net/nodetest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


export const disconnect = () => mongoose.connection.close()