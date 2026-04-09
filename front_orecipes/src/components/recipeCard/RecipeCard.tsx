import { Link } from "react-router"
import styles from "./recipeCard.module.css"
import type { IRecipe } from "../../@types/recipe"

interface RecipeCardProps {
  recipe: IRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <li className={styles.recipeCard}>
      <article>
        <div className={styles.pictureContainer}>
          <img src={recipe.thumbnail} alt={recipe.title} />
        </div>
        <div className={styles.contentContainer}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipes/${recipe.slug}`}>Voir la recette</Link>
        </div>
      </article>
    </li>
  )
}
