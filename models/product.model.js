const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
    constructor(productData) {
        //productData will be req.body object(add new product form fields). This is instance of that class.
        this.title = productData.title; //last title comes from html input name.
        this.summary = productData.summary;
        this.price = +productData.price; //+ to store it as a number
        this.description = productData.description;
        this.image = productData.image;   //image name is expected
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`; //path which should be used to request image from server
        if(productData._id){ //to prevent tostring() error.
            this.id = productData._id.toString();
        };
    }

        //find specific products by id (for update product page)
    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId); //constructor package provided by mongodb. we will get mongodb object id format, because now we're getting it as string format.
        } catch(error) {
            error.code = 404; 
            throw error;
        }
        const product = await db.getDb().collection('products').findOne({_id: prodId});

            //if we can't find any product with that id
        if(!product){ 
            const error = new Error('Can\'t find product with provided id'); //built in error class
            error.code = 404; //code is written by us. adding error object code property 
            throw error;
        } 

        return new Product(product);

    }

        //get all admin products. 
    static async findAllProducts() {
        const products = await db.getDb().collection('products').find().toArray(); //find all product objects into an array
        return products.map(productDoc => {
            return new Product(productDoc);
        })
    }

        //talk to database
    async save() { 
        const productData = { //helper object to store data as we need it
            title: this.title, 
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,  
        };

        
        //logic for updating existing product, existing product will have an id, non existing one not.
            if(this.id) {
                const prodId = new mongodb.ObjectId(this.id);

                //if we don't upload new image during updating, not to override existing with null
                if(!this.image) {
                    delete productData.image // deletes key/value pair from productData
                }

                await db.getDb().collection('products').updateOne({_id: prodId}, {
                    $set: productData
                });

            } else {
                 //if we don't have id we're creating new entry in database
                await db.getDb().collection('products').insertOne(productData)
            }

    };

    static async findMultiple(ids) {
        const productIds = ids.map(function(id) {
          return new mongodb.ObjectId(id);
        })
        
        const products = await db
          .getDb()
          .collection('products')
          .find({ _id: { $in: productIds } })
          .toArray();
    
        return products.map(function (productDocument) {
          return new Product(productDocument);
        });
      }

    async replaceImage(newImg) {
        this.image = newImg;
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    };

    async remove() {
        const prodId = new mongodb.ObjectId(this.id);
        await db.getDb().collection('products').deleteOne({_id: prodId});
    };
}

module.exports = Product;