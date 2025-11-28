# API Test Club

Une API REST pour gérer les clubs étudiants, développée avec Node.js, Express, TypeScript et Prisma.

## 🚀 Fonctionnalités

- **Gestion des étudiants** : Créer, lire, modifier et supprimer des étudiants
- **Gestion des clubs** : Gérer les clubs étudiants et leurs présidents
- **Gestion des activités** : Organiser les activités des clubs
- **Relations** : Gestion des relations entre étudiants, clubs et activités

## 🛠 Technologies utilisées

- **Node.js** & **Express.js** - Framework backend
- **TypeScript** - Langage de programmation
- **Prisma** - ORM pour base de données
- **PostgreSQL** - Base de données (configurable)

## 📦 Installation

1. Cloner le repository
```bash
git clone https://github.com/LordEddine/api-test-club.git
cd api-test-club
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

4. Initialiser la base de données
```bash
npx prisma migrate dev
```

5. Démarrer le serveur de développement
```bash
npm run dev
```

## 📋 API Endpoints

### Étudiants
- `GET /students` - Lister tous les étudiants
- `GET /students/:id` - Obtenir un étudiant par ID
- `POST /students` - Créer un nouvel étudiant
- `PATCH /students/:id` - Modifier partiellement un étudiant
- `DELETE /students/:id` - Supprimer un étudiant

### Clubs
- `GET /clubs` - Lister tous les clubs
- `GET /clubs/:id` - Obtenir un club par ID
- `POST /clubs` - Créer un nouveau club
- `PUT /clubs/:id` - Modifier un club
- `DELETE /clubs/:id` - Supprimer un club

### Activités
- `GET /activities` - Lister toutes les activités
- `GET /activities/:id` - Obtenir une activité par ID
- `POST /activities` - Créer une nouvelle activité
- `PUT /activities/:id` - Modifier une activité
- `DELETE /activities/:id` - Supprimer une activité

## 🗃 Structure de la base de données

Le projet utilise Prisma avec les modèles suivants :

- **Student** : Étudiants avec nom et email
- **Club** : Clubs avec nom, description et président
- **Activity** : Activités avec titre, date et club associé

## 🧪 Tests

Un fichier `test.rest` est inclus pour tester les endpoints avec l'extension REST Client de VS Code.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## 📝 Licence

Ce projet est sous licence MIT.