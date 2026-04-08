# State

Si notre interface représente une donnée qui est amenée à évoluer, cette donnée est alors placée dans un **state** (**état**).  
On dit que le state "pilote" l'affichage des composants !

Pour ajouter un state dans un composant il y a 2 solutions : 
- la old school : passer notre fonction-composant sous forme de classe-composant et lui ajouter une propriété appelée `state`.
- la moderne : utiliser le hook d'état `useState`.

## Le hook d’état `useState`

`useState` est une fonction de React qui permet de créer une variable d'état dans un composant.

## 1. Créer un emplacement de state

```js
const [value, setValue] = useState(initialValue)
```

→ useState retourne un tableau contenant 2 éléments : 
1. la valeur du state
2. une fonction pour modifier la valeur du state.
  Cette fonction permet de :
    - refaire un rendu du composant *(= re-exécuter le composant, re-renvoyer son JSX, re-demander à ReactDOM de faire le rendu du JSX)*
    - modifier cette valeur dans le state

```js
// Exemple :
const [count, setCount] = useState(0);
```

## 2. Utiliser cette variable de state pour l'affichage dans le JSX

On utilise les valeurs du state directement dans le JSX, pour faire des calculs, ou pour les faire passer à des sous composants...

Exemples : 
```js
function MonComposant() {
  const [count, setCount] = useState(0);

  const countFois10 = count * 10;

  return (
    <div>
      <div>{count}</div>
      {(count > 10) && <p>Ca commence à faire bcp !</p>}
      <p>Le nombre fois 10 est égale à {countFois10}</p>
      <ComposantEnfant count={count} />
    </div>
  );
}
```

## 3. Modifier le state suite à une interaction

La plupart du temps, on voudra modifier le state suite à un événement : un clic sur un bouton, la soumission d’un formulaire…

### 1. on pose l’écouteur d'évènement
```js
<composant onXXX={handler}>
```

`XXX` le nom de l’évènement : onClick, onSubmit…
`handler` le nom de la callback

### 2. on modifie l’état via son setter
```js
const handler = () => {
  setValue(nouvelleValue);
}
```
Autre syntaxe, le setter peut recevoir une callback
```js
const handler = () => {
  setValue((actualValue) => nouvelleValue);
}
```

Exemple
```js
function MonComposant() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        // syntaxe simple 
        setCount(count+1)

        // ou syntaxe callback 
        setCount((oldCount) => oldCount + 1);
      }}>
        Add 1
      </button>
    </div>
  );
}
```

<details>
  <summary>Détails de la syntaxe avec callback</summary>
  
  Un cas ou la callback est obligatoire c'est si y'a plusieurs appels successifs du setter

  ```js
    <button onClick={() => {
      setCount(count + 1); // 0+1
      // ici count n'est pas encore mis à jour ça sera que dans le rendu d'apres
      setCount(count + 1); // 0+1
    }}>
  ```

  Avec la callback pas de problème : 
  ```js
    <button onClick={() => {
      setCount((oldCount) => oldCount + 1); //0+1
      // si on re execute un setter , l'argument fournis à sa callback aura bien prit en compte la modif précédente
      setCount((oldCount) => oldCount + 1); //1+1
    }}>
  ```

  https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state

  Ça s’explique assez facilement, et pour 2 raisons :

  - la valeur de `count` est déterminée (une fois pour toute) _au rendu_

    - pendant tout notre code `count` vaut toujours la même chose (0 au 1er rendu, 1 au second…)
    - `setCount` « émet l’intention » de modifier `count`

  - le composant n’est pas appelé dès que l’on fait un `setCount`, en fait React attend que tout le code de notre _handler_ soit exécuté avant de procéder à la modification du _state_
    - ça évite les modifications non-finies
    - ça évite de rendre trop de fois le composant
    - ça assure d’avoir les bonnes infos à mettre à jour

  C’est le _*batching*_

  → https://react.dev/images/docs/illustrations/i_react-batching.png

  Analogie :
  Au resto, le serveur nous demande notre commande :
  j’hésite…

  « Allez ! Je prends les moules frites… » → `setDiner('moules frites')`
  « Ah non, c’est pas la saison ! Je prends la salade du Chef » → `setDiner('salade')`
  « Ah non, il fait froid ! Je prends le Welsh » → `setDiner('welsh')`

  -> Le serveur repart et demande un Welsh en cuisine…

</details>

## État partagé  

On peut créer autant d’état qu'on veut dans un composant, en multipliant les useState.

Mais on doit réfléchir où déclarer notre état : il faut garder à l’esprit qu’une modification de l’état provoque un re-rendu du composant et de tous ses enfants… Attention aux performances !

Il est donc judicieux et même préférable de définir la variable d’état dans le composant qui l’utilise : on parle d’état local.

Par contre, si l’état est utilisé par plusieurs composants, on mettra en place un état partagé. Mais rappelons-nous que la communication de React est unidirectionnelle descendante : on ne peut pas communiquer entre composants frères… La seule solution est de trouver un ancêtre commun pour déclarer l’état, et de diffuser sa valeur et son setter via les props jusqu’aux composants cibles.

## Dessin de Maggie

![dessin useState](https://res.cloudinary.com/dg3gyk0gu/image/upload/c_scale,w_950/v1578937254/maggieappleton.com/egghead-course-notes/custom-react-hooks/customhooks-2.png)
