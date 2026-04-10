import type { IRecipe } from "../../@types/recipe"
import RecipeCard from "../../components/recipeCard/RecipeCard"
import { useFavorites } from "../../context/FavoritesContext"

export default function Favorites() {
  const { errorMessage, favoriteRecipes } = useFavorites()

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
