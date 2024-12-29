# API de Statistiques de Tennis

Le projet **Tennis Stats API** utilise une **architecture modulaire basée sur des microservices**, facilitant la gestion et l'évolution des différentes fonctionnalités. Chaque service est conçu de manière indépendante, ce qui permet une meilleure scalabilité et un déploiement optimisé.

Deux méthodes de déploiement sont proposées :
1. **Déploiement sur AWS Lambda avec Serverless Framework** (image Docker).
2. **Déploiement sur une instance EC2 avec Nginx et PM2**.

Vous pouvez également configurer un **nom de domaine personnalisé** pour remplacer l'adresse IP actuelle et activer le **SSL** pour sécuriser vos communications. 

L'API peut être sécurisée avec JWT (JSON Web Token) pour garantir l'accès authentifié aux ressources. Chaque requête devra inclure un token JWT

---

## Table des Matières

1. [Fonctionnalités](#fonctionnalités)  
2. [Dépendances](#dépendances)  
3. [Variables d'Environnement](#variables-denvironnement)  
4. [Développement Local](#développement-local)  
5. [Déploiement](#déploiement)  
   - [Méthode 1 : AWS Lambda avec Serverless](#méthode-1--aws-lambda-avec-serverless)  
   - [Méthode 2 : EC2 avec Nginx et PM2](#méthode-2--ec2-avec-nginx-et-pm2)  
6. [Utilisation](#utilisation)  
7. [Tests](#tests)

---

## Fonctionnalités
- Retourne tous les joueurs triés par classement.
- Retourne un joueur spécifique.
- Calculer l'IMC moyen des joueurs.
- Trouver la taille médiane des joueurs.
- Identifier le pays avec le meilleur ratio de victoires.

---

## Dépendances

- [Node.js](https://nodejs.org/) (v20.x ou plus récent)
- AWS CLI
- Docker (facultatif)
- [Serverless Framework](https://www.serverless.com/) (v3 ou plus récent)
- Nginx et PM2 pour le déploiement sur EC2

---

## Variables d'Environnement

```bash
PORT=<port_local>
NODE_ENV=<development|production>
AWS_REGION=<votre_région_aws>
AWS_ACCESS_KEY_ID=<votre_access_key>
AWS_SECRET_ACCESS_KEY=<votre_secret_key>
OFFLINE_PORT=<port_serverless_offline>
```

---

## Développement Local

### Avec Docker
```bash
docker build -t tennis-stats-api .
docker-compose up
```

### Sans Docker
```bash
npm install
npm run start:dev
```

---

## Déploiement

### Méthode 1 : AWS Lambda avec Serverless

1. **Construire l'image Docker** :
   ```bash
   docker build -t tennis-stats-api .
   ```

2. **Configurer Serverless** : Assurez-vous que `serverless.yml` est correctement configuré.

3. **Déployer** :
   ```bash
   serverless deploy
   ```

### Méthode 2 : EC2 avec Nginx et PM2

1. **Connectez-vous à votre instance EC2** :
   ```bash
   ssh -i "votre_clé.pem" ec2-user@votre_adresse_ip
   ```

2. **Installer les dépendances** :
   Pour installer les dépendances sur votre instance EC2 avec Nginx, Node.js, npm, et PM2, voici les commandes à exécuter une par une :

1. **Mettre à jour les paquets disponibles :**

   ```bash
   sudo apt update
   ```

2. **Installer Nginx :**

   ```bash
   sudo apt install nginx -y
   ```

3. **Installer Node.js :**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install nodejs -y
   ```

4. **Installer npm (si ce n'est pas déjà installé avec Node.js) :**

   ```bash
   sudo apt install npm -y
   ```

5. **Installer PM2 pour gérer votre application Node.js :**

   ```bash
   sudo npm install -g pm2
   ```

3. **Configurer l'application** :
   - Clonez votre dépôt :
     ```bash
     git clone https://github.com/MalekWahmi/tennis-stats-api.git
     cd tennis-stats-api
     npm install
     pm2 start npm --name tennis-stats-api -- start
     ```

4. **Configurer Nginx** :
   Modifiez le fichier de configuration Nginx :
   ```bash
   sudo nano /etc/nginx/sites-available/tennis-stats-api
   ```
   Ajoutez :
   ```
   server {
       listen 80;
       server_name votre_domaine_ou_ip;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Redémarrez Nginx** :
   ```bash
   sudo ln -s /etc/nginx/sites-available/tennis-stats-api /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

## Utilisation
- **Players** : `GET /api/players`
- **Player by id** : `GET /api/players/{id}`
- **IMC moyen** : `GET /api/stats/average-bmi`
- **Taille médiane** : `GET /api/stats/median-height`
- **Pays avec le meilleur ratio** : `GET /api/stats/ratio`

---

## Tests

Exécuter les tests unitaires avec Jest :
```bash
npm run test
```