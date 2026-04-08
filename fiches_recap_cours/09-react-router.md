# SPA
Nos applications React sont des SPA, *single page application.* 

L’utilisateur génère directement UNE SEULE requête HTTP pour demander l’accès à mon application, le serveur répond avec l’index.html, son CSS et ses scripts JS. Après ça tout se passe dans le navigateur du client, on n’actualise jamais plus la page (sinon on perd le contenu du state) !

Principal problème : l’historique de navigation du navigateur ! Pour se réconcilier avec l’URL, il est possible en javascript de simuler cette navigation (ouf !) : l'APIHistory HTML5 (pushState, l'event popState)

# React router

Le **React Router** permet de définir des URL dynamiques et de sélectionner un Component approprié pour render (afficher) en fonction de chaque URL.

Il existe 3 façon d'utiliser React Router : 
- Déclaratif : la plus simple, on déclare nos routes dans le JSX
- Data : on déclare nos routes en dehors du JSX et on a une gestion du chargement de données..
- Framework : bcp plus cadré, structure de fichiers stricte 

## 1. Installation 

Suivre la doc ici : https://reactrouter.com/start/declarative/installation
`pnpm i react-router` 

## 2. Englober notre app avec le BrowserRouter

Composant de react-routeur-dom : il utilise l'HistoryAPI HTML5 pour surveiller l’historique des URL et stocke l'URL courante.
On englobe notre composant racine App avec <BrowserRouter>

```js
import { BrowserRouter } from 'react-router-dom';

[...]

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## 3. Remplacer tous les lien a par des Link/NavLink

Les liens `<a>` classiques font une requête vers le serveur, ce qu'on ne veut pas ! Il va falloir utiliser des liens qui ont un comportement différent.

On va utiliser des liens qui changent l'URL sans faire de vraie requête HTTP.

<details>
  <summary>Le code de ces liens pourraient ressembler ça</summary>

  ```js
  function CustomLink({ children, to, ...rest }) {
    return (
      <a
        onClick={(event) => {
          // on annule le comportement par défaut d'un lien
          event.preventDefault();

          // on push l'url dans la barre du navigateur grace à pushState de l'API History de JS
          window.history.pushState({}, '', to);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
  ```

</details>

### - Composant `<Link>`
On va remplacer tous les `<a>` par des `<Link>`.
`<Link>` est un composant de react-routeur-dom qui permet de générer un lien qui au click change l'URL dans la barre d'adresse du navigateur sans lancer de requête HTTP donc sans recharger une nouvelle page.

Props obligatoires : 
- `to` = URL à afficher dans la barre de navigation du navigateur


```js
import { Link } from 'react-router-dom';

[...]

<Link className="menu-link menu-link--selected" to="/">
  Accueil
</Link>
```

### - Composant `<NavLink/>`

Pour les liens de navigation on va utiliser des `<NavLink>` plutôt que des `<Link>`.

`<NavLink>` est similaire à `<Link>` sauf qu'il ajoute automatiquement une classe nommée `active` sur le lien correspondant à l'URL courante.
Si on veut une autre classe que `active` par exemple `menu-link--selected` il faut assigner à l'attribut `className` une callback qui renvoie la classe souhaitée.
Cette callback recevra en paramètre automatiquement un objet contenant une propriété `isActive`, on va utiliser la valeur de `isActive` pour renvoyer la classe du lien qu'on souhaite.

```js
<NavLink
  className={({ isActive }) => {
    // la callback doit return la classe
    // pour savoir quelle classe renvoyer faut savoir si on est actif ou pas
    // on reçoit cette info en paramètre : un objet contenant une clé isActive
    return isActive ? 'menu-link menu-link--selected' : 'menu-link';
  }}
  to="/"
>
```

## 4. Écrire les routes

Une route est un mapping entre une URL et des éléments React (JSX) à afficher.

### - Composant `<Route>` 
Permet de faire un affichage d'éléments en fonction de l'URL de la barre d'adresse.

2 props à renseigner : 
- prop "path" = l'URL
- prop "element" = le JSX à afficher pour cette URL

```js
<Route path="/" element={<div>Bienvenue sur la page d'accueil</div>} />
```

### - Composant `<Routes>`
On range nos Routes dans un Routes

```js
{/* Englobe notre paquet de routes */}
<Routes>
  <Route path="/" element={<div>Bienvenue sur la page d'accueil</div>} />
  <Route path="/react" element={<div>Bienvenue sur la page React</div>} />
</Routes>
```

### - Route par défaut

La route avec le path `*` matche si aucune des autres routes n'a matché avant.

```js
<Routes>
  <Route path="/" element={<div>Bienvenue sur la page d'accueil</div>} />
  <Route path="/react" element={<div>Bienvenue sur la page React</div>} />
  <Route path="*" element={<div>404</div>} />
</Routes>
```

### - Route avec segment dynamique

Si un segment de path commence avec `:` alors c'est segment dynamique il correspond à n'importe quelle chaîne de caractère.

```js
<Route path="/post/:slug" element={<SinglePostPage />} />
```

Quand cette route va matcher par exemple pour `/post/react-cest-cool` la valeur réelle du segment (le-nom-dun-post) sera enregistrée dans un state du browserRouter appelé params

#### Le hook `useParams`

Hook de react-routeur-dom : retourne un objet contenant les paramètres dynamiques de l'URL courante.

Par exemple pour la route : 
```js
<Route path="/post/:slug" element={<SinglePostPage />} />
```
et l'URL : 
`/post/react-cest-cool` :

```js
const param = useParams();
// params contient : { slug : 'react-cest-cool' }
```

## Composant Navigate

https://reactrouter.com/en/main/components/navigate

Ce composant change l'url au moment où il est rendu : idéal pour renvoyer l'utilisateur vers une page 404 si les infos récupérés en paramètre dynamique ne sont pas bonnes.

```js
  // on récupère id grace à useParams
  // on utilise id pour find un repo

  // si pas de repo trouvé
  if (!repo) {
    // renvoyer l'url vers une page 404
    console.log('on renvoie le user vers /404');

    return <Navigate to="/404" replace />;
  }
  return (
    <Segment>
      // affichage des infos du repo
    </Segment>
  );
  ```