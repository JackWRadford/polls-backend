import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectToCluster(uri: string): Promise<MongoClient> {
    console.log('uri: ', uri)
    const mongoClient = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    })
    
    try {
        console.log('Connecting to MongoDB Atlas cluster...')
        await mongoClient.connect()
        console.log('Successfully connected to MongoDB Atlas!')
        return mongoClient
    } catch (error) {
        console.log('Connection to MongoDB Atlas failed!', error)
        process.exit()
    }
}