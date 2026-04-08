# Vue conditionnelle

On voudra parfois afficher (ou masquer) un composant en fonction d’une variable, par exemple pour : 
- ouvrir/fermer un panneau de connexion
- afficher un formulaire d’inscription à une newsletter au clic sur un bouton
- afficher/cacher une liste
…

Il existe plusieurs solution pour 'rendre' un composant en fonction d’une variable : 

## 1. Avec une condition (if/else) sur le return
```jsx
if (isLogged) { 
  return <Welcome>;
}
else {
  return <LoginForm>;
}
```

## 2. Avec une ternaire dans le JSX
```js
{ isLogged ? <Welcome /> : <LoginForm /> }
```

## 3. Avec une condition à la volée de l’opérateur logique && 

L'opérateur && utilise une logique de court-circuit, ce qui signifie qu'il exécutera son second opérande ou non selon la valeur du premier.

```js
{ isErrors && <Alert/> }
```

### Comment fonctionne l'opérateur `&&` ?

On part du principe que pour la "question" `(cond1 && cond2)` JS va nous donner les réponses suivantes :

- `true && false` => false ❌
- `true && true` => true 🥳

*-> Si l'opérande 1 vaut `true` il faut que JS execute l'opérande 2 pour savoir quelle réponse donner.*

- `false && true` => false ❌
- `false && false` => false ❌

*-> Si l'opérande 1 vaut `false` peut importe l'opérande 2 : la réponse sera false ! JS ne va donc tout simplement pas executer l'opérande 2 !*

On va s'en servir pour conditionner l'execution de nos composants en JSX:
`{ condition && Composant }`

```js
{ true && <p>HELLO</p> } // -> p sera affiché !

{ false && <p>COUCOU</p> } // -> p ne sera jamais affiché
```