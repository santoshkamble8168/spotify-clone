# Full Stack Spotify Clone with Next.js 13 

![Full Stack Spotify Clone with Next.js 13](https://res.cloudinary.com/dy1dl6rb9/image/upload/v1693719553/spotifyClone_x7i7w4.png)

[Demo Click here](https://digital-music-service.vercel.app/)

### Tech stack
- React 18
- Next.js 13 
- typescript
- Tailwindcss
- supabase
- Credential authentication with Supabase
- Stripe integration
- PostgreSQL
- zustand: frontend state managment library
- radix-ui: React based component library
- use-sound: A React Hook for Sound Effects (to play audio songs)

### Node version 14.x


### Cloning the repository

```shell
git clone https://github.com/santoshkamble8168/spotify-clone
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Configure your providers 
1. Google
2. Github

### Start the app

```shell
npm run dev
```