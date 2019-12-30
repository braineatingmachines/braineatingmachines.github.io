# https://braineatingmachines.com

If you have reached this link via google search looking for the website, please click on https://braineatingmachines.com visit the website.


### Documentation

The website is built using [Beautiful Jekyll](https://deanattali.com/beautiful-jekyll)

The logo is "Brain by Icongeek26" from the Noun Project

#### How to run and deploy locally

```
docker run -d -p 4000:4000 --name braineatingmachines -v "$PWD":/srv/jekyll beautiful-jekyll

docker stop braineatingmachines && docker start braineatingmachines
```

Access http://localhost:4000
