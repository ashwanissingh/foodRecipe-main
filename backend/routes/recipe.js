const express = require("express")
const { getRecipes,getRecipe,addRecipes,editRecipes,deleteRecipes,upload } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router = express.Router()

router.get("/",getRecipes) //get all the reciepes
router.get("/:id",getRecipe) //get recipe by ids
router.post("/",upload.single('file'),verifyToken, addRecipes)  //add recipe
router.put("/:id",editRecipes) //edit the recipe
router.delete("/:id", deleteRecipes) //delte the reciepe

module.exports = router