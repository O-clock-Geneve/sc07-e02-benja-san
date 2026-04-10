import { createContext, useContext, useEffect, useState } from "react"
import type { IRecipe, IRecipeLink } from "../@types/recipe"

// Je crée l'interface pour definir les valeurs à mettre dans les values de mon context
export interface IRecipesContext {
  recipes: IRecipe[]
  isLoading: boolean
  recipeLinks: IRecipeLink[]
  findOneRecipeBySlug: (slug: string) => undefined | IRecipe
}

// Je crée le contexte lié à mes recipes
export const RecipesContext = createContext<undefined | IRecipesContext>(
  undefined,
)

interface RecipesContextProviderProps {
  children: React.ReactNode
}

//On crée le provider
// Le provider: Rend accessible toutes les valeurs souhaitées à partir d'un point de départ (ici le App.tsx)
export default function RecipesContextProvider({
  children,
}: RecipesContextProviderProps) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [recipeLinks, setRecipeLinks] = useState<IRecipeLink[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function findOneRecipeBySlug(slug: string): undefined | IRecipe {
    return recipes.find((recipe) => recipe.slug === slug)
  }

  useEffect(() => {
    async function fetchRecipes() {
      const url = "http://localhost:3000/api/recipes"
      setIsLoading(true)
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
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  //Les valeurs que je rend accessible depuis mon provider
  const values = {
    isLoading,
    recipes,
    recipeLinks,
    findOneRecipeBySlug,
  }

  return (
    <RecipesContext.Provider value={values}>{children}</RecipesContext.Provider>
  )
}

//Le hook personalisé permet d'accéder aux données dans n'importe quel composant enfant du Provider!
export function useRecipes() {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error("Please provide a provider")
  }
  return context
}
