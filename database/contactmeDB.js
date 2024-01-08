const { pool } = require("./dbConnection");

//get all contact me forms
const getContactForms = async () => {
  const getCContactMeQuery = `
    SELECT * FROM contact_me`;
  const [contactMeForms] = await pool.query(getCContactMeQuery);
  // console.log(contactMeForms);
  return contactMeForms;
};

//add a new contact me form
const addContactMe = async ({ name, phoneNumber, email, message }) => {
  const addContactmeQuery = `
    INSERT INTO contact_me (name, phone_number, email, message, status) 
    VALUES (?, ?, ?, ?, 0)`;
  const [{ insertId }] = await pool.query(addContactmeQuery, [
    name,
    phoneNumber,
    email,
    message,
  ]);
  // console.log(insertId);
  return await getContactMe(insertId);
};

//get a single contact me form by id
const getContactMe = async (contactMeId) => {
  const getContactMeByIdQuery = `
    SELECT * FROM contact_me
    WHERE contact_me_id = ?`;
  const [[contactMe]] = await pool.query(getContactMeByIdQuery, [contactMeId]);
  //   console.log(contactMe)
  return contactMe;
};

//delete a contact me form
const deleteContactMe = async (contactMeId) => {
  const contactMeToDelete = await getContactMe(contactMeId);
  if (!contactMeToDelete) {
    throw new Error(`No Contact Me with the Id of ${contactMeId}`);
  }
  const removeContactMeQuery = `
  DELETE FROM contact_me 
  WHERE contact_me_id = ?;`;
  const [result] = await pool.query(removeContactMeQuery, [contactMeId]);
  if (result.affectedRows === 1) {
    return contactMeToDelete;
  } else {
    throw "Delete failed";
  }
};

// getContactForms();
// addContactMe({name: "yeu", phoneNumber: "0527183008", email: "yc0527183008@gmail.com", message: "this is a contact me form"});
// getContactMe(1);

module.exports = { getContactForms, getContactMe, addContactMe, deleteContactMe };
