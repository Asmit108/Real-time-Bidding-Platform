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

// Define the Bid model
const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Item', // Name of the referenced model
      key: 'id'      // Key in the referenced model
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Name of the referenced model
      key: 'id'     // Key in the referenced model
    }
  },
  bid_amount: {
    type: DataTypes.DECIMAL(10, 2), // 10 total digits, 2 after the decimal point
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

module.exports=Bid
