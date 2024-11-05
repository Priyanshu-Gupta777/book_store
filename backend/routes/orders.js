const router = require('express').Router();
const book = require('../models/book');
const Order = require('../models/order')
const User = require('../models/user');
const {authenticateToken} = require('./userAuth');

//place order
router.post('/place-order', authenticateToken, async(req,res) =>{
  try{
    const {id} = req.headers;
    const {order} = req.body;

    for(const orderData of order){
        const newOrder = new Order({user : id, book : orderData._id});
        const orderDataFromDb = await newOrder.save();

        //saving data in User model
        await User.findByIdAndUpdate(id, {$push : {order : orderDataFromDb._id}});

        //clearing data
        await User.findByIdAndUpdate(id, {$pull : {cart : orderData._id}});

    }
    return res.status(200).json({staus : 'success', message : 'order placed successfully'});
  }
  catch(error){
    return res.status(500).json({message:'Internal server error'});
  }
});

//history
router.get('/get-order-history', authenticateToken, async(req,res) => {
    try{
        const {id} = req.headers;

        if (!id) {
            return res.status(400).json({ message: 'User ID is missing' });
          } 

        const userData = await User.findById(id).populate({path : 'order', populate : {path : 'book'} });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
          }

        const ordersData = userData.order.reverse();

        return res.json({status : 'success', data : ordersData})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:'Internal server error'});}
});

//get all orders --admin
router.get('/get-all-orders', authenticateToken, async(req,res) => {
    try{
        const userData = await Order.find().populate({path:'book',}).populate({path:'user',}).sort({createdAt: -1});
        return res.json({status : 'success', data : userData});
    }
    catch(error){return res.status(500).json({message:'Internal server error'});}
});

//update order --admin
router.put('/update-status/:id', authenticateToken, async(req,res) => {
    try{
        const {id} = req.params;
        //const userId = req.user.id;
        
        //const user = await User.findById(userId);
        //console.log(user.data,userId)

        //if (!user) {
       //   return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
      //}

        //if( user.role !== 'admin'){
        //    return res.status(200).json({message : `You can't access admin role`});
        //}
         await Order.findByIdAndUpdate(id, {status : req.body.status});
        //if (!updatedOrder) {
         // return res.status(404).json({ message: 'Order not found' });
       // }
        return res.json({status : 'success', message:'status updated successfully'});
    }
    catch(error){return res.status(500).json({message:'Internal server error'});}
});

module.exports = router;