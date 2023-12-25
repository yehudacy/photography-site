const { pool } = require("./dbConnection");

//add a new user
const addUser = async ({
  firstName,
  lastName,
  email,
  password,
  city,
  street,
  buildingNumber,
}) => {
  const addUserQuery = `
    INSERT INTO clients (first_name, last_name, email, password, city, street, building_number)
    values(?, ?, ?, ?, ?, ?, ?);`;
  const [{ insertId }] = await pool.query(addUserQuery, [
    firstName,
    lastName,
    email,
    password,
    city,
    street,
    buildingNumber,
  ]);
  // console.log(insertId);
  return await getUser(insertId);
};

//get all users
const getAllUsers = async () => {};

//get a user by id
const getUser = async (clientId) => {
  const getClientByIdQuery = `
    SELECT * FROM clients
    WHERE client_id = ?`;
  const [[client]] = await pool.query(getClientByIdQuery, [clientId]);
  // console.log(client)
  return client;
};

//get user by email and password
const login = async ({ email, password }, tableName) => {
  const loginQuery = `
    SELECT ${
      tableName === "clients" ? "client_id" : "administrator_id"
    }, first_name, last_name, email FROM ${tableName}
    WHERE email = ? AND password = ?;`;
  const [[user]] = await pool.query(loginQuery, [email, password]);
    // console.log(user);
  return user;
};

//edit a user
const editUser = async () => {};

//delete a user
const deleteUser = async () => {};

module.exports = { addUser, getUser, login };

// addUser({firstName:"yehuda", lastName:"cywiak", email:"yc0527183008@gmail.com", password:"yc@123456", city:"BB", street:"beeri", buildingNumber:"17"});
// getUser(1);

// login({ email: "yc0527183008@gmail.com", password: "yc@123456" }, "clients");
