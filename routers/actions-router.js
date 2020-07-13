const express = require('express');

const router = require("express").Router();

const ActionsData = require("../data/helpers/actionModel.js");

//*********** GET ************\\

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get("/:id",validateActionId, (req, res) => {
    ActionsData.get(req.params.id)
        .then(action => {
            if(action){
                res.status(200).json({action})
            } else {
                res.status(404).json({errorMessage: "Action not found"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "error retrieving the action info"})
        })
})

//*********** POST ************\\

// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
router.post("/:id/actions",validateAction,  (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id}

    ActionsData.insert(actionInfo)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: " error posting action for the project"})
        })
})

//*********** PUT ************\\

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
router.put("/:id",validateActionId, (req, res) => {
    ActionsData.update(req.params.id, req.body)
        .then(action => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({errorMessage: "the action with the id does not exist"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "Action can not be updated"})
        })
})

//*********** DELETE ************\\

// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id",validateActionId, (req, res) => {
    ActionsData.remove(req.params.id)
        .then(count => {
            if(count > 0){
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "the Action with the id does not exist so can not be deleted"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: "action can not be completed"})
        })
})

//*********** CUSTOM MIDDLEWARE ************\\

function validateAction (req, res, next) {
    const { description, notes } = req.body

    if( !description || !notes ) {
        res.status(400).json({message: "Please provide description and notes (validation message)"})
    }else {
        next()
    }
}

function  validateActionId(req, res, next) {
    ActionsData.get(req.params.id)
    .then(action => {
        if(action){
            action = req.actions
            next()
        }else {
            res.status(404).json({errorMessage: "Action with the ID does not exist (validation message)"})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "request can not be completed"})
    })
}

module.exports = router;