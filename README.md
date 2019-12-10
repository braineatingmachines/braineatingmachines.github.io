# Brain Eating Machines

The website is built using [Beautiful Jekyll](https://deanattali.com/beautiful-jekyll)

The logo is "Brain by Icongeek26" from the Noun Project

## How to run and deploy locally

```
docker run -d -p 4000:4000 --name braineatingmachines -v "$PWD":/srv/jekyll beautiful-jekyll

docker stop braineatingmachines && docker start braineatingmachines
```

Access http://localhost:4000
