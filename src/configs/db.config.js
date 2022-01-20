const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoDbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@miniproject-ecommerce-d.yz3ec.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoDbUrl);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.log(`Could not connect to the database. Exiting now...\n${error}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;
