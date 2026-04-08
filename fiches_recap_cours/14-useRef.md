# Refs

Le hook `useRef` de React sert à créer un emplacement local au composant pour stocker une donnée qui persiste entre les rendus. 
Ca peut être pratique pour stocker une valeur qui ne nécessite pas de déclenchement de rendu quand elle change.

```js
const maRef = useRef('valeur initiale'); 

console.log(maRef); // { current: 'valeur initiale'}
```

La doc : https://fr.react.dev/reference/react/useRef
En utilisant une ref, vous garantissez que :

- Vous pouvez stocker de l’information d’un rendu à l’autre (contrairement aux variables classiques, réinitialisées à chaque rendu).
- La modifier ne déclenche pas un nouveau rendu (contrairement aux variables d’état, qui déclenchent un nouveau rendu).

## 1. Stockage d'une info d'un rendu à l'autre
Par exemple, si on veut compter le nombre de rendu pour loger sur un serveur de logs

- si on place le compteur dans une variable classique :
```js
let compteurDeRendu = 0; // -> redéfinie à 0 à chaque rendu 😱
```

- si on place le compteur dans un state
```js
let [compteurDeRendu, setCompteur] = useState(0); // -> redéclanche un rendu à chaque modif 😱
```

- il faut placer le compteur dans une ref :
```js
const refCompteurDeRendu = useRef(0); // 🥳

useEffect(() => {
  // j’incrémente le compteur après chaque rendu
  refCompteurDeRendu.current += 1;
  console.log(refCompteurDeRendu);
});
```

## 2. Accès à un élément du DOM

Lorsqu'on veut manipuler un élément du DOM en React, on ne va pas le récupérer dans le DOM avec un `querySelector` 😱.
On va plutôt placer une **ref** sur l'element JSX correspondant, l'élément du DOM sera disponible dans la ref dès que le DOM sera pret !

```js
import { useRef, useEffect } from 'react';

function MyComponent() {
  // 1. créer la ref (boite vide au debut)
  const myRef = useRef(null);

  useEffect(() => {
    // 3. accéder à l'élément du DOM après le rendu
    console.log(myRef.current);
  }, []);

  return (
    <div
      // 2. brancher la ref sur un élément JSX
      ref={myRef}
    >
      Cet élément est accessible via useRef
    </div>
  );
}
```

Avec le typage ça donne ça : 

```js
import { useRef, useEffect } from 'react';

function MyComponent() {
  // 1. créer la ref (boite vide au debut)
  const myRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // 3. accéder à l'élément du DOM après le rendu
    console.log(myRef.current);
  }, []);

  return (
    <div
      // 2. brancher la ref sur un élément JSX
      ref={myRef}
    >
      Cet élément est accessible via useRef
    </div>
  );
}
```