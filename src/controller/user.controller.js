const userModel = require("../model/user.model");
const { checkBody } = require("../helpers/bodyValidation");
// registration
exports.registration = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const {
      userName,
      email,
      avatar,
      password,
      phone,
      presentAddress,
      permanentAddress,
      lastLogin,
    } = req.body;
    if (!userName) {
      return res.status(404).json({
        msg: "userName missing",
      });
    }
    if (!email) {
      return res.status(404).json({
        msg: "email missing",
      });
    }
    if (!password) {
      return res.status(404).json({
        msg: "password missing",
      });
    }
    if (!avatar) {
      return res.status(404).json({
        msg: "avatar missing",
      });
    }

    userModel.create({
      userName: userName,
      email: email,
      avatar: avatar,
      password: password,
      phone: phone,
      presentAddress: presentAddress,
      ...req.body,
    });

    return res.status(201).json({
      msg: "registration successfully",
    });
  } catch (err) {
    console.log("error from registration controller", err);
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { missing, fieldName: field } = checkBody(req);

    //  validation
    if (missing) {
      return res.status(401).json({
        msg: `${field} missing`,
      });
    }

    // check is already exists
    const findUser = await userModel.findOne({ email: req.body.email });

    if (
      findUser.email === req.body.email &&
      findUser.password === req.body.password
    ) {
      findUser.lastLogin = new Date();
      await findUser.save();
      res.status(200).json({
        msg: "login successfully",
      });
    }
  } catch (err) {
    console.log("error from login controller", err);
  }
};
