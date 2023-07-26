const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Categories =require("../schema/category");



async function receiveCategory(category) {
  try {
    let mainCategoryName = category.MainCategory;
    let subCategories = category.SubCategories;
    for(let i=0;i<subCategories.length;i++){
      subCategories[i] = subCategories.toLowerCase();
    }
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

async function updateCategoryPollCount(category) {
  let mainCategoryName = category.MainCategory;
  let subCategories = category.SubCategories;

  try {
    // Find the category with the given name in the database
    let mainCategoryDoc = await Categories.findOne({ "MainCategory.name": mainCategoryName });

    if (mainCategoryDoc) {
      // Category found, update the MainCategory's voteCount
      mainCategoryDoc.MainCategory.voteCount += 1;
      console.log("MainCategory voteCount:", mainCategoryDoc.MainCategory.voteCount);

      // Loop through the SubCategories and update their voteCounts if found
      for (const subCategory of subCategories) {
        // Find the SubCategory in the database using its name
        let subCategoryDoc = mainCategoryDoc.SubCategories.find(sub => sub.name === subCategory);
        if (subCategoryDoc) {
          // SubCategory found, update its voteCount
          subCategoryDoc.voteCount += 1;
          console.log(`SubCategory ${subCategory} voteCount:`, subCategoryDoc.voteCount);
        } else {
          console.log(`SubCategory ${subCategory} not found.`);
        }
      }

      // Save the updated document back to the database
      await mainCategoryDoc.save();
      console.log("Database updated successfully.");
    } else {
      console.log("MainCategory not found.");
    }
  } catch (error) {
    console.error("Error updating voteCounts:", error);
  }
}


module.exports = { receiveCategory,updateCategoryPollCount };
