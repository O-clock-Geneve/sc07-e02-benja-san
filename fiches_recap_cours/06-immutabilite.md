# Immutabilité

En JavaScript, les valeurs sont divisées en deux catégories principales.

## 1/ les types primitifs (ou valeurs primitives)
-> number, string, boolean, null, undefined, symbol.

Les valeurs de types primitifs sont "immutables" ! Par exemple, un 5 est un 5, il n'y a qu'une valeur de 5 possible dans l'univers JS et elle n'est pas modifiable.. 

```js
const number1 = 5;
const number2 = 5;

number1 === number2 // TRUE !
```

## 2/ les types non primitifs (ou objets).
-> object, array, fonction, date, regex

Les valeurs de types NON primitifs sont "mutables" ! Par exemple, il n'y a plein de tableau qui peuvent contenir `'pomme', 'poire', 'peche'` dans l'univers JS, des tableau différents ! Ces tableaux sont modifiables (on peut modifier leur contenu).

```js
const panier1 = ['pomme', 'poire', 'peche'];
const panier2 = ['pomme', 'poire', 'peche'];

panier1 === panier2 // FALSE !
```

On dit que les valeurs de types non primitifs sont stockées par références.

Attention cela veut dire que plusieurs variables peuvent pointer vers la même référence, par exemple : 
```js
const panier1 = ['pomme', 'poire', 'peche'];
const panier2 = panier1;

panier1 === panier2 // TRUE ! 
```

Dans l'exemple ci dessus, les 2 variables panier1 et panier2 sont identiques : elles pointent vers le meme tableau !
Donc attention si on modifie le panier, ça modifie les 2 variables !

Exemple : 
```js
const panier1 = ['pomme', 'poire', 'peche'];
const panier2 = panier1; // creation d'une variable qui pointe vers le meme tableau 

panier1.push('cerise');

panier1; // ['pomme', 'poire', 'peche', 'cerise']
panier2; // ['pomme', 'poire', 'peche', 'cerise'] -> panier2 contient aussi cerise ! 😱
```

## Principe d'immutabilité

Pour éviter ces effets de bord on va respecter le principe d'immutabilité : c'est à dire qu'on ne va jamais modifier une valeur non primitive mais plutôt en créer une copie pour modifier la copie au moment où on la fabrique !

### Le spread operator à la rescousse

Pour créer un nouveau tableau qui sera une copie d'un tableau d'origine mais en ayant sa propre référence on utilise le spread operator qui va venir copier le contenu du tableau de départ dans un nouveau tableau.

Exemple :
```js
const panier1 = ['pomme', 'poire', 'peche'];
const panier2 = [...panier1]; // creation d'un nouveau tableau

panier1.push('cerise');

panier1; // ['pomme', 'poire', 'peche', 'cerise']
panier2; // ['pomme', 'poire', 'peche'] -> ouf panier2 n'a pas bougé 🥳
```

# Et pour nos composants ?

Il faudra bien veiller à utiliser ce principe d'immutabilité dans nos composants si le state contient des valeurs non primitives. 

Par exemple : on stocke dans le state un tableau d'éléments.

```js
const [fruits, setFruits] = useState(['pomme', 'poire', 'peche']);
```

Lors d'un évènement click on veut ajouter des éléments dans ce tableau. Si on push une nouvelle valeur dans le tableau du state et qu'on donne ce même tableau à notre setter comme ceci :

```js

  fruits.push('cerise');
  setFruits(fruits); // le rendu ne se refait pas 😱

```

Notre setter pensera : *Oh, c'est le même tableau `fruits`, pas de changement, pas besoin de refaire un rendu!* car il n'ira pas regarder en profondeur si il y a des nouvelles lignes dans le tableau, il regarde juste si la ref du tableau est la même ! Il fait une **shallow comparaison**.

On doit donc créer un nouveau tableau, avec le spread operator on copie les données du state dedans, et on ajoute la nouvelle.

```js

  const newFruits = [...fruits, 'cerise'];
  setFruits(newFruits); // le rendu se refait 🥳

```

# A retenir
**On doit toujours respecter le principe d'immutabilité = on ne modifie JAMAIS les tableaux/objets du state !!** (ni des props d'ailleurs)