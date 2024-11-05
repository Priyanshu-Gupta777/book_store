const router = require('express').Router();
const book = require('../models/book');
const User = require('../models/user');
const {authenticateToken} = require('./userAuth');

//add book to cart
router.put("/add-book-to-cart", authenticateToken, async(req,res) => {
   try{
    const {bookid,id} = req.headers;
    const userData = await User.findById(id);
    const isBookCart = userData.cart.includes(bookid);
    if(isBookCart){return res.status(200).json({message:'Book already exist in cart'});}
    await User.findByIdAndUpdate(id, {$push : {cart : bookid}});
    return res.status(200).json({message:'Book added to Cart'});
   }
   catch(error)
   {
    return res.status(500).json({message : 'Internal server error'});
   }
});

//remove from cart

router.put('/remove-from-cart/:bookid', authenticateToken, async(req,res)=>{
    try{
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {$pull : {cart : bookid},});
        return res.json({status : 'Success', message : "Book remove from cart"});
    }
    catch(error){return res.status(500).json({message:'Internval server error'});}
});

router.get("/get-user-cart", authenticateToken, async(req,res) =>{
    try
    {
     const {id} = req.headers;
     //console.log(id);
     const userData = await User.findById(id).populate("cart");
     //console.log(userData);
     const cart = userData.cart.reverse();
     return res.json({status : 'success', data : cart});
    }
    catch(error)
    {
        return res.status(500).json({message : 'Internal Server error'});
    }
 });

module.exports = router;