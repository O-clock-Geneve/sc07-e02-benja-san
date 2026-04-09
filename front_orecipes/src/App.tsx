import { Route, Routes } from "react-router"
import "./App.css"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/SideBar"
import Home from "./pages/home/Home"
import type { IRecipe, IRecipeLink } from "./@types/recipe"
import { useEffect, useState } from "react"
import RecipePage from "./pages/recipePage/RecipePage"
import Favorites from "./pages/favorites/Favorites"

function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [recipeLinks, setRecipeLinks] = useState<IRecipeLink[]>([])

  useEffect(() => {
    async function fetchRecipes() {
      const url = "http://localhost:3000/api/recipes"
      try {
        const response = await fetch(url)
        if (response.ok) {
          const fetchedRecipes = await response.json()
          //Je remplace l'image cassée par une valide
          fetchedRecipes.map((recipe: IRecipe) => {
            if (recipe.id === 8965) {
              recipe.thumbnail =
                "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/E0641153-6CC9-4DFF-BE57-D2E229DC758B/Derivates/139c368c-112a-4080-8bc5-457ed347b475.jpg"
            }
          })
          //Je remplis mon tableau de recipes
          setRecipes(fetchedRecipes)
          //Je prépare un tableau de liens
          const fetchedRecipeLinks: IRecipeLink[] = []
          fetchedRecipes.map((recipe: IRecipe) => {
            fetchedRecipeLinks.push({
              title: recipe.title,
              slug: recipe.slug,
            })
          })
          //J'hydrate mon state avec le tableau pour la sidebar
          setRecipeLinks(fetchedRecipeLinks)
        } else {
          throw new Error("An error occured during fetch")
        }
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`Error found during fetch, catch : ${e.message}`)
        }
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="container">
      <Sidebar recipeLinks={recipeLinks} />
      <div className="mainContent">
        <Header />
        <main className="page">
          <Routes>
            <Route path="/" element={<Home recipes={recipes} />} />
            <Route
              path="/recipes/:slug"
              element={<RecipePage recipes={recipes} />}
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
