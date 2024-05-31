// Import Sequelize
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()
// Define the Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST, // Use environment variables for configuration
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Define the Item model
const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  starting_price: {
    type: DataTypes.DECIMAL(10, 2), // 10 total digits, 2 after the decimal point
    allowNull: false
  },
  current_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: sequelize.col('starting_price') // Set default value to starting_price
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true // Nullable
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

module.exports=Item
