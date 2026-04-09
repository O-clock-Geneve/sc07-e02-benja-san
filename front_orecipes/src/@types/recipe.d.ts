export interface IRecipe {
  id: number
  title: string
  slug: string
  thumbnail: string
  author: string
  difficulty: string
  description: string
  ingredients: IIngredient[]
  instructions: string[]
}

export interface IIngredient {
  id: number
  quantity: number
  unit: string
  name: string
}

export interface IRecipeLink {
  title: string
  slug: string
}

export interface User {
  logged: boolean
  pseudo: string
  token: string
}
