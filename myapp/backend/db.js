const mongoose = require('mongoose');

const Mongourl = "mongodb+srv://okovijit:<password>@testing.isyn3.mongodb.net/Giga?retryWrites=true&w=majority&appName=testing";

async function mongoDb() {
    try {
        await mongoose.connect(Mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB connected');

        // Load food items
        const foodItemsCollection = mongoose.connection.db.collection('fooditems');
        const fooditems = await foodItemsCollection.find({}).toArray();

        // Load food categories
        const foodCategoryCollection = mongoose.connection.db.collection('foodcatagory');
        const foodcatagory = await foodCategoryCollection.find({}).toArray();

        // Assign to global variables
        global.fooditems = fooditems;
        global.foodcatagory = foodcatagory;

        console.log('Data loaded into global variables');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = mongoDb;
