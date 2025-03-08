const Recipes = require("../models/recipe")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
})
  
const upload = multer({ storage: storage })

const getRecipes = async(req,res) =>{
    const recipes = await Recipes.find()
    return res.json(recipes)
}

const getRecipe = async(req,res) =>{
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}

const addRecipes = async(req,res) =>{
    console.log(req.user)
     const {title,ingredients,instructions,time} = req.body

     if(!title || !ingredients || !instructions){
        res.json({message:"Require fields can't be empty"})
     }

     const newRecipe = await Recipes.create({
        title,ingredients,instructions,time,coverImage:req.file.filename,
        createdBy:req.user.id
     })
     return res.json(newRecipe)
}

const editRecipes = async(req,res) =>{
    const {title,ingredients,instructions,time} = req.body
    let recipe = await Recipes.findById(req.params.id)
    try{
        if(recipe){
            await Recipes.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:"error not found"})
    }
}



const deleteRecipes = (req,res) =>{
    res.json({message:"hello"})
}

module.exports={getRecipes,getRecipe,addRecipes,editRecipes,deleteRecipes,upload}