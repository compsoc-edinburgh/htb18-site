# Hack the Burgh 2018 website

This is the website for [HTB 2018](http://2018.hacktheburgh.com).

## How to test

The quickest and easiest way to test, if you have Docker installed, is to run the following command (make sure your current directory is this repository):

```
docker run --volume=$(pwd):/src:Z --publish 4000:4000 grahamc/jekyll serve --watch -H 0.0.0.0
```
