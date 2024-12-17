const express = require("express");
const {
  addUser,
  getUser,
  login,
  editUser,
  getClientList,
} = require("../../database/usersDB");
const {
  generateToken,
  authenticateToken,
} = require("../authentication/authentication");
const { validateSignUpForm, validateLogInForm } = require("./usersUtil");

const usersRouter = express.Router();

//add a new user
usersRouter.post("/", async (req, res) => {
  try {
    const newClient = req.body;
    const { validatedForm, isValid, errMsg } = validateSignUpForm(newClient);
    if (!isValid) {
      return res.status(400).json({ message: errMsg });
    }
    const addedClient = await addUser(validatedForm);
    // console.log({'addedClient':addedClient});
    if (!addedClient) {
      return res.status(400).json({
        message: "Bad request, the user was not added. Please try again later.",
      });
    }
    return res.status(201).json(addedClient);
  } catch (error) {
    // console.log(error);
    return res
      .status(409)
      .json({ message: error.sqlMessage, errorCode: error.errno });
  }
});

//get a user for login clients or administrators
usersRouter.post("/login", async (req, res) => {
  try {
    const credentials = req.body;
    const { valid, errMsg } = validateLogInForm(credentials);
    if (!valid) {
      return res.status(401).json({ message: errMsg });
    }
    const user = await login(credentials, "clients");
    // console.log(user)
    if (user) {
      user.isAdmin = false;
      user.token = generateToken(user);
      res.status(200).json(user);
    } else {
      const admin = await login(credentials, "administrators");
      if (admin) {
        admin.isAdmin = true;
        admin.token = generateToken(admin);
        return res.status(200).json(admin);
      }
      return res.status(404).json({
        message:
          "No account found with the provided email address or the provided password.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

//get client list route
usersRouter.get("/clientList", authenticateToken, async (req, res) => {
  try {
    const clientList = await getClientList();
    if (clientList) {
      res.status(200).json(
        clientList.map((client) => {
          return {
            client_id: client.client_id,
            fullName: `${client.first_name} ${client.last_name}`,
          };
        })
      );
    } else {
      throw new Error({ message: "No clients war found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving client list." });
  }
});

//get a specific user by id
usersRouter.get("/:clientId", authenticateToken, async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const tableName = req.user.isAdmin ? "administrators" : "clients";
    const user = await getUser(tableName, clientId);
    // console.log(user);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ message: `No user found with the id ${clientId}` });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error retrieving user information" });
  }
});

//edit an account with new details
usersRouter.put("/:clientId", authenticateToken, async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const tableName = req.user.isAdmin ? "administrators" : "clients";
    const editedUser = await editUser(tableName, clientId, req.body);
    // console.log(editedUser);
    res.status(200).json(editedUser);
  } catch (error) {
    // console.log(error)
    res
      .status(500)
      .json({ message: "could not edit the account please try again" });
  }
});

module.exports = { usersRouter };
