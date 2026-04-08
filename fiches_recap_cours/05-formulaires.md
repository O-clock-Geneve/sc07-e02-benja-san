# Formulaires

## 1. Input contrôlé

Si on utilise des éléments de formulaire (input, select, etc) ces éléments stockent leur valeur dans le DOM.

Si on a aussi besoin de leur valeur dans un state pour adapter l'affichage quand leur valeur change en temps réel on aura un stockage à 2 endroits = risque de conflit !

Donc on va donner le contrôle total au state : notre source unique de vérité ! Pour ça on met en place un champ contrôlé, c'est la valeur du state qui pilote la valeur affichée dans l'input, et on interdit à l'input de changer tout seul sa valeur.

[Doc react](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)

### 1. State
Créer un emplacement de state pour stocker la valeur de l'input

```js
const [valueDuState, setValueDuState] = useState("valeur initiale");
```

### 2. Contrôle en lecture

Forcer le input à afficher la valeur du state

```js
<input value={valueDuState} />
```

A ce stade l'input est en read-only, on ne peut plus modifier la valeur en tapant dans l'input.
On a en console l'erreur : `react-dom.development.js:86 Warning: You provided a value prop to a form field without an onChange handler. This will render a read-only field. If the field should be mutable use defaultValue. Otherwise, set either onChange or readOnly`

### 3. Contrôle en écriture

Au moment du change (quand un user tape sur une touche) on va modifier le state

```js
<input onChange={(e) => {
  setValueDuState(e.target.value);
})} />
```

On place dans le state la nouvelle value de l'input (récupérée dans l'event).
Le state est modifié -> le composant refait son rendu -> la nouvelle valeur s'affiche dans l'input !

---

## Si le composant qui contient le state n'est pas le même que celui qui contient l'input

Il faudra faire passer via des props la valeur et le setter du state.

```js
function ComposantAvecLeState() {
  const [value, setValue] = useState("valeur initiale");

  return <ComposantAvecLinput value={value} setValue={setValue} />;
}
```

```js
function ComposantAvecLinput({ value, setValue }) {
  return (
    <input
      // controle lecture
      value={value}
      // controle ecriture
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
```

## 2. Input non contrôlé

On a vu qu'en contrôlant un input par le state on peut refaire un rendu à chaque fois que sa valeur change et ainsi avoir un affichage en temps réel.

Si on a pas besoin du temps réel, si on veut juste récupérer une donnée à un instant donné (au submit du form par exemple) pour les utiliser à ce moment là uniquement, on peut les récupérer depuis le DOM directement dans le HTMLFormElement.

Exemple avant React 19, dans le handler de submit :

```js
function LoginForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // on empêche le rechargement de la page
    event.preventDefault();

    // on récupère le form
    const form = event.currentTarget;

    // on créé un formData
    const formData = new FormData(form);

    // on récupère les données grace à la méthode "get" du formData et au "name" de l'input
    const email = formData.get("email");
    const password = formData.get("password");

    // on peut ensuite les utiliser
    console.log(email, password);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label>
        login
        <input type="text" placeholder="login" name="email" />
      </label>
      <label>
        password
        <input type="password" name="password" />
      </label>
      <button type="submit" className="loginForm-submit">
        envoyer
      </button>
    </form>
  );
}
```

Exemple à partir de React 19 avec la nouvelle prop `action` : 

```jsx
function LoginForm() {
  // le handler récupère direct le formData 🥳
  const handleAction = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);
  };

  return (
    <form className="loginForm" action={handleAction}>
      <label>
        login
        <input type="text" placeholder="login" name="email" />
      </label>
      <label>
        password
        <input type="password" name="password" />
      </label>
      <button type="submit" className="loginForm-submit">
        envoyer
      </button>
    </form>
  );
}
```

## Comment savoir si je fais un champs contrôlé ou non

![inputs](./img/controlledinput-vs-formdata.png)
