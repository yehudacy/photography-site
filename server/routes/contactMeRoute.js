const express = require('express');
const {getContactForms, getContactMe, addContactMe, deleteContactMe} = require('../../database/contactmeDB');
const contactMeRouter = express.Router();

//get all contact me forms
contactMeRouter.get('/', async (req, res) =>{
    try{
        const contactMeForms = await getContactForms();
        // console.log(contactMeForms)
        res.status(200).json(contactMeForms);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
})


contactMeRouter.post('/', async(req, res) => {
    try{
        const contactMe = req.body;
        //validation if failed send with status 400(bad request)
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
contactMeRouter.delete("/:contactMeId", async (req, res) => {
    const contactMeId = req.params.contactMeId;
    try{
        const deletedContactMe = await deleteContactMe(contactMeId);
        console.log(deletedContactMe)
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
