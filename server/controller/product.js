const Product = require('../models/product')
const slugify = require('slugify');


exports.create = async(req,res) =>{
    try{
        console.log(req.body)
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save();
        res.send(newProduct)
    }
    catch (err){
        console.log(err);
        res.status(400).send('Product category Failed')
    }
}