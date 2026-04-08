# Cycle de vie

Dans une application React, un composant a un **cycle de vie** (*Lifecycle*), il y a 3 phases :

- le **montage**, `mount` - le 1er rendu du composant
- la **mise à jour**, `update` - les rendus suite à une modification de state
- le **démontage**, `unmount` - la suppression du composant

![react-function-lyfecycle](./img/react_hook_lifecycle.png)

# UseEffect

`useEffect` est un hook de React, il permet d'executer du code (des effets) à certains moments du cycle de vie (dans les zones rouges du diagramme ci-dessus).

Un **effet de bord** (effet secondaire / side effect / effet) est tout ce qui ne concerne pas directement React : ce qui est externe au but premier d'un composant, à savoir le return du JSX qui décrit la partie d'UI dont il est responsable.

Exemples d'effets de bord : 
- l'accès au DOM Réel (pour poser un écouteur d'évènement sur window, pour mettre le focus dans un input, modifier le titre de l'onglet...)
- les appels API
- l'interaction avec des services externes (websocket, log, envoie de mails, ...)
- la mise en place d'un *timer* (`setTimeout`, `setInterval`)
- ...

### Syntaxe :
`useEffect` a 2 paramètres : 
- la callback (qui contient le code de l'effet)
- le tableau de dépendances (qui indique quand est exécuté la callback)
  - si `null` : callback exécutée après chaque render
  - si `[]` : callback exécutée uniquement après le premier render
  - si `[dep]` : callback exécutée après le premier rendu + après les rendus pour lesquels la valeur de `dep` change (dépendance étant une variable)

```js
useEffect(
  // callback contenant le code de l'effet
  () => { 
    // code de l'effet
  },
  // tableau de dépendances
  []
);
```

## Nettoyage

La clean-up function sera exécutée : 
- au démontage du composant.
- et si le useEffect a une dépendance : à chaque changement de valeur de la dépendance -> avant chaque nouvel execution de l'effet pour nettoyer l'effet du rendu d'avant.

```js
useEffect(
  // callback contenant le code de l'effet
  () => { 
    // code de l'effet
    

    // on return la callback qui sera exécutée pour nettoyer l'effet
    return () => {
      // code du nettoyage de l'effet
    }
  },
  // tableau de dépendances
  []
);
```

# Notion de fonction pure

Une fonction pure est une fonction qui, pour les mêmes arguments, produit toujours le même résultat sans provoquer d'effets secondaires (comme modifier une variable externe ou interagir avec des systèmes externes).

```js
// sum est une fonction pure
const sum = (nb1, nb2) => nb1+nb2

// chaque execution avec les meme paramètres donnera le même résultat
sum(2,2) // -> 4
sum(2,2) // -> 4
sum(2,2) // -> 4
```

```js
// sum n'est pas pure car elle fait un call api
const sumAvecEffet = (nb1, nb2) => { 
  console.log('callAPI');
  return nb1+nb2 
}

sumAvecEffet(2,2) // -> 4 mais 1 call API exécuté
sumAvecEffet(2,2) // -> 4 mais 1 call API exécuté

// si on execute 100 fois la fonction on spamme l'API, notre fonction a un impact extérieur !
```

```js
// sum n'est pas pure car elle modifie son paramètre qui est un objet qui existe en dehors de la fonction donc elle a un impact à l'extérieur
const sum = (nbrs) => {
  nbrs.toto = "toto";
  return nbrs.nb1 + nbrs.nb2
}

const myObject = {nb1: 2, nb2: 2}
sum(myObject) // -> 4 mais myObject a été modifié  {nb1: 2, nb2: 2, toto: 'toto'}
```
