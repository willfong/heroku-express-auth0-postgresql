# Heroku Express Auth0 PostgreSQL

### Initial Setup

```
npm install
```

Create `.env`:
```
AUTH0_CLIENT_ID=ABC...123
AUTH0_DOMAIN=example-app.auth0.com
AUTH0_CLIENT_SECRET=ABC...123
AUTH0_CALLBACK_URL=http://localhost:5000/auth/callback
```


```
heroku addons:create heroku-postgresql:hobby-dev
```