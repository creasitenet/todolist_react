# TodoList React

Une application de gestion de tâches moderne et intuitive, développée avec React, TypeScript et Vite. Cette application permet de créer, gérer et organiser vos tâches quotidiennes avec une interface utilisateur élégante et réactive. 
Demo : https://todolist.creasitenet.fr/

## ✨ Fonctionnalités

- **Gestion des tâches** : Ajout, suppression et marquage des tâches comme complétées
- **Filtrage** : Affichage des tâches par statut (toutes, actives, complétées)
- **Persistance des données** : Sauvegarde automatique des tâches dans le stockage local du navigateur
- **Import/Export** : Possibilité d'exporter vos tâches au format JSON et de les réimporter ultérieurement
- **Interface utilisateur intuitive** : Design moderne avec Tailwind CSS
- **Identifiant utilisateur unique** : Chaque utilisateur reçoit un ID unique pour associer ses données

## 🚀 Technologies utilisées

- **React 19** - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **TypeScript** - Superset typé de JavaScript pour un développement plus robuste
- **Vite** - Outil de build ultra-rapide pour le développement web moderne
- **Tailwind CSS** - Framework CSS utilitaire pour un design responsive
- **SWC** - Compilateur JavaScript/TypeScript rapide pour le développement

## 📋 Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

## 🔧 Installation et Lancement

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone https://github.com/creasitenet/todolist_react.git
   cd todolist_react
   ```

2. Installez les dépendances du projet :
   ```bash
   # Avec npm
   npm install

   # Ou avec yarn
   yarn install
   ```

3. Lancez l'application en mode développement :
   ```bash
   # Avec npm
   npm run dev

   # Ou avec yarn
   yarn dev
   ```

4. Ouvrez votre navigateur et accédez à `http://localhost:5173` (ou le port indiqué dans la console Vite).

## 🛠️ Scripts disponibles

- `npm run dev` ou `yarn dev` : Lance le serveur de développement
- `npm run build` ou `yarn build` : Compile l'application pour la production dans le dossier `dist/`
- `npm run lint` ou `yarn lint` : Exécute ESLint pour analyser le code
- `npm run preview` ou `yarn preview` : Lance un serveur local pour prévisualiser le build de production

## 💾 Gestion des données

### Stockage local

L'application utilise le `localStorage` du navigateur pour sauvegarder automatiquement vos tâches. Chaque utilisateur reçoit un identifiant unique lors de sa première visite, ce qui permet de conserver ses données entre les sessions.

### Import et Export

Vous pouvez exporter vos tâches au format JSON pour les sauvegarder ou les transférer vers un autre appareil. Le fichier exporté contient :
- La liste complète de vos tâches
- La date d'exportation
- La version de l'application

Pour importer des tâches, utilisez simplement le bouton "Importer" et sélectionnez un fichier JSON précédemment exporté.

## 🔍 Filtrage des tâches

L'application permet de filtrer les tâches selon trois catégories :
- **Tous** : Affiche toutes les tâches
- **Actifs** : Affiche uniquement les tâches non complétées
- **Complétés** : Affiche uniquement les tâches marquées comme complétées

## 🧹 Nettoyage des données

Vous pouvez effacer toutes vos tâches en utilisant le bouton "Effacer". Une confirmation vous sera demandée avant la suppression définitive.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request pour améliorer cette application.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
