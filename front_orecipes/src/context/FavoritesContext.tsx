import { createContext, useContext, useEffect, useState } from "react"
import type { IRecipe } from "../@types/recipe"
import { useAuth } from "./AuthContext"

export interface IFavoritesContext {
  favoriteRecipes: IRecipe[]
  errorMessage: string
}

const FavoritesContexte = createContext<IFavoritesContext | undefined>(
  undefined,
)

interface FavoritesContexteProviderProps {
  children: React.ReactNode
}

export default function FavoritesContexteProvider({
  children,
}: FavoritesContexteProviderProps) {
  //Je prépare un state pour heberger mes recettes favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([])
  //Je prépare un state pour afficher un message d'erreur
  const [errorMessage, setErrorMessage] = useState("")
  //Je récupère le token à partir du context
  const { user } = useAuth()

  //Le useEffect me permet de fetch les datas via mon api distante
  useEffect(() => {
    //Je prépare une fonction pour récupérer mes favoris
    async function fetchFavorites() {
      //je prépare mon url
      const url = "http://localhost:3000/api/favorites"
      // J'essaye de récupérer mon token si l'utilisateur est déja connecté
      //Via les datas enregistrées au préalable dans le local storage
      //CF Header.tsx
      const token: string | null | undefined =
        localStorage.getItem("token") || user?.token
      // Je prépare un message d'erreur général en cas de problème
      const errortoDisplay =
        "Une erreur est survenue, veuillez reessayer plus tard"
      //Je vérifie que j'ai bien un token
      if (token) {
        //Je lance un try catch
        try {
          // J'attend ma promise
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          // Si le status me donne une unhautorized
          if (response.status === 401) {
            // J'indique à l'utilisateur qu(il doit se reconnecter, ou s'enregistrer)
            setErrorMessage(
              "Veuillez vous connecter afin d'acceder à vos recettes preferées",
            )
            throw new Error("Erreur lors de la récupération de vos favoris")
          } else if (response.status < 300) {
            // Si la reponse est une 200
            // Je transforme ma réponse en json
            const fetchedFavorites = await response.json()
            // Je récupère mes recettes favorites
            setFavoriteRecipes(fetchedFavorites.favorites)
          } else {
            //Pour toute autre erreur je display une erreur générale
            setErrorMessage(errortoDisplay)
            throw new Error("Erreur lors de la récupération de vos favoris")
          }
        } catch (e) {
          if (e instanceof Error) {
            console.log("error caught : ", e.message)
            throw new Error("Erreur lors de la récupération de vos favoris")
          }
        }
      } else {
        // Sinon je déconnecte l'utilisateur
        //Et je lui affiche un message l'invitant à log à nouveau
        setErrorMessage("Veuillez vous reconnecter")
        localStorage.clear()
      }
    }
    // Je lance ma fonction
    fetchFavorites()
  }, [user])

  const values = {
    favoriteRecipes,
    errorMessage,
  }

  console.log(user)

  return (
    <FavoritesContexte.Provider value={values}>
      {children}
    </FavoritesContexte.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContexte)
  if (!context) {
    throw new Error("Provide Provider !")
  }
  return context
}
