# online-shiritori

## run

```sh
$ PORT=8080 deno run --allow-net --allow-read --allow-env src/main.js
```

## test

```
$ deno test
```

## deploy

```sh
cat ~/ghcr.txt | docker login ghcr.io -u k-jun --password-stdin
docker build -t ghcr.io/k-jun/online-shiritori:latest .
docker push ghcr.io/k-jun/online-shiritori:latest
```
