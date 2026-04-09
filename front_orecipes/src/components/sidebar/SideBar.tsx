import { NavLink } from "react-router"
import styles from "./sidebar.module.css"
import type { IRecipeLink } from "../../@types/recipe"

interface sidebarProps {
  recipeLinks: IRecipeLink[]
}

export default function Sidebar({ recipeLinks }: sidebarProps) {
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
