var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groceryItemSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
      type: Number,
      required: true
  }
}, { collection: 'appData' });

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
