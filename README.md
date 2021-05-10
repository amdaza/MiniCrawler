# MiniCrawler
Simple crawler

Crawls links from a given url. It allows to crawl one of the urls founded previously.


## Set this up!
We need to download dependencies in both projects
```
cd .\server\crawler\
npm instal
```
```
cd .\client\
npm install
```
Yarn can also be used. 

## Let's launch it
First, server needs to be launched:

```
cd .\server\crawler\
yarn start (or npm start)
```

It launches in port 5000. To set the environment:
```
linux & mac: export NODE_ENV=production
windows: $env:NODE_ENV = 'production'
```

Then we can launch client:

```
cd .\client\
```
For develop and reload on change
```
npm run dev
```

If we're in production, only leave structure there

## Why these technologies
For this solution I haven't used Docker or React because I've never worked with them. I tried to use React for frontend, but I spent too much time trying to do a correct project structure, and a functional solution. So I changed to Angular 1, which I used years ago.

### Frontend notes
It's basically one view that shows the latest urls crawled, or the url received by input or by clicking into a previous result.\
Responsive is performed using skeleton. Chosen for its simplicity.\
Angular is used with components and a directive for the new url form.



### Backend notes
Backend is in Node.js. It has two principal routes:
```
/crawl/:url
/lasturls
```

#### /crawl/:url
The main call, from encoded url, it searchs all links in that page

#### /lasturls
It shows the last crawled urls, stored in a txt


