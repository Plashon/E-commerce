const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt.middleware");

// //http://localhost:5000/api/v1/user/sign
router.post("/sign", userController.sign);
// //http://localhost:5000/api/v1/user
router.post("/",userController.addUser);
// //http://localhost:5000/api/v1/user
router.get("/", userController.getAllUsers);
router.get("/role/:email", userController.getAllUsers);
// //http://localhost:5000/api/v1/user
router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.updateUser
);
// //http://localhost:5000/api/v1/user
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.deleteUser
);
router.patch(
  "/admin/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeAdmin
);
router.patch(
  "/user/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeUser
);

module.exports = router;
