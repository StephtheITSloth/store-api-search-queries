const Product = require('../models/product')


const getAllProducts = async (req,res) => {
        // throw new Error('testing async error')
        const {featured, company, name, sort, fields, numericFilters} = req.query

        const queryObject = {}

        if(featured){
            queryObject.featured = featured === 'true' ? true : false
        }

        if(company){
            queryObject.company = company
        }

        if(name){
            queryObject.name = {$regex: name, $options: 'i'}
        }

        if(numericFilters){
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '>=': '$lte',
                
            }
            const regEx = /\b(<|>|>=|=|<|<=)\b/g
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    
            const options = ['price','rating']

            filters = filters.split(',').forEach(item =>{
                const [field,operator,value] = item.split('-')

                if(options.includes(field)){
                    queryObject[field] = {[operator]:value}
                }
            })
        }

        let result = Product.find(queryObject)

        //sort
        if(sort){
            const sortedList = sort.split(',').join(' ')
            result.sort(sortedList)
        }else{
            result.sort('createdAt')
        }

        if(fields){
            const formatFields = fields.split(",").join(' ')
            result.select(formatFields)
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        result.skip(skip).limit(limit)

        const products = await result
        res.status(200).json({products, nbHits: products.length})
}



module.exports = {getAllProducts}