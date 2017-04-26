import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

//book schema definition
let ListItem = new Schema(
  {
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false,
    collection: 'appData'
  }
);

// Sets the createdAt parameter equal to the current time
ListItem.pre('save', next => {
  let now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ListItem for use elsewhere.
module.exports = mongoose.model('listItem', ListItem);