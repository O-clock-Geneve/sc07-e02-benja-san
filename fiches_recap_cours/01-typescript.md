# Typescript

Javascript est un langage très permissif car une même variable peut contenir, au cours de sa vie, des valeurs de types différents ! C'est ce qu'on appelle un langage non typé, non strict ou à typage dynamique.

```js
let maVariable = 'toto'; 
maVariable = 45; // JS est OK tout va bien !
```

Typescript a été créé en 2010 par Microsoft (quand ils bossaient sur la création de VScode), c'est un ajout syntaxique à JavaScript qui permet de typer le code, c’est à dire d’attribuer un type à nos variables.

Mais nos navigateurs web ne comprennent (pour l'instant) que le JS ... donc TypeScript devra être transcompilé en JavaScript ! On va utiliser un transpiler comme Babel ou SWV pour "traduire" le code TypeScript vers du code JavaScript afin qu’il soit interprété par tous les navigateurs.

## Définition par inférence du type (type implicite)
Dans la majorité des cas TS va déduire le type de la variable à partir de sa valeur initiale (sa premiere affectation)

```js
let maVariable = 'toto'; // maVariable ne pourra jamais stocker autre chose qu'une string
maVariable = 45; // error TS : Type 'number' is not assignable to type 'string'.
```

## Définition explicite du type
Il y a certains cas ou on a pas de valeur initiale pour nos variables : par exemple les paramètres d'une fonction. Dans ce cas le type inféré est `Any` : n'importe quoi donc ce n'est pas bien !

On peut alors expliciter le type après le nom de la variable en ajoutant le caractère `:` puis le nom du type.

```js
// si on veut obliger le dev qui utilise cette fonction a donner une string en param on specifie le type avec : string
function sayHelloTo(lastName: string, firstName: string) {
  console.log(`Hello ${lastName} ${firstName}`)
}
```

On aura une alerte en cas de type non respecté :
```js
sayHello(); // TS Erreur
sayHello(50, 'Toto'); // TS Erreur
sayHello('Dave', 'Lopper'); // OK !!
```

## Les types basics
On a les même types primitifs qu'en JavaScript : string, number, boolean, null

## Typer les tableaux
Pour les tableau on utilise la notation []. Et on doit préciser le type des valeurs contenues dans le tableau
```js
// tableau de chaines de caractères
string[]

// tableau de nombres
number[]

// tableau d'objets
{ id: number, title: string }[]
```

## Typer les objets
Pour les objets, le type contient toutes les propriétés de l'objet ainsi que le type de chacune de ces propriétés.

``` js
// TS devine le type de cette variable
// c'est un objet avec les propriété base et topping
// qui doivent contenir des chaines de caractère.
const cupcake = { base: 'vanille', topping: 'chocolat', }; 

// si on essaye d'utiliser une autre propriété qui n'existe pas on aura une erreur
console.log(cupcake.toto); // Erreur Property 'toto' does not exist on type '{ base: string; topping: string; }

// ou si on ne respecte pas le type d'une des propriété
cupcake.base = 42 // Erreur !
```

## Interfaces
Si les types sont complexes on peut les définir à part (dans un autre fichier ou pas) avec le mot clef interface

```js
interface CupcakeI {
  color: string;
  parfum: {
    cake: string;
    topping?: string; // propriété facultative avec un point d'interrogation
  };
  price: number | string; // propriété qui peut contenir un number OU une string
}
```
on l'utilise comme un type normal sauf que c'est notre type custom :

```js
function displayCupcake(cupcake: CupcakeI) {
  console.log(`Le cupcake ${cupcake.color}`);
}
```

ce qui est SUPER COOL c'est que dans le corps de fonction on a l'autocomplétion sur les propriétés de notre objet cupcake !!

## Interfaces VS alias types
Pour specifier le type de nos objet on pourrait aussi utiliser une autre syntaxe : les alias types qui sont sensiblement similaires aux interfaces : 

```ts
type Cupcake = {
  color: string;
  parfum: {
    cake: string;
    topping?: string; // propriété facultative avec un point d’interrogation
  };
  price: number | string; // propriété qui peut contenir un number OU une string
}

function displayCupcake(cupcake: Cupcake) {
  console.log(`Le cupcake ${cupcake.color}`);
}
```

A notre niveau, il n'y a pas de différence mais si vous voulez aller plus loin vous pouvez aller regarder :
- un article comme celui-ci : https://blog.logrocket.com/types-vs-interfaces-typescript/
- une vidéo comme celle-ci : https://www.youtube.com/watch?v=Idf0zh9f3qQ
- un exemple ici : https://www.typescriptlang.org/play#example/types-vs-interfaces

# Comment ça s’applique à nos composants React ?

Nos composants React sont des fonctions, elles ont un paramètre `props` qui contient un objet.
On va donc spécifier le type de cet objet pour décrire chacune de ses propriétés.

```ts
interface MonComposantProps {
  name: string;
}

function MonComposant({ name }: MonComposantProps) {
  return<div>{name}</div>;
}
```

Ainsi quand notre composant sera utilisé, si les props ne sont pas renseignées ou ne sont pas du bon type il y aura une erreur. On aime bien les erreurs c'est des indices pour debugger 🔍 !

```ts
<MonComposantProps /> // Erreur la prop name est manquante
<MonComposantProps name={42} /> // Erreur la prop name est de type number au lieu de string
<MonComposantProps name="Soso"/> // OK le contrat est respecté !
```

### Découper en sous interfaces

Si on a voit qu'une structure de données est potentiellement utilisé à plusieurs endroits, par exemple si on fait une app qui gère des animaux, ça vaut le coup de mettre l'interface Animal dans un fichier à part et de l'exporter pour que plusieurs composant puissent l'utiliser.

Dans un dossier `@types` et dans un fichier `animal.d.ts`
```ts
interface Animal {
  id: number;
  name: string;
}
```
