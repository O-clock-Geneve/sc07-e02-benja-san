# Composants React
On va découper chaque portion d’interface en composants.

Chaque composant pourra être utilisé et réutilisé dans le JSX ! C'est un peu comme si on créait une balise JSX custom.

```js
// sous composant réutilisable
function Macaron() {
  return (
    <article>
      Macaron
    </article>
  );
}
```
```jsx
// composant Principal
function MainPage() {
  return (
    <main>
      <h1>La liste des macarons</h1>
      <Macaron />
      <Macaron />
      <Macaron />
      <Macaron />
    </main>
  );
}
```

Le nom d’un composant (et donc de la fonction) doit être en PascalCase pour ne pas le confondre avec une balise HTML et pour « prévenir » React que c’est un composant personnalisé lors de son appel en JSX.

# Quand découper en sous composants ?

- optimiser le rendu
- alléger le code d'un composant (SoC)
- code réutilisable (DRY)

# Props
Nos composants sont des fonctions, elle peuvent avoir des paramètres, on les appellent les props. Chaque composant reçoit automatiquement en paramètre un objet qui contient les valeurs des props.

```js
// on passe les valeurs des props comme des attributs HTML
<Macaron parfum='citron' couleur='jaune' />
<Macaron parfum='framboise' couleur='rose' />

// on récupère ces valeurs en déstructurant le paramètre de la fonction-composant
function Macaron({ parfum, couleur }) {
  return (
    <div className='macaron'
      Je suis un macaron parfum {parfum} couleur {couleur}
    </div>
  );
}
```

Le nom des props est à la convenance du développeur ; il faut quand même faire attention à ne pas prendre le nom d'un attribut HTML qui existe déjà comme className.

## Prop spéciale `children`
`children` est une prop automatiquement créée (et nommée) par React dès qu’un composant a du contenu entre sa balise ouvrante et sa balise fermante.

```js
// ici le composant a du contenu entre sa balise ouvrante et fermante, les 2 macarons
<MacaronBox> 
  <Macaron parfum="citron" couleur='jaune' />
  <Macaron parfum="choco" couleur='marron' />
</MacaronBox>

// ça pourrait être un autre contenu
<MacaronBox> 
  <p>des miettes ...</p>
</MacaronBox>

// ce contenu est automatiquement passé au composant MacaronBox via la prop spéciale children
function MacaronBox({ children }) {
  return (
    <div className='macaronBoxSuperStyled'>
      {children}
    </div>
  );
}
```

**C'est assez utilisé pour des composants qui représente un cadre ou une modale.**

### Typer children

Pour typer `children`, on utilise le type `React.ReactNode` qui peut être : du texte, un élément JSX, un tableau d'éléments, null, ou undefined.
```js
interface IProps {
	children?: React.ReactNode;
}
```

https://reactnative.dev/docs/react-node

# Fragment React
Un div parent est obligatoire autours des balises JSX soeurs.
Si on a pas envie de mettre une balise dans notre html on peut ajouter un fragment React, il ne rendra aucune balise dans le DOM.

```js
function MacaronBox() {
  return (
    // ERROR : les Macarons sont des freres au meme niveau il manque un parent !!!
    <Macaron />
    <Macaron />
    <Macaron />
  );
}
```
Il faudra les englober d'une balise intrinsèque html comme un div ou d'un fragment

```js
  // avec ReactFragment
  <React.Fragment>
    <Macaron />
    <Macaron />
    <Macaron />
  </React.Fragment>
 
  // en version raccourcie :
  <>
    <Macaron />
    <Macaron />
    <Macaron />
  </>
```