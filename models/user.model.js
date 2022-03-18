//excess to database. good practice to import third party packages first, then our files.
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street: street, //value 2nd is class  argument, we chose the key name
            postal: postal,
            city: city
        };
    };

    //it will be stored as document in mongodb database. above code is collecting and setting key/value, below is saving it.
    async signUp() {
        const hashedPass = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email, //this email = email.
            password: hashedPass,
            fullname: this.fullname,
            address: this.address
        });
    };  


    //using in orders controllers, find all users by session id
    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);
        return db.getDb().collection('users').findOne({ _id: uid }, { projection: { password: 0 } }); //second parameter controlls which kind of data we want to get. we don't want password in this scenario

    }   

    //for sign in 
    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email });
    }

    //for sign up - check if user email already exists, not to have 2 users under same email
    async existsAlready() {     
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) { //თუ არსებობს true, თუ არსებობს false
            return true;
        };
        return false;
    }

    comparePassword (hashedPass) {
        return bcrypt.compare(this.password, hashedPass);
    }

        
    
};

module.exports = User;