const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


app.use(express.json());
app.use(cors())



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)

const userRoutes =require('./routes/userRoutes')
app.use('/user',userRoutes)

const productRoutes = require('./routes/productRoute')
app.use('/products',productRoutes)

const cartRoute = require("./routes/cartRoute")
app.use("/cart", cartRoute);

const wishlistRoutes = require("./routes/wishlistRoute");
app.use("/wishlist", wishlistRoutes);

const addressRoutes = require('./routes/addressRoute')
app.use('/address',addressRoutes)

const userOrderRoutes = require("./routes/userOrderRoutes");
app.use("/userorder", userOrderRoutes);

const sellerOderRoutes= require("./routes/sellerOderRoute")
app.use('/sellerorder', sellerOderRoutes)


const inventoryRoutes = require('./routes/inventoryRoute')
app.use('/inventory', inventoryRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
