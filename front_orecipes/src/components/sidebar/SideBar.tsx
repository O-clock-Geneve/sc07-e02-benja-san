import { NavLink } from "react-router"
import styles from "./sidebar.module.css"
import { useRecipes } from "../../context/RecipesContext"

export default function Sidebar() {
  const { recipeLinks } = useRecipes()
  return (
    <aside className={styles.aside}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favoris</NavLink>
          </li>
          {recipeLinks.length > 0 &&
            recipeLinks.map((link) => (
              <li key={link.slug}>
                <NavLink to={`/recipes/${link.slug}`}>{link.title}</NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  )
}
