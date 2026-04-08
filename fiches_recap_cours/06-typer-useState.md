# Typer ce que nous renvoie UseState

Quand on utilise `useState` pour faire un emplacement dans le state, typescript se base sur la valeur initiale pour définir le type de la variable de state et le type du paramètre du setter.

```js

// ici count est un number car la valeur initiale 0 est un number
// et setCount est une fonction qui n'accepte en paramètre que des number
const [count, setCount] = useState(0);

setCount('toto'); // TS error !!
```

Si jamais on veut un type différent par exemple une union de type : dans le cas ou le state stocke null quand on a pas encore les données puis un tableau d'objets quand on les a reçu d'un fetch.

On va passer le type voulu à useState en "generic" : entre chevrons devant les parenthèses.

```js
// ici products est soit null soit un tableau de IProduct
// notre setter setProducts peut accepter les tableaux de IProduct meme si la valeur initiale était nulle
const [products, setProducts] = useState<null | IProduct[]>(null);
```