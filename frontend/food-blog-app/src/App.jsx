import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './pages/AddFoodRecipe'

const getAllRecipes=async()=>{
  let AllRecipes=[]
  await axios.get("http://localhost:5000/recipe").then(res=>{
    AllRecipes=res.data
  })
  return AllRecipes
}

const getMyRecipes = async()=>{
  let user = JSON.parse(localStorage.getItem("user"))
  let AllRecipes = await getAllRecipes()
  return AllRecipes.filter(item=>item.createdBy===user._id)
}

const router = createBrowserRouter([
  {path:"/", element: <MainNavigation/>,children:[
    {path:"/", element: <Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home />,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home />},
    {path:"/addRecipe",element:<AddFoodRecipe />},
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
