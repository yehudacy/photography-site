const express = require('express');
const {getContactForms, getContactMe, addContactMe, deleteContactMe} = require('../../database/contactmeDB');
const { authenticateToken } = require('../authentication/authentication');
const { validateForm } = require('./contactmeUtil');
const contactMeRouter = express.Router();

//get all contact me forms
contactMeRouter.get('/', authenticateToken,  async (req, res) =>{
    try{
        const contactMeForms = await getContactForms();
        // console.log(contactMeForms)
        res.status(200).json(contactMeForms);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
})


contactMeRouter.post('/' ,async(req, res) => {
    try{
        const contactMe = req.body;
        if(!validateForm(contactMe)){
            return res.status(400).json({message: "All fields are required"});
        }
        const contactMeAdded = await addContactMe(contactMe);
        // console.log(contactMeAdded)
        //handle sending me an email
        //if success 
        res.status(200).json(contactMeAdded);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "The server didn't respond to the request please try later"});
    }
});

//route to delete a contact me form
contactMeRouter.delete("/:contactMeId", authenticateToken , async (req, res) => {
    const contactMeId = req.params.contactMeId;
    try{
        const deletedContactMe = await deleteContactMe(contactMeId);
        return res.status(200).json(deletedContactMe); 
    } catch(error){
        let errorCode; 
        if(error.message === `No Contact Me with the Id of ${contactMeId}`){
            errorCode = 404;
        } else{
            errorCode = 500;
        }
        res.status(errorCode).json(error.message);
    }
})

module.exports = {contactMeRouter};
