const mongoose = require('mongoose')



const getAllProducts = async (req,res) => {
    try {
        // const products = await mongoose.find({})
        res.status(200).json({msg: 'products routes'})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getSingleProduct = async (req,res) => {
    try {
        const productID = req.params.id 
        const product = await mongoose.findOneById({id: productID})

        if(!product){
            res.status(404).json({msg: `no product found with id: ${productID}`})
        }

        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({msg: error})
    }
    

}

const createProduct = async (req,res) => {
    try {
        const {name,price,company,rating} = req.body

        
    } catch (error) {
        
    }
}

const updateProduct = () => {

}

const deleteProduct = () => {

}


module.exports = {getAllProducts}