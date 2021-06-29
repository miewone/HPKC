const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const uri = `mongodb+srv://miewone:${process.env.mongodbpw}@cluster0.e5ipp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    console.log(`db 비밀번호 : ${process.env.mongodbpw}`);
    await client.connect();
    const users = client.db("fc21").collection("users");
    const cities = client.db("fc21").collection("cities");

    await users.deleteMany({}); // 항상 필터는 걸어놔야함.
    await cities.deleteMany({});

    await cities.insertMany([
        {
            name: "부산",
            population: 1000,
        },
        {
            name: "서울",
            population: 350,
        },
    ]);
    await users.insertMany([
        {
            name: "foo",
            birthYear: 2000,
            contacts: [
                {
                    type: "phone",
                    number: "+821028564723",
                },
                {
                    type: "home",
                    number: "+82513038225",
                },
            ],
            city: "부산",
        },
        {
            name: "bar",
            birthYear: 1995,
            city: "부산",
        },
        {
            name: "baz",
            birthYear: 1990,
            city: "서울",
        },
        {
            name: "pl",
            birthYear: 1991,
            contacts: [
                {
                    type: "phone",
                },
            ],
            city: "부산",
        },
    ]);

    const cursor = users.aggregate([
        {
            $lookup: {
                from: "cities",
                localField: "city",
                foreignField: "name",
                as: "city_info",
            },
        },
        {
            $match: {
                $or: [
                    {
                        "city_info.population": {
                            $gte: 500,
                        },
                    },
                    {
                        birthYear: {
                            $gte: 1995,
                        },
                    },
                ],
            },
        },
        {
            $count: "num_users",
        },
    ]);
    // const cursor = users.find({
    //     "contacts.type": "phone",
    // });
    await cursor.forEach(console.log);
    await client.close();
}

main();
