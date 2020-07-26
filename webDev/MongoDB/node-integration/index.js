//##############################################################################
//## Node mongoDB driver                                                      ##
//##############################################################################
//****various Linter configs****
// jshint esversion: 6
// jshint browser: true
// jshint node: true
// jshint -W097

//source: mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start/

"use strict";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

//database name
const dbName = 'myproject';

//create new mongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});

//Use connect method to connect to the server
client.connect((err)=>{
  assert.equal(null,err); //assert throws up when unequal
  console.log("\x1b[32m","connected to server");
  const db = client.db(dbName);

  //insert three elements
  insertDocuments(
    db,

    (res)=>{
      console.log("\x1b[0m",res);
      client.close();
    }
  );

  // client.close();
});

function insertDocuments(db,callback){
  //get docs collection
  const collection = db.collection('documents');
  // insert some documents
  collection.insertMany(
    [{a:1},{a:2},{a:3}], (err,res)=>{
      assert.equal(err,null);
      console.log("inserted 3 docs into collection");
      callback(res);
    }
  );
}
