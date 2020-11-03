const MongoClient = require('mongodb').MongoClient;
const conectionMDB = 'mongodb+srv://serafimaMadan:salvik4477@clusterconvertdata.lv1wi.mongodb.net/World';


async function seedDatabase() {
    // we  need to go to Atlas/Cluster/Connect/connect your application/copy and paste the URL 
    const client = new MongoClient(conectionMDB);

    try {
        await client.connect();

        // creat new record 
        const  newCity = {
            Id : 4080, 
            Name : "Orel", 
            CountryCode: "RUS", 
            District: "Orel", 
            Population : 308838
        };
        const result = await client.db("World").collection("city").insertOne(newCity);
        console.log(result);

        // update that record with a new population 
        const filter = { Id: 4080 };
        const updateDoc = {
            $set: { Population: 308938 },
        };
        const resultUpdating = await client.db('World').collection('city').updateOne(filter, updateDoc);
        console.log(resultUpdating);


        // read the document that was just updated in two ways : finding by the city name, and then by the country code
        const queryName = { Name : "Orel" };
        const queryCode = { CountryCode : "RUS" };
        const resultName = await client.db('World').collection('city').findOne(queryName);
        const resultCode = await client.db('World').collection('city').findOne(queryCode);
        console.log(resultName, resultCode);

        // delete the city
        const queryId = {Id : 4080};
        const resultId = await client.db('World').collection('city').deleteOne(queryId);
        console.log(resultId);
        
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

seedDatabase().catch(console.error);


