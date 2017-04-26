var express = require('express');
var Item = require('../models/item');

var itemRouter = express.Router();

itemRouter
  .route('/items')
  .post((request, response) => {

    console.log('POST /items');

    var item = new Item(request.body);

    item.save();

    response.status(201).send(item);
  })
  .get((request, response) => {

    console.log('GET /items');

    Item.find((error, items) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);

      response.json(items);
    });
  });

itemRouter
  .route('/items/:itemId')
  .get((request, response) => {

    console.log('GET /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, (error, item) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(item);

      response.json(item);

    });
  })
  .put((request, response) => {

    console.log('PUT /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, (error, item) => {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.name = request.body.name;
        item.description = request.body.description;
        item.quantity = request.body.quantity;
        
        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .patch((request, response) => {

    console.log('PATCH /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, (error, item) => {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   item.name = request.body.name;
        // }

        // if (request.body.description) {
        //   item.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   item.quantity = request.body.quantity;
        // }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete((request, response) => {

    console.log('DELETE /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, (error, item) => {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove((error) => {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Item with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      }
    });
  });

module.exports = itemRouter;