# Movie Profile App

A web application that allows users to sign in with Google, save their favorite movie, and get interesting facts about it using OpenAI's API.

# Movie Profile App

A web application that allows users to sign in with Google, save their favorite movie, and get interesting facts about it using OpenAI's API.

## Features

- Google Authentication
- Favorite Movie Selection
- AI-Generated Movie Facts
- User Profile Display
- Responsive Design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v19.x or higher)
- PostgreSQL (v14.x or higher)
- npm or yarn

## Installation Steps

1. **Clone the repository and Install dependecies**
```bash
git clone https://github.com/nemanfaiz/scowtt_challenge.git
cd movie-facts-app
npm install
```

2. **Set up PostgreSQL**

```bash
# Installation
## Windows: 
    Download and install from PostgreSQL Website

## Mac: 
    brew install postgresql@14
    brew services start postgresql@14

## Linux:
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    sudo -i -u postgres
```

3. **Create Database and User**
```bash
psql -U postgres
CREATE DATABASE movie_app_db;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE movie_app_db TO myuser;
```

4. **Configure Environment Variables**

```bash
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/movie_app_db?schema=public"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

OPENAI_API_KEY="your-openai-api-key"
```

5. **Prisma DB Migration**

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

6. **Run Development Server**

```bash
npm run dev
```

7. **Database Managment**

```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) to get started with App.


8. **Verify PostgreSQL Server running**

```bash
# Windows
net start postgresql-x64-14

# Mac
brew services list

# Linux
sudo systemctl status postgresql
```