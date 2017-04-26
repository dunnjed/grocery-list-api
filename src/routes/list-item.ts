import * as mongoose from 'mongoose';
let ListItem = require('../models/list-item');

/*
 * GET /list-item route to retrieve all the list items.
 */
export function getListItems(req, res) {
    //Query the DB and if no errors, send all the list items
    let query = ListItem.find({});
    query.exec((err, listItems) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(listItems);
    });
}

/*
 * POST /list-item to save a new list item.
 */
export function postListItem(req, res) {
    //Creates a new list item
    var newListItem = new ListItem(req.body);
    //Save it into the DB.
    newListItem.save((err, listItem) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "List item successfully added!", listItem });
        }
    });
}

/*
 * GET /list-item/:id route to retrieve a list item given its id.
 */
export function getListItem(req, res) {
    ListItem.findById(req.params.id, (err, listItem) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(listItem);
    });     
}

/*
 * DELETE /list-item/:id to delete a list item given its id.
 */
export function deleteListItem(req, res) {
    ListItem.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "List item successfully deleted!", result });
    });
}

/*
 * PUT /list-item/:id to updatea a list item given its id
 */
export function updateListItem(req, res) {
    ListItem.findById({_id: req.params.id}, (err, listItem) => {
        if(err) res.send(err);
        Object.assign(listItem, req.body).save((err, listItem) => {
            if(err) res.send(err);
            res.json({ message: 'List item updated!', listItem });
        }); 
    });
}

//export all the functions
//module.exports = { getListItems, postListItem, getListItem , deleteListItem , updateListItem };