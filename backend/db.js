const mongoose = require('mongoose');


require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("✅ DB Connected Successfully.");

        const data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = data;

        const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = catData;
        // console.log(global.foodCategory);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
    }
};

module.exports = dbConnect;
