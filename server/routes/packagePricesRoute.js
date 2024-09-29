const express = require("express");
const {
  getPackages,
  addPackage,
  getPackage,
  editPackage,
  deletePackage,
} = require("../../database/packagesDB");
const { authenticateToken } = require("../authentication/authentication");

const packagePriceRouter = express.Router();

packagePriceRouter.post("/", authenticateToken, async ({ body }, res) => {
  try {
    const addedPackage = await addPackage(body);
    // console.log(addedPackage);
    res.status(201).json(addedPackage);
  } catch (error) {
    // console.log(error);
    if(typeof error.message === 'string' && error.message.startsWith("Data truncated for column 'button_variant'")){
      error.message = `Variant must be ether 'contained' or 'outlined'` 
    }
    if(typeof error.message === 'string' && error.message.startsWith("Data truncated for column 'currency'")){
      error.message = `Currency must be ether 'USD' or 'NIS'` 
    }
    res.status(500).json({ message: error.message });
  }
});

packagePriceRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const packages = await getPackages();
    res.status(200).json(packages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The server is down please try again later" });
  }
});

packagePriceRouter.get(
  "/:packageId",
  authenticateToken,
  async ({ params: { packageId } }, res) => {
    try {
      const package = await getPackage(packageId);
      if (!package) {
        res
          .status(404)
          .json({
            message: `A package with the id of ${packageId} doesn't exist`,
          });
      }
      // console.log({ package });
      res.status(201).json(package);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: "The server is down please try later" });
    }
  }
);

packagePriceRouter.put(
  "/:packageId",
  authenticateToken,
  async ({ body, params: { packageId } }, res) => {
    try {
      const editedPackage = await editPackage(packageId, body);
      // console.log(editedPackage);
      res.status(201).json(editedPackage);
    } catch (error) {
      console.log(error);
      if(typeof error.message === 'string' && error.message.startsWith("Data truncated for column 'button_variant'")){
        error.message = `Variant must be ether 'contained' or 'outlined'` 
      }
      if(typeof error.message === 'string' && error.message.startsWith("Data truncated for column 'currency'")){
        error.message = `Currency must be ether 'USD' or 'NIS'` 
      }
      res
        .status(500)
        .json({ message: error.message});
    }
  }
);

packagePriceRouter.delete(
  "/:packageId",
  authenticateToken,
  async ({ params: { packageId } }, res) => {
    try {
      const deletedPackage = await deletePackage(packageId);
      // console.log(deletedPackage);
      res.status(200).json(deletedPackage);
    } catch (error) {
      // console.log(error);
      let errorCode;
      if (error.message === `No package with the Id of ${packageId}`) {
        errorCode = 404;
      } else {
        errorCode = 500;
      }
      res.status(errorCode).json(error.message);
    }
  }
);

module.exports = { packagePriceRouter };
