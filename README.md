Using Docker

```
本地开发用  "dev": "@powershell copy .env.development.sample .env.local && next dev",
部署用 "dev": "cp .env.development.sample .env.local && next dev",
```

## build

```
docker build -t deindex:v1 .
```

## run

```
docker run -p 3000:3000 deindex:v1
```
