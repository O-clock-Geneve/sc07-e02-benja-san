# Configurer un projet Vite avec Biome

Biome est un outil qui sert de _linter_ ET _formatter_ ! 

Ca fait moins de paquets à gérer que si on utilisait eslint + prettier, c'est plus facile à configurer et beaucoup plus rapide !

> Il supporte de [multiples langages](https://biomejs.dev/internals/language-support/) :
> JS, TS, JSON, JSX, CSS (et bientôt HTML).

### Désinstaller eslint

Par défaut, Vite installe ESLint (dans une configuration minimale)… Il faut donc supprimer toutes les références à ESLint :

- dépendances
- scripts
- fichier de configuration

> **ATTENTION** les dépendances sont définies dans le `package.json` et sont installées dans les `node_modules/`…
>
> Pour bien supprimer :
>
> - soit `pnpm uninstall XXX YYY ZZZ`
> - soit on supprime directement toutes les lignes des dépendances d'eslint dans le `package.json`, il faut alors supprimer le `pnpm-lock.yaml` et `node_modules/`, puis on réinstalle les dépendances avec `pnpm i`

### Installer biome

→ suivez la doc ici : <https://biomejs.dev/guides/getting-started/>

1. Ajout de la dépendance : `pnpm add --save-dev --save-exact @biomejs/biome`

2. Création du fichier de config : `pnpm biome init`

3. Vous pouvez copier cette config à la place de celle générée dans biome.json :

    ```json
    {
      "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
      "vcs": {
        "enabled": false,
        "clientKind": "git",
        "useIgnoreFile": false
      },
      "files": {
        "ignoreUnknown": false,
        "ignore": []
      },
      "formatter": {
        "enabled": true,
        "indentStyle": "space"
      },
      "organizeImports": {
        "enabled": true
      },
      "linter": {
        "enabled": true,
        "rules": {
          "recommended": true,
          "style": {
            "noNonNullAssertion": "off"
          },
          "suspicious": {
            "noShadowRestrictedNames": "off",
            "noDuplicateParameters": "off",
            "noConsole": "warn",
            "noDebugger": "error"
          },
          "correctness": {
            "noUnusedImports": "error",
            "noUnusedVariables": "error"
          }
        },
        "ignore": ["dist"]
      },
      "javascript": {
        "formatter": {
          "quoteStyle": "single"
        }
      },
      "overrides": [
        {
          "include": ["./tsconfig.app.json", "./tsconfig.node.json"],
          "json": {
            "parser": {
              "allowComments": true
            }
          }
        }
      ]
    }
    ```

4. Vous pouvez ajouter les scripts dans la partie script du `package.json` *même si on ne va pas forcément s'en servir (util surtout pour le déploiement continue)*

    ```json
    {
      "scripts": {
        "format": "pnpx @biomejs/biome format ./",
        "format:fix": "pnpx @biomejs/biome format --write ./",
        "lint": "pnpx @biomejs/biome lint ./",
        "lint:fix": "pnpx @biomejs/biome lint --write ./",
        "check": "pnpx @biomejs/biome check ./",
        "check:fix": "pnpx @biomejs/biome check --write ./"
      }
    }
    ```

    - `format` : lance le formatter *- vérifie le style uniforme du code (indentation, espacement, etc.)*
    - `lint` : lance le linter *- vérifie la qualité du code (erreurs, mauvaises pratiques, etc).*
    - `check` : lance le formatter + le linter + le tri des lignes d'imports - *[biome check](https://biomejs.dev/reference/cli/#biome-check)*

5. Configurer VSCode pour forcer biome comme formater+linter par défaut. Vous pouvez créer un fichier : `.vscode/settings.json`  et mettre ce code dedans :

    ```json
    {
      "editor.codeActionsOnSave": {
        "quickfix.biome": "explicit",
        "source.organizeImports.biome": "explicit"
      },
      "editor.defaultFormatter": "biomejs.biome",
      "editor.formatOnSave": true
    }
    ```

    > <https://biomejs.dev/reference/vscode/>

6. Installer l'[extension VScode](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
