const userModel = require("../model/category.model");
const { checkBody } = require("../helpers/bodyValidation");
const categoryModel = require("../model/category.model");

exports.createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { missing, fieldName: field } = checkBody(req);
    if (missing) {
      return res.status(401).json({ msg: `${field} missing` });
    }

    // is already exists
    const isExits = await categoryModel.findOne({
      categoryName: req.body.categoryName,
    });
    if (isExits) {
      return res
        .status(401)
        .json({ msg: `${isExits.categoryName} is already exists` });
    }

    // save database
    const saveCategory = await new categoryModel({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    }).save();

    if (!saveCategory) {
      return res
        .status(401)
        .json({ msg: `failed to create ${req.body.categoryName}` });
    }

    return res.status(201).json({
      msg: `successfully create ${req.body.categoryName}`,
    });
  } catch (err) {
    console.log("error from login createController", err);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCats = await categoryModel.find({});
    if (allCats) {
      res.status(200).json({
        msg: "get all categories",
        allCategory: allCats,
        status: "ok",
        statusCode: 200,
      });
    }
    console.log(allCats);
  } catch (err) {
    console.log("error from allCategory controller", err);
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const findCategory = await categoryModel.findOne({ categoryName: name });
    console.log(findCategory);
    if (findCategory) {
      return res.status(200).json({
        msg: `get successfully your ${name}`,
        singleCategory: findCategory,
        status: "ok",
        statusCode: 200,
      });
    } else {
      return res.status(401).json({
        msg: `category not found`,
        statusCode: 401,
      });
    }
  } catch (err) {
    console.log("error from SingleCategory controller", err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findCategory = await categoryModel.findOne({ _id: id });

    if (req.body.categoryName) {
      findCategory.categoryName = req.body.categoryName;
    }
    if (req.body.categoryDescription) {
      findCategory.categoryDescription = req.body.categoryDescription;
    }
    await findCategory.save();

    return res.status(200).json({
      msg: `update your category`,
      singleCategory: findCategory,
      status: "ok",
      statusCode: 200,
    });
  } catch (err) {
    console.log("error from updateCategory controller", err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findCategory = await categoryModel.findOneAndDelete({ _id: id });

    if (findCategory) {
      return res.status(200).json({
        msg: `delete ${findCategory.categoryName} successfully`,
        singleCategory: findCategory,
        status: "ok",
        statusCode: 200,
      });
    } else {
      res.status(401).json({
        msg: "failed to delete",
        status: "ok",
        statusCode: 401,
      });
    }
  } catch (err) {
    console.log("error from deleteCategory controller", err);
  }
};
