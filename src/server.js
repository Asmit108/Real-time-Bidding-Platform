require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' :
          process.env.NODE_ENV === 'qa' ? '.env.qa' :
          '.env'
});
const app = require(".");
const { connectDb } = require("./config/db");
const PORT=5454;
app.listen(PORT,async()=>{
    await connectDb();
    console.log('ecommerce api listening on port:',PORT)
})