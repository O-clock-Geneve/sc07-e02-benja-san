import { createContext, useContext, useState } from "react"
import type { User } from "../@types/recipe"

//Je prépare le sdonnées que je mettrai à disposition dans le contexte
interface IAuthContext {
  user: User | undefined
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

//Je crée un contexte lié à l'authentication
export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  //je prépare ma fonction de login
  async function login(email: string, password: string) {
    const url = "http://localhost:3000/api/login"
    const body = {
      email: email,
      password: password,
    }
    //Je vcérifie que les données sont remplies
    if (email && password) {
      //J'envoie les données de connexion au backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        // J'attend la réponse
        const fetchedUser = await response.json()
        //Je stocke le sinformations dans le state user
        setUser(fetchedUser)
        //Je remet l'erreur à null
        setError(null)
        //Pour les prochaines connexion je stocke les informations dans le localstorage
        localStorage.setItem("logged", fetchedUser.logged)
        localStorage.setItem("pseudo", fetchedUser.pseudo)
        localStorage.setItem("token", fetchedUser.token)
      } else {
        setError("Erreur de connexion, invalid credentials")
      }
    } else {
      setError("veuillez renseigner les champs obligatoires")
    }
  }

  function logout() {
    setUser(undefined)
    setError(null)
    localStorage.clear()
  }

  const values = {
    user,
    error,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

//Je prépare une methode pour accéder aux donnéers du contexte
export function useAuth() {
  const context = useContext(AuthContext)
  // S'il est vide je renvoie une ERREUR !
  if (!context) {
    throw new Error("Aucun provider n'a été défini pour votre contexte Auth")
  }
  return context
}
