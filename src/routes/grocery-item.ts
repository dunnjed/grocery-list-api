import * as express from 'express';
var GroceryItem = require('../models/grocery-item');

var groceryItemRouter = express.Router();

groceryItemRouter
  .route('/grocery-items')
  .post((request, response) => {

    console.log('POST /grocery-items');

    var groceryItem = new GroceryItem(request.body);

    groceryItem.save();

    response.status(201).send(groceryItem);
  })
  .get((request, response) => {

    console.log('GET /grocery-items');

    GroceryItem.find((error, groceryItems) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(groceryItems);

      response.json(groceryItems);
      //response.status(200).send(groceryItems);
    });
  });

groceryItemRouter
  .route('/grocery-items/:groceryItemId')
  .get((request, response) => {

    console.log('GET /items/:groceryItemId');

    var groceryItemId = request.params.groceryItemId;

    GroceryItem.findOne({ id: groceryItemId }, (error, groceryItem) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(groceryItem);

      response.json(groceryItem);

    });
  })
  .put((request, response) => {

    console.log('GET /items/:groceryItemId');

    var groceryItemId = request.params.groceryItemId;

    GroceryItem.findOne({ id: groceryItemId }, (error, groceryItem) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (groceryItem) {
        groceryItem.itemName = request.body.itemName;
        groceryItem.quantity = request.body.quantity;
        groceryItem.price = request.body.price;
        
        groceryItem.save();

        response.json(groceryItem);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + groceryItem + ' was not found.'
      });
    });
  });

  module.exports = groceryItemRouter;