import { useEffect, useState } from "react"
import type { IRecipe } from "../../@types/recipe"
import RecipeCard from "../../components/recipeCard/RecipeCard"

export default function Favorites() {
  //Je prépare un state pour heberger mes recettes favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([])
  //Je prépare un state pour afficher un message d'erreur
  const [errorMessage, setErrorMessage] = useState("")

  //Le useEffect me permet de fetch les datas via mon api distante
  useEffect(() => {
    //Je prépare une fonction pour récupérer mes favoris
    async function fetchFavorites() {
      //je prépare mon url
      const url = "http://localhost:3000/api/favorites"
      // J'essaye de récupérer mon token si l'utilisateur est déja connecté
      //Via les datas enregistrées au préalable dans le local storage
      //CF Header.tsx
      const token: string | null = localStorage.getItem("token")
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
  }, [])

  console.log(favoriteRecipes)
  return (
    <section>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <h1>Vos recettes favorites !</h1>
          {favoriteRecipes.length > 0 ? (
            <ul>
              {favoriteRecipes.map((recipe: IRecipe) => {
                return <RecipeCard recipe={recipe} key={recipe.id} />
              })}
            </ul>
          ) : (
            <p>pas de favoris pour le moment</p>
          )}
        </div>
      )}
    </section>
  )
}
