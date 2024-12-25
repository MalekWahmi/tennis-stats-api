# API de Statistiques de Tennis

Le projet Tennis Stats API utilise une architecture modulaire basée sur des microservices, facilitant la gestion des différentes fonctionnalités de l'application. Chaque service (par exemple, récupération des statistiques des joueurs, calcul de l'IMC, etc.) est développé de manière indépendante et déployé sous forme de fonctions AWS Lambda via le Serverless Framework. Cette approche garantit une scalabilité optimale et une gestion simplifiée des mises à jour.

De plus, l'API peut être testée localement à l'aide de Docker Compose, npm ou serverless offline pour simuler l'environnement de production sur votre machine locale. Ce modèle d'architecture modulaire permet de maintenir un code propre, facilement évolutif, tout en garantissant une gestion efficace des services.

---

## Table des Matières

1. [Fonctionnalités](#fonctionnalités)
2. [Dépendances](#dépendances)
3. [Variables d'Environnement](#variables-denvironnement)
4. [Développement Local](#développement-local)
5. [Déploiement sur AWS](#déploiement-sur-aws)
6. [Utilisation](#utilisation)

---

## Fonctionnalités

- Calculer l'IMC moyen de tous les joueurs.
- Trouver la taille médiane des joueurs.
- Identifier le pays avec le meilleur ratio de victoires.

---

## Dépendances

Pour exécuter l'API, vous avez besoin des dépendances suivantes :

- [Node.js](https://nodejs.org/) (v20.x ou plus récent)
- [Serverless Framework](https://www.serverless.com/) (v3 ou plus récent)
- AWS CLI (configuré avec vos identifiants)
- Docker (facultatif, pour les tests locaux avec des conteneurs Docker)

Pour installer les dépendances du projet, exécutez :

```bash
npm install
```

## Variables d'Environnement

```bash
PORT=<>
NODE_ENV=<>
AWS_REGION=<>
AWS_ACCESS_KEY_ID=<>
AWS_SECRET_ACCESS_KEY=<>
S3_BUCKET_NAME=<>
OFFLINE_PORT=<>
```

## Développement Local

Vous pouvez démarrer l'application localement de trois manières : en utilisant **Docker**, une exécution classique avec **npm**

### Option 1 : Développement avec Docker

1. **Construire l'image Docker**

   Assurez-vous d'abord que Docker est installé sur votre machine. Ensuite, dans le répertoire de votre projet, exécutez la commande suivante pour construire l'image Docker de l'application :

   ```bash
   docker build -t tennis-stats-api .
   ```

2. **Démarrer l'application avec Docker Compose**

   Si vous utilisez Docker Compose, vous pouvez démarrer l'application et ses dépendances avec la commande suivante :

   ```bash
   docker-compose up
   ```

3. **Accéder à l'application**

   Une fois l'application démarrée, vous pouvez accéder à l'API via `http://localhost:3000` dans votre navigateur ou utiliser un client HTTP comme Postman pour tester les différentes routes de l'API.

### Option 2 : Développement sans Docker (via npm)

Si vous préférez ne pas utiliser Docker, vous pouvez exécuter l'application directement avec npm. Voici les étapes à suivre :

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Démarrer l'application avec npm**

   ```bash
   npm run start:dev
   ```

   Une fois l'application démarrée, vous pouvez accéder à l'API via `http://localhost:3000` dans votre navigateur ou utiliser un client HTTP pour tester les différentes routes de l'API.

## Déploiement sur AWS avec Serverless Framework et Docker

Cette section vous guidera à travers le processus de déploiement de l'application sur AWS en utilisant **Serverless Framework** avec une image Docker.

### Prérequis

1. **Compte AWS** : Vous devez disposer d'un compte AWS avec les **permissions nécessaires** pour déployer des fonctions Lambda et d'autres ressources comme API Gateway, IAM Roles.
2. **AWS CLI** : Vous devez installer et configurer l'AWS CLI avec vos **identifiants AWS** (Access Key ID et Secret Access Key). Pour cela, exécutez la commande suivante :

   ```bash
   aws configure
   ```

   Cela vous demandera vos identifiants AWS (Access Key et Secret Key) et votre région AWS.

3. **Serverless Framework** : Vous devez installer le Serverless Framework si ce n'est pas déjà fait. Exécutez la commande suivante pour l'installer globalement :

   ```bash
   npm install -g serverless
   ```

**_Étapes de Déploiement_**

1. **Construire l'image Docker**

   Dans le répertoire de votre projet, assurez-vous que votre Dockerfile est correctement configuré pour construire l'image de l'application :

   ```bash
   docker build -t tennis-stats-api .
   ```

2. **Déployer l'application avec Serverless Framework**

   Une fois l'image Docker construite, vous pouvez déployer l'application sur AWS Lambda en utilisant Serverless Framework.

   **Configurer Serverless** : Assurez-vous que votre fichier `serverless.yml` est correctement configuré pour utiliser l'image Docker et déployer la fonction Lambda.

3. **Déployer l'application**

   Une fois que votre fichier `serverless.yml` est prêt, déployez l'application sur AWS avec la commande suivante :

   ```bash
   serverless deploy
   ```

## Utilisation

**Obtenir le pays avec le meilleur ratio de victoires**

- GET `api/stats/best-country`

**Obtenir l'IMC moyen**

- GET `api/stats/average-bmi`

**Obtenir la taille médiane**

- GET `api/stats/median-height`

**Obtenir tous les joueurs triés du meilleur au moins bon.**

- GET `api/players`

**Obtenir un joueur par ID trié du meilleur au moins bon.**

- GET `api/players/{id}`

