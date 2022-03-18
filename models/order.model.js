const mongodb = require('mongodb');

const db = require('../data/database');

class Order {
    //we have 3 statuses: pending, fulfilled, cancelled.
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
          }
          this.id = orderId;
    }


    //transform existing objectDocument into object we want to use
    static transformOrderDocument(orderDoc) {
        return new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc._id);
      }

    //map above transform object
    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument); 
      }
    

    //find all orders.
    static async findAll() {
        const orders = await db //orders = objectDocument from save method
          .getDb()
          .collection('orders')
          .find()
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }


    //find all orders where userdata._id = uid. orders for specific user
    static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        const orders = await db
          .getDb()
          .collection('orders')
          .find({ 'userData._id': uid })
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }


    //find one order by id(order id), used in admin.controller
    static async findById(orderId) {
        const order = await db
          .getDb()
          .collection('orders')
          .findOne({ _id: new mongodb.ObjectId(orderId) });
    
        return this.transformOrderDocument(order);
      }




    save() {
        if(this.order) { //if order Id exists, then we're updating existing order. When Admin updates status, we're calling save(), this method will check and see that order already exists, so it'll update order, instead of saving whole order again.
            const orderId = new mongodb.ObjectId(this.id);
                return db 
                    .getDb()
                    .collection('orders')
                    .updateOne({ _id: orderId }, { $set: { status: this.status } });
        } else { //if id doesn't exists we're adding new order 

            //order object which will be saved in database
            const objectDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status,
            }
            //save new order in database
           return db.getDb().collection('orders').insertOne(objectDocument )
        }
    }
}


module.exports = Order;