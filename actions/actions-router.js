const express = require('express');

const router = require("express").Router();

const Actions = require("../data/helpers/actionModel.js");

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get("/:id", (req, res) => {
    Actions.get(req.params.id)
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

// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
router.post("/:id/actions", (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id}

    Actions.insert(actionInfo)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage: " error posting action for the project"})
        })
})

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
router.put("/:id", (req, res) => {
    Actions.update(req.params.id, req.body)
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

// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

router.delete("/:id", (req, res) => {
    Actions.remove(req.params.id)
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


// The projectModel.js helper includes an extra method called getProjectActions() that takes a project id as it's only argument and returns a list of all the actions for the project.












module.exports = router;