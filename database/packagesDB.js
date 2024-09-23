const { pool } = require("./dbConnection");

const getPackages = async () => {
  const getPackagesQuery = `SELECT * FROM packages`;
  const [packages] = await pool.query(getPackagesQuery);
//   console.log(packages);
  return packages;
};

const addPackage = async ({ title, price, details, variant }) => {
  const addPackageQuery = `
    INSERT INTO packages(title, price, details, button_variant) 
    VALUES (?, ?, ?, ?)`;
  const [{ insertId }] = await pool.query(addPackageQuery, [
    title,
    price,
    details,
    variant,
  ]);
//   console.log(insertId);
  return await getPackage(insertId);
};

const getPackage = async (packageId) => {
  const getPackageByIdQuery = `
    SELECT * FROM packages
    WHERE package_id = ?`;
  const [[package]] = await pool.query(getPackageByIdQuery, [packageId]);
//   console.log(package);
  return package;
};

const editPackage = async (packageId, { title, price, details, variant }) => {
  const editPackageQuery = `
    UPDATE packages
    SET package_id = ?, title = ?, price = ?, details = ?, button_variant = ?
    WHERE package_id = ?;`;
  const [{ affectedRows }] = await pool.query(editPackageQuery, [
    packageId,
    title,
    price,
    details,
    variant,
    packageId,
  ]);
  if (!affectedRows) {
    throw new Error("no rows affected please check the package id if it exist");
  }
  return await getPackage(packageId);
};

const deletePackage = async (packageId) => {    
  const packageToDelete = await getPackage(packageId);
  if (!packageToDelete) {
    throw new Error(`No package with the Id of ${packageId}`);
  }
  const removePackageQuery = `
  DELETE FROM packages 
  WHERE package_id = ?;`;
  const [result] = await pool.query(removePackageQuery, [packageId]);
  if (result.affectedRows === 1) {
    return packageToDelete;
  } else {
    throw "Delete failed";
  }
};

const package = {
  title: "Basic",
  price: 1500,
  details: "15 users included, 2 GB of storage, Help center access, Email support",
  variant: "contained",
};

// addPackage(package);
// getPackage(1);
// editPackage(1, package)
// deletePackage(5);


module.exports = {getPackages, addPackage, getPackage, editPackage, deletePackage};