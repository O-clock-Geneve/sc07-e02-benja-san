# Rendu d'elements dans un tableau en JSX

Souvent on va avoir en props ou récupéré d'API directement des données dans un tableau.

Par exemple : 
```js
const stringTab = ['chocolat', 'farine', 'oeufs'];
```

On va vouloir le "transformer" en un tableau d'elements React comme ça : 
```js
const liTab = [<li>chocolat</li>, <li>farine</li>, <li>oeufs</li>];
```

On va utiliser map !
```js
const liTab = stringTab.map((item) => {
  return <li>{item}</li>;
});
```

## Prop spéciale `key`

Quand des elements JSX sont dans un tableau, React a besoin d'une prop appelée `key` (si on l'oublie on aura une erreur en console : `Each child in a list should have a unique "key" prop.`).
Cette prop doit avoir pour valeur un identifiant de l'element.

```js
const reactElemsTab = stringTab.map((item) => {
  return <li key={item}>{item}</li>;
});
```

**Attention** 

-> ne pas utiliser l'index du tableau car si on enlève une ligne il peut changer
-> ne pas utiliser un nombre random généré à la volée car au rendu suivant ce ne sera pas le même

C'est expliqué [ici dans la doc de React ](https://fr.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) et vous pouvez cloner et lire [ce repo](https://react.dev/learn/rendering-lists#why-does-react-need-keys) pour avoir un exemple concret.
