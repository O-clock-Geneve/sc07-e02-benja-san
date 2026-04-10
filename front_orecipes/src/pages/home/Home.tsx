import type { IRecipe } from "../../@types/recipe"
import styles from "./home.module.css"
import RecipeCard from "../../components/recipeCard/RecipeCard"
import { useRecipes } from "../../context/RecipesContext"

export default function Home() {
  const { recipes, isLoading } = useRecipes()
  return (
    <section className={styles.home}>
      <h1>Les recettes oRecipes</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : recipes.length > 0 ? (
        <>
          <h2>Voici nos {recipes.length} recettes</h2>
          <ul>
            {recipes.map((recipe: IRecipe) => {
              return <RecipeCard recipe={recipe} key={recipe.id} />
            })}
          </ul>
        </>
      ) : (
        <h2> Pas de recettes pour le moment</h2>
      )}
    </section>
  )
}
