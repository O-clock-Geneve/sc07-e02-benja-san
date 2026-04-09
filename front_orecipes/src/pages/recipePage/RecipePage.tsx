import { Link, useParams } from "react-router"
import type { IRecipe } from "../../@types/recipe"

interface RecipePageProps {
  recipes: IRecipe[]
}

export default function RecipePage({ recipes }: RecipePageProps) {
  const { slug } = useParams()

  const recipe: IRecipe | undefined = recipes.find(
    (recipe) => recipe.slug === slug,
  )

  return (
    <div>
      {recipe ? (
        <>
          <section>
            <img src={recipe.thumbnail} alt={recipe.title} />
            <div>
              <h1>{recipe.title}</h1>
              <p>
                {recipe.author} - {recipe.difficulty}
              </p>
            </div>
          </section>
          {recipe.ingredients.length > 0 && (
            <section>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <p>
                      <span>
                        {ingredient.quantity} {ingredient.unit}
                      </span>{" "}
                      {ingredient.name}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {recipe.instructions.length > 0 && (
            <section>
              <ul>
                {recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <h1>
          Aucune recette de ce nom 👉 retournez à <Link to="/">l'accueil</Link>
        </h1>
      )}
    </div>
  )
}
