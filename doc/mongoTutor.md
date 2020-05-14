```python
# loading our google drive in order to use photos 
from google.colab import drive
drive.mount('/content/drive')
```

```python
# class to display images 
from IPython.display import Image
```

[**David Treib**](https://medium.com/u/23afa685a28e?source=post_page-----
aa140bea21ba----------------------) created
[pixiedust_node](https://github.com/ibm-watson-data-lab/pixiedust_node) an add-
on for Jupyter notebooks that allows Node.js/JavaScript to run inside notebook
cells. It’s built on the popular [PixieDust](https://github.com/ibm-watson-data-
lab/pixiedust_node) helper library

# Installing

```python
!pip install pixiedust
!pip install pixiedust_node
```

It may write that version is outdated and you need to restart **Runtime**

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/mongo.png')
```

```python
import pixiedust_node
```

Execute js commands with **_%%node_**, Example:

```python
%%node
var date = new Date();
print(date);
```

# Installing Mongodb on Mac
MongoDB is a document database which belongs to a family of databases called
NoSQL - not only SQL. In MongoDB, records are documents which behave a lot like
JSON objects in JavaScript. Values in documents can be looked up by their
field’s key. Documents can have some fields/keys and not others, which makes
Mongo extremely flexible.

**Tap the MongoDB Homebrew Tap**
```
brew install mongodb
```
```
brew install mongodb-community@4.2
```


**After downloading mongo**, create */data/db* directory in your root
```
mkdir -p /data/db
```
In the latest Mac os x, you encounter problem such as:
```
mkdir: /data/db: Read-only file system
```
So you can't write in root anymore. Here is another decision(we can make dir
wherever we want and during calling **mongo daemon** pass
*--dbpath=OUR_PATH/data/db*):
```
cd ~
mkdir -p data/db # preferably with sudo
```


**Run the Mongo daemon**, in terminal run:
```
# Absolute path in my case
mongod --dbpath=/Users/macair/data/db

# If you were able to make /data/db in root, then just
mongod
```
This should start the Mongo server.


**Run the Mongo shell**, with the Mongo daemon running in one terminal, type
`mongo` in another terminal window. :
```
mongo
```
This will run the Mongo shell which is an application to access data in MongoDB.

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/mongo.png')
```

# Testing mongo
Inserting one by one commands:
```
# sets database with name 'use' for current usage, if it doesnt exist, it will
be created
use test
# adds in collection 'users' of db 'test' object in json format
db.users.save( { name: "Tom" } )
# prints all objects from db 'test'
db.users.find()
```


```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/test1.png')
```

# Graphical Interface Compass
click here to [download](https://www.mongodb.com/download-center/compass)

After installation  we set new Connection, all fields are set by default.

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/compass1.png')
```

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/compass2.png')
```

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/compass3.png')
```

# Note that mongod must be running, otherwise Compass won't connect

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/connection.png')
```

# Before working with db & schemas, let's see differences from other db types

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/difference.png')
```

 In contrast to SQL databases, Mongodb doesn't use table device with clearly
defined number of columns and data types.

DB consists of collections. Each collection has a unique name - *identifier*,
called `_id`. Document represents a set of *key-value* pairs.
# Data types
*   **String** - utf-8
*   **Array**
*   **Binary data**
*   **Boolean**
*   **Date**
*   **Double**
*   **Integer**
*   **JavaScript**
*   **Min key/Max key**
*   **Object** - string type
*   **ObjectID** - id document
*   **Regular expression** -
*   **Symbol** - identical to string, used for spec symbols
*   **Timestamp**



# Sample Document
```
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview',
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100,
   comments: [
      {
         user:'user1',
         message: 'My first comment',
         dateCreated: new Date(2011,1,20,2,15),
         like: 0
      },
      {
         user:'user2',
         message: 'My second comments',
         dateCreated: new Date(2011,1,25,7,45),
         like: 5
      }
   ]
}
```


# A bit practice

Suppose, we have to model structure that contains mailing lists and data about
the people. Example [here](https://habr.com/ru/post/144798/)

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/model.png', width=400, height=200)
```

The following requirements:
* A person may have one or more e-mail addresses;
* A person can be on any number of mailing lists;
* A person can choose any name for any mailing list they are on.

Let's see what our data model will look like if no data is embedded anywhere.

**People** with name and password
```
{
    _id: PERSON_ID,
    name: "Name Surname",
    pw: "Hashed password"
}
```

**Adresses** where each e-mail binding to specific subscriber
```
{
    _id: ADDRESS_ID,
    person: PERSON_ID,
    address: "vpupkin@gmail.com"
}
```

**Groups** we can define some additional fields
```
{
    _id: GROUP_ID
}
```

**Memberships** unites people in groups

```
{
    _id: MEMBERSHIP_ID,
    person: PERSON_ID,
    group: GROUP_ID,
    address: ADDRESS_ID,
    group_name: "Семья"
}
```

This data model is clear, easy to develop, and easy to maintain. We have created
a model that is convenient to use in a SQL db. At the same time, we did't take
into account the document-oriented approach of MongoDB.

Let's look at what we will do to get, for example, the e-mail addresses of all
members of one Group, having one known e-mail address and the name of this
Group:

1. In the Addresses collection, by the well-known e-mail, we find PERSON_ID;
2. In the Memberships collection, by the received PERSON_ID and the well-known
name of the Group, we find GROUP_ID;
3. Again, in the Memberships collection, by the received GROUP_ID we find the
list of Subscriptions of this Group;
4. And finally, from the Addresses collection by ADDRESS_ID, going through each
Subscription from the list received, we get a list of e-mail addresses.


##But there is another startegy, called *partial embedding*:
**People**
```
{
    _id: PERSON_ID,
    name: "Name Surname",
    pw: "Hashed password",
    addresses: ["random@gmail.com", "random@mail.ru", ...],
    memberships: [{
        address: "random@gmail.com",
        group_name: "mongodb tutorial",
        group: GROUP_ID
    }, ...]
}
```

**Groups** we can define some additional fields
```
{
    _id: GROUP_ID
}
```
The query we discussed above will now look like this:

1. In the People collection we find the Subscriber with the desired e-mail
address, among the Subscriptions of which there is a Subscription with the
desired name;
2. Using the GROUP_ID of the found Subscription, we will find other People in
this Group in the People collection and take their e-mail addresses directly
from the Subscription.

```python
people = [
               {
                 "_id": 1,
                 "name": "Name1 Surname1",
                 "pw": "1111",
                 "addresses": ["beefmilf@gmail.com", "beefmilf@mail.ru"],
                 "memberships": [
                                 {"address": "beefmilf@gmail.com", "group_name": "group1", "group": 1},
                                 {"address": "beefmilf@gmail.com", "group_name": "group2", "group": 2}
                                 ]
               },
               {
                 "_id": 2,
                 "name": "Name2 Surname2",
                 "pw": "2222",
                 "addresses": ["convmonk@gmail.com", "convmonk@mail.ru"],
                 "memberships": [
                                 {"address": "convmonk@gmail.com", "group_name": "mongo tutorial", "group": 1},
                                 {"address": "convmonk@mail.ru", "group_name": "mongoose", "group": 2},
                                 {"address": "convmonk@gmail.com", "group_name": "something", "group": 3}
                                 ]
               },
               {
                 "_id": 3,
                 "name": "Name3 Surname3",
                 "pw": "3333",
                 "addresses": ["random@gmail.com", "random@mail.ru"],
                 "memberships": [
                                 {"address": "random@gmail.com", "group_name": "rand name 1", "group": 1},
                                 {"address": "random@gmail.com", "group_name": "rand name 1", "group": 2},
                                 {"address": "random@mail.ru", "group_name": "rand name 1", "group": 3}
                                 ]
               },
               {
                 "_id": 4,
                 "name": "Name4 Surname4",
                 "pw": "3333",
                 "addresses": ["bot2001@gmail.com", "bot2001@mail.ru"],
                 "memberships": [
                                 {"address": "bot2001gmail.ru", "group_name": "mongo tutorial", "group": 1},
                                 {"address": "bot2001@gmail.com", "group_name": "mongoose", "group": 2},
                                 {"address": "bot2001@gmail.com", "group_name": "something", "group": 3}
                                 ]
               }

]

groups = [
          {"_id": 1}, 
          {"_id": 2}, 
          {"_id": 3}
]
```

Create collection people and add 4 documents

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/people1.png')
```

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/people2.png')
```

## Installation for node.js

```
npm install mongodb
```

```python
%%node
// create MongoClient object
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
// create a db in mongodb, specify a connection URL with the correct ip address
// and the name of the database you want to create,
var url = 'mongodb://localhost:27017/';

// group_id for finding all group's emails
var group_id;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // connecting to db 'mail', collection 'people'
    const db_ = db.db('mail');
    var collection = db_.collection('people');

    // for example, we have person's addres and group_name, due to them we get then id in a field 'group'
    var query =  {'addresses': 'convmonk@gmail.com', 'memberships.group_name': 'something'};
    // which fields to get from query
    var field = {'memberships.group_name': 1, 'memberships.group': 1, '_id': 0};

    // this block finds to doc with query params and assigns 'group' value to var 'group_id'
    // findOne takes: query, fields to get, function
    collection.findOne(query, {'projection': field}, function (err, res) {
        if (err) throw err;
        if (res) {
            // when we use forEach, all records are loaded into memory
            res.memberships.forEach(function (res) {
                if (res.group_name == 'something') {
                    group_id = res.group;
                }
            });
        }


        var query = {'memberships.group': group_id};
        var field = {'addresses': 1};
        // this block finds all emails of people who have membership in group with group_id
        // just logs result to console
        collection.find(query, {'projection': field}, function (err, res) {
            if (err) throw err;
            res.forEach(function (res) {
                console.log(res);
            });
        });
        db.close();
    });
});
```


**Result:**
the first `id` is excluded as long as it has no membership in group with
`group_id`
```
{ _id: 2,
  addresses: [
    'convmonk@gmail.com',
    'convmonk@mail.ru'
    ]
}
{ _id: 3,
  addresses: [
    'random@gmail.com',
    'random@mail.ru'
    ]
}
{ _id: 4,
  addresses: [
    'bot2001@gmail.com',
    'bot2001@mail.ru'
    ]
}
  ```


```python
%%node
// create MongoClient object
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
// create a db in mongodb, specify a connection URL with the correct ip address
// and the name of the database you want to create,
var url = 'mongodb://localhost:27017/';


MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    // connecting to db 'mail', collection 'people'
    const db_ = db.db('mail');
    var collection = db_.collection('people');

    // addresses to delete, it is also used in 'memberships.address'
    var query = {'addresses': 'convmonk@gmail.com'};
    var field = {'addresses': 1, 'memberships.address': 1};
    
    // firsty lets find res 
    collection.findOne(query, {'projection': field}, function (err, res) {
        if (err) throw err;
        
        // get rid of 'addresses' in query 
        var addrs = res.addresses.filter(function (e) {return e != query.addresses});
        
        // if addrs empty, we just delete document 
        if (!addrs.length){
            collection.deleteOne({'_id': res._id});
        }
        // if addrs exists, we delete 'addresses' in query and change all 'memberships.address' == query.addresses 
        // to the first accessible address in addresses 
        else {
            // get first accessible address for change 
            var addr = addrs[0];
            
            collection.updateOne(
                query, // filter 
                {
                    // first param means set to each element's field 'address' and in arrayFilter we define condition
                    // which elem exactly to change for addr
                    // second param just filtered array of addresses
                    $set: {'memberships.$[elem].address': addr, 'addresses': addrs}
                },
                {
                    multi: true, // default false, applied just to the first match
                    arrayFilters: [{'elem.address': query.addresses}] // means if elem.address == query.addresses
                },
                function (err, res) {
                    if (err) throw err;
                    
                    // res of operation 
                    console.log(res);
                }
                );
        }
        db.close();
    });

});
```

There are some sources that definitely help you to handle queries, which were
used in the last code:
*
[$[\<identifier\>]](https://docs.mongodb.com/master/reference/operator/update/positional-
filtered/)
*
[db.collection.updateOne](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/)

**Result:** we deleted `"convmonk@gmail.com"` and change all `"address"` fields

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/remove1.png')
```

# Mongoose ODM
## Installation

```
npm install mongoose
```


Types:


```
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types
too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

```python
%%node

// import mongoose lib
var mongoose = require('mongoose');

// connection
var url = 'mongodb://localhost:27017/mail';
// first two keys for ignoring some warnings of deprecation
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true,  autoIndex: false});

// define schema
var Schema = mongoose.Schema;
var peopleSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true,
        auto: true
    },
    pw: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true,
    },
    name: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true
    },
    addresses: {
        type: Array,
        required: true,
        validate: function (array) {
            if (array.length === 0) return false;
            return array.every((v) => typeof v === 'string');
        }
    },
    memberships: {
        type: Array
    }
});
// compiling model from schema 
var Person = mongoose.model('Person', peopleSchema);
```


If we dont specify *{autoIndex: false}*, we can observe the following:
```
mongoose: Cannot specify a custom index on `_id` for model name "Person",
MongoDB does not allow overwriting the default `_id` index.   See
http://bit.ly/mongodb-id-index
```
> Here is [explanation](https://mongoosejs.com/docs/guide.html), in the section
**Index**


# Validation
Mongoose provides built-in validators, user validators, synchronous and
asynchronous validators. In all cases, you can specify valid ranges or values,
as well as error messages if the validation conditions are violated.

Built-in validators include:
* All SchemaTypes have a built-in required validator, which determines whether
the field should be set before saving the document.
* Numbers have validators min and max.
* Strings have:
** enum (enumerations): specify the set of valid values ​​for the field.
** match (match)): sets the regular expression that the string should match.
** maxlength, minlength - maximum and minimum string length.

> here is more [info](https://mongoosejs.com/docs/validation.html)

Simple validation example:

```python
%%node
// create new doc for testing validation
var item = new Person({
    _id: 2,
    pw: "0000",
    name: "bhsdsb",
    addresses: ['email@gmail.com']
});

item.validate(function(err) {
    if (err)
        console.log(err.message);
    else
        console.log('pass validate');
```

Again, find all emails of people who have membership in group with 'group_name'
of person with 'addresess'

```python
var query_fields = {'addresses': 'convmonk@gmail.com', 'memberships.group_name': 'something'};
var select = {'memberships.group_name': 1, 'memberships.group': 1, '_id': 0};

var group_id;

// select is used as 'projection' param in mongodb 
var query = Person.findOne(query_fields).select(select);

// same code as in mongodb example
query.exec(function (err, res) {
    if (err) return err;
    console.log(res.memberships);
    if (res) {
        res.memberships.forEach(function (res) {
            if (res.group_name === 'something') {
                group_id = res.group;
            }
        });
    }

    var query_fields = {'memberships.group': group_id};
    var select = {'addresses': 1};
    Person.find(query_fields).select(select).exec(function (err, res) {
        if (err) throw err;
        res.forEach(function (res) {
            console.log(res);
        });
    });
});
```

# Promise
Imagine that you are a famous singer whom fans constantly pester with questions
about the upcoming single.

To get a break, you promise to send them a single when it is released. You give
fans a list they can sign up for. They can leave their e-mail there to receive
the song as soon as it comes out. And even more: if something goes wrong, for
example, in a studio there will be a fire and a song cannot be released, they
will also receive a notification about it.

1. There is "creating" code that does something that takes time. For example, it
downloads data over a network. In our analogy, this is a `“singer”`.
2. There is a "consuming" code that wants to get the result of the "creating"
code when it is ready. It may be necessary for more than one function. These are
the "`fans`."
3. `Promise` (in English [`promise`](https://learn.javascript.ru/promise-
basics), we will call such an object “Promis”) is a special object in JavaScript
that links the “creating” and “consuming” codes together. In terms of our
analogy, this is a "subscription list." The "creating" code can be executed as
long as it takes to get the result, and the promise makes the result available
for the code that is signed to it when the result is ready.

The syntax for creating a Promise is:


```
let promise = new Promise(function(resolve, reject) {
  // function (executor)
  // "singer"
});
```

The function passed to the `new Promise` construct is called the executor. When
a Promise is created, it starts automatically. It should contain “creating” code
that will someday produce the result. In terms of our analogy: the performer is
a “singer”.

Its arguments `resolve` and `reject` are callbacks that JavaScript itself
provides. Our code is only inside the artist.

When he gets the result, now or later - it doesn’t matter, he must call one of
these callbacks:
* `resolve` (value) - if the operation completed successfully, with the result
value.
* `reject` (error) - if an error occurred, error - object of the error.

So, the executor starts automatically, it must do the work, and then call
`resolve` or `reject`.

The `promise` object returned by the `new Promise` constructor has internal
properties:
* `state` - initially pending, then changes to fulfilled when resolving is
called, or rejected when reject is called.
* `result` - initially undefined, then changes to value when calling resolve
(value) or to error when calling reject (error).

```python
Image('/content/drive/My Drive/Colab Notebooks/Mongodb/photos/promise.png')
```

```python
function logger(doc) {
    console.log(doc);
}

// promise findOne
// null is projection argument(but then we use select)
// {emptyError: true} just not to check if res is null   
var prom = Person.findOne(query_fields, null, {lean: true, emptyError: true}) 
    .select(select)
    .then(doc => {
        doc.memberships.forEach(function (doc) {
            if (doc.group_name === 'something') {
                group_id = doc.group;
            }
        });
    })
    .then(() => {
        var query_fields = {'memberships.group': group_id};
        var select = {'addresses': 1};
        Person.find(query_fields).select(select).exec(function (err, res) {
            if (err) throw err;
            res.forEach(function (res) {
                logger(res);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
```

Update/delete promise

```python
var query_fields = {'addresses': 'convmonk@gmail.com'};
var select = {'addresses': 1, 'memberships.address': 1};


function update(doc, addrs) {
    if (!addrs.length){
        Person.deleteOne({'_id': doc._id});
    }
    else {
        var addr = addrs[0];
        Person.updateOne(
            query_fields,
            { $set: {'memberships.$[elem].address': addr, 'addresses': addrs} },
            {
                multi: true, // default false, applied just to the first match
                arrayFilters: [{'elem.address': query_fields.addresses}] // means if elem.address == query.addresses
            },
            {new: true},
            function (err, res) {
                if (err) throw err;

                // res of operation
                console.log(res);
            }
        );
    }
}

// promise update/delete
var prom = Person.findOne(query_fields, null, {emptyError: true})
    .select(select)
    .then(doc => {
        var addrs = doc.addresses.filter(function (e) {return e !== query_fields.addresses});
        update(doc, addrs);
    })
    .catch(err => {
    console.log(err.message);
});
```
