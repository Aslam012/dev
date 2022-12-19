const express = require("express");
const getListRouter = require("./routes/products/get_list_product");
const createRouter = require("./routes/products/create_product");
const getProductByIdRouter = require("./routes/products/get_product_by_id");
const updateRouter = require("./routes/products/update_product");
const deleteRouter = require("./routes/products/delete_product");
const loginRouter = require("./routes/users/login");
const imageUpload = require("./middleware/img_upload");
const createUserRoute = require("./routes/users/add_user");
const createCartRoute = require("./routes/cart/create_cart");
const deleteCartRoute = require("./routes/cart/delete_cart");
const getListCartRoute = require("./routes/cart/get_list_cart");
const detailsCartRoute = require("./routes/cart/get_details");
const updateCartRoute = require("./routes/cart/update_cart");
const { verify_token } = require("./middleware/jwt_auth");
const userListRouter = require("./routes/users/user_list");
const createOrderRouter = require("./routes/order/create_order");
const getListOrderRoute = require("./routes/order/get_list_order");
const deleteOrderRoute = require("./routes/order/delete_order");
const updateOrderRoute = require("./routes/order/update_order");
const deleteUser = require("./routes/users/delete_user");
const updateUser = require("./routes/users/update_user");
const detailUser = require("./routes/users/detail_user");
const baseRouter = express.Router();

baseRouter.use(async (req, res, next) => {
  try {
    let headers = req.headers;
    if (headers.authorization) {
      req.user = await verify_token(headers.authorization);
    }
    next();
  } catch (error) {
    if (error && error.code) {
      res.status(error.code).send(error)
    } else {
      res.send(error)
    }
  }
});

baseRouter.use('/product', getListRouter)
// baseRouter.use('/product', imageUpload.single("image"), createRouter)
baseRouter.use('/product', createRouter)
baseRouter.use('/product', getProductByIdRouter)
baseRouter.use('/product', updateRouter)
baseRouter.use('/product', deleteRouter)

baseRouter.use('/user', loginRouter)
baseRouter.use('/user', createUserRoute)
baseRouter.use('/user', userListRouter)
baseRouter.use('/user', deleteUser)
baseRouter.use('/user', updateUser)
baseRouter.use('/user', detailUser)



baseRouter.use('/cart', createCartRoute)
baseRouter.use('/cart', deleteCartRoute)
baseRouter.use('/cart', getListCartRoute)
baseRouter.use('/cart', detailsCartRoute)
baseRouter.use('/cart', updateCartRoute)

baseRouter.use('/order', createOrderRouter)
baseRouter.use('/order', getListOrderRoute)
baseRouter.use('/order', deleteOrderRoute)
baseRouter.use('/order', updateOrderRoute)

module.exports = baseRouter;