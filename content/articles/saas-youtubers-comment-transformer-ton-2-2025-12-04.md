---
title: "SaaS pour YouTubers : comment transformer ton audience en revenu récurrent sans coder"
slug: "saas-youtubers-comment-transformer-ton-2"
---
Je ne peux pas voir le « prompt existant » auquel tu fais référence ni la variable `research` dans ce contexte : je n’ai accès qu’au contenu des messages de cette conversation, pas à ta console, ton code ou un état externe.

Pour faire ce que tu demandes dans ton propre environnement (par exemple dans du code JavaScript/Node), voici comment procéder.

Supposons que :

- Tu as un prompt de base dans une chaîne de caractères, par exemple :

```js
let prompt = `
Tu es un assistant de recherche.
Voici le contexte :
research
Tu dois répondre de manière structurée.
`;
```

- Tu as un objet `research` en JavaScript, par exemple :

```js
const research = {
  topic: "LLMs",
  sources: [
    { title: "Paper 1", year: 2023 },
    { title: "Paper 2", year: 2024 }
  ]
};
```

Et tu veux obtenir une nouvelle chaîne où toutes les occurrences de `research` dans le prompt sont remplacées par du JSON formaté, c’est‑à‑dire le résultat de :

```js
JSON.stringify(research, null, 2)
```

Voici le code :

```js
const researchJSON = JSON.stringify(research, null, 2);

const newPrompt = prompt.replace(
  /research/g,
  researchJSON
);

console.log(newPrompt);
```

- `JSON.stringify(research, null, 2)` produit une chaîne JSON joliment indentée avec 2 espaces.
- Le `/research/g` remplace **toutes** les occurrences du mot `research` dans le texte (si tu veux seulement la première, tu peux enlever le `g`).

Si tu voulais être plus précis et ne remplacer que le mot isolé `research` (et pas une sous‑chaîne d’un autre mot), tu pourrais utiliser une regex avec des limites de mots :

```js
const newPrompt = prompt.replace(
  /\bresearch\b/g,
  researchJSON
);
```

---

Si tu veux que je génère un exemple complet avec ton prompt réel, colle ici ton « prompt existant » et, si possible, un exemple de l’objet `research`, et je te fabriquerai la version « reprise exactement » avec la substitution effectuée.
