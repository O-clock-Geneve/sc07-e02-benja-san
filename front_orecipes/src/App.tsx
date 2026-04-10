import { Route, Routes } from "react-router"
import "./App.css"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/SideBar"
import Home from "./pages/home/Home"
import RecipePage from "./pages/recipePage/RecipePage"
import Favorites from "./pages/favorites/Favorites"
import FavoritesContexteProvider from "./context/FavoritesContext"

function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Header />
        <main className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:slug" element={<RecipePage />} />
            <Route
              path="/favorites"
              element={
                <FavoritesContexteProvider>
                  <Favorites />
                </FavoritesContexteProvider>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
