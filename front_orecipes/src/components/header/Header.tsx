import { Link } from "react-router"
import styles from "./header.module.css"
import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

export default function Header() {
  const { user, login, setUser, logout } = useAuth()

  async function handleAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    login(email, password)
  }

  useEffect(() => {
    async function retrieveUser() {
      if (
        localStorage.getItem("logged") &&
        localStorage.getItem("pseudo") &&
        localStorage.getItem("token")
      ) {
        setUser({
          logged: Boolean(localStorage.getItem("logged")),
          pseudo: localStorage.getItem("pseudo") as string,
          token: localStorage.getItem("token") as string,
        })
      }
    }
    retrieveUser()
  }, [])

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="logo.png" alt="Accès Accueil Orecipes" />
      </Link>
      {user && user.logged ? (
        <>
          <p>Welcome {user.pseudo}</p>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <form action={handleAction}>
          <input type="email" placeholder="Adresse Email" name="email" />
          <input type="password" placeholder="Mot de passe" name="password" />
          <button type="submit">OK</button>
        </form>
      )}
    </header>
  )
}
