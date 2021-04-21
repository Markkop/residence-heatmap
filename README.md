# 🏠 Residence Heatmap

This project is a coding challenge that displays a heat-map visualization for residences and their residents

## Requisites

- React application
- JSON Server to simulate its backend
- A residence registration with ZIP Code, number, latitude, longitude and number of residents
- Form validation
- A heat-map visualiation with all residences registered taking into acccount their residents

## Demo

https://residences-heatmap.herokuapp.com/

![Project's printscreen](http://i.imgur.com/lrnFoXo.png)

## Features

- Random address generation near the last address inputed
- Addresses reset
- ZIP Code external validation

## How to Run

- Clone this repository
- Run `npm install` to install dependencies
- Run `npm run dev` to have the client up on http://localhost:3000 and the server (database) on :3001

## How to Deploy

- Commits and PRs on master are deployed using Github Actions to Heroku  

## Difficulties and Learnings

### Heatmap Lib

At first I was going to use Google Maps, but that "[For Development Only](https://i.stack.imgur.com/maCMs.png)" layer was too ugly, so I've found this Leaflet library and the [leaflet.heat](https://github.com/Leaflet/Leaflet.heat) plugin which was pretty easy to use.  
The problem is that this plugin uses a "[dependency](https://github.com/Leaflet/Leaflet.heat/blob/gh-pages/dist/leaflet-heat.js#L6)" that uses a [HTML Canvas](https://github.com/mourner/simpleheat/blob/gh-pages/simpleheat.js#L54) thing that was breaking the default React test.  
After trying some workarounds and other libraries, I've ended up removing that test (sorry universe)  

### Eslint as production dependency

This kinda bugged me out because I'm not sure if it makes sense, but [I had to move](https://stackoverflow.com/questions/47717115/heroku-app-crashed-because-of-eslint-faulty-import) eslint to production dependencies instead of devDependencies because it would throw an import  error otherwise.

### State mutation

This one is interesting because in order to use custom validations in the form (such as validating a Zip Code externally) I've implemented an async input onChange that would change a state that was containing a Set with the names of the inputs that were valid.  
But everytime I was changing this state, the state would actually be its previous state.  
After spending sime time trying to figure it out, I've tweeted looking for help and turns out that using Set was a bad ideia because its methods would actually mutate the state. By [changing it](https://github.com/Markkop/residence-heatmap/commit/5091fca889176246d026ca19f25f26f587ebb52a) to Array (and avoiding mutating it too) it worked.  
Thanks [@gustavo_pch](https://twitter.com/gustavo_pch/status/1384894729389711365)

### JSON Server + React in production

Another great challenge was figuring out how to use JSON Server in the same React application while being hosting in Heroku.  
With some [research](https://stackoverflow.com/questions/63122706/how-to-deploy-reactjs-app-with-json-server), I was able to use an express server to run them both.  
Bonus points on using a [json-server-reset](https://www.npmjs.com/package/json-server-reset) lib to reset the database and making it work in production too.

### Atomic Design

I [like](https://github.com/Markkop/corvos-de-efrim-website) [using](https://github.com/Markkop/meta-quiz-imersao-react/tree/main/src/components) Atomic Design in my React projects, but here it didn't work that well mostly because I was lazy enough to not split my components into smaller ones. 
This was actually a goal, but as time ran out I've rather choose to keep them as they are.

### TypeScript and PropTypes

Another wishlist item for this project as using TypeScript or at least PropTypes (which is not that difficult), but I'm already pretty tired and just want to finish it. But hey, at least I've used JSDocs on some functions!

### Tests

I really wanted to implement Cypress tests not only because I like testing, but because would be a great opportunity to keep learning about Cypress, specially on how to setup it in a fresh new app. While I already use Cypress at work, it's with VueJS and all the setup thing was already done by the time I started using it.
