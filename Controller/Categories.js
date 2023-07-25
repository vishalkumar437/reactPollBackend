const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Categories =require("../schema/category");



async function receiveCategory(category) {
  try {
    let mainCategoryName = category.MainCategory;
    let subCategories = category.SubCategories;

    // Find the MainCategory in the database
    let mainCategory = await Categories.findOne({ "MainCategory.name": mainCategoryName }).exec();
    if (!mainCategory) {
      // MainCategory not found, create a new one
      mainCategory = new Categories({
        MainCategory: {
          name: mainCategoryName,
          pollCount: 0,
          voteCount: 0,
        },
        SubCategories: [],
      });
    }

    // Increase the pollCount of the MainCategory
    mainCategory.MainCategory.pollCount++;

    // Process the SubCategories
    if (!Array.isArray(mainCategory.SubCategories)) {
      // Ensure that mainCategory.SubCategories is an array
      console.error("mainCategory.SubCategories is not an array.");
      // Handle the error or return from the function, depending on your use case
    }
    
    for (let subCategoryName of subCategories) {
  // Check if the subCategory exists in the mainCategory
  const subCategory = mainCategory.SubCategories.find(
    (subCat) => subCat.name === subCategoryName
  );

  if (!subCategory) {
    // subCategory not found, create a new one
    mainCategory.SubCategories.push({
      name: subCategoryName,
      pollCount: 1, // Set the initial pollCount to 1 for new subcategories
      voteCount: 0,
    });
  } else {
    // Increment the pollCount of the existing subCategory
    subCategory.pollCount++;
  }
}

    // Save the MainCategory document to the database
    await mainCategory.save();

    console.log("Category data saved successfully.");
  } catch (err) {
    console.error("Error while saving category data:", err);
  }
}

module.exports = { receiveCategory };
