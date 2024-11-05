const router = require('express').Router();
const book = require('../models/book');
const User = require('../models/user');
const {authenticateToken} = require('./userAuth');

//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async(req,res) => {
   try{
    const {bookid,id} = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if(isBookFavourite){return res.status(200).json({message:'Book already exist in favourite'});}
    await User.findByIdAndUpdate(id, {$push : {favourites : bookid}});
    return res.status(200).json({message:'Book added to favourite'});
   }
   catch(error)
   {
    return res.status(500).json({message : 'Internal server error'});
   }
});

router.put("/remove-book-from-favourite", authenticateToken, async(req,res) => {
    try{
     const {bookid,id} = req.headers;
     const userData = await User.findById(id);
     const isBookFavourite = userData.favourites.includes(bookid);
     if(isBookFavourite){await User.findByIdAndUpdate(id, {$pull : {favourites : bookid}});}
     
     return res.status(200).json({message:'Book removed from favourite'});
    }
    catch(error)
    {
     return res.status(500).json({message : 'Internal server error'});
    }
 });

router.get("/get-favourite-books", authenticateToken, async(req,res) =>{
    try
    {
     const {id} = req.headers;
     //console.log(id);
     const userData = await User.findById(id).populate("favourites");
     //console.log(userData);
     const favouriteBooks = userData.favourites;
     return res.json({status : 'success', data : favouriteBooks});
    }
    catch(error)
    {
        return res.status(500).json({message : 'Internal Server error'});
    }
 });

module.exports = router;