# THE MEAN SHOP

THE MEAN SHOP is a small demonstration project I built which is based on the young and new MEAN stack framework [mean.io](http://mean.io/#!/). It utilizes RESTful calls to interact with backend database which is powered by mongodb.

MEAN is a boilerplate that provides a nice starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. It is designed to give you a quick and organized way to start developing MEAN based web apps with useful modules like Mongoose and Passport pre-bundled and configured. 

## Demo
The demo can be accessed here at [mean shop](http://quiet-taiga-8190.herokuapp.com/).

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://docs.mongodb.org/manual/installation/) - Make sure `mongod` is running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manage; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:

```
$ npm install -g bower
```

### Optional [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```
$ npm install -g grunt-cli
```

## Up and running locally
* Download the source code from GitHub.
```
$ mkdir meanshop
$ cd meanshop
$ git clone git://github.com/chenyaoli19/meanshop.git
```
* Make sure all dependencies are installed. Cd to your project's root directory, and install all node modules needed.
```
$ npm install
```
* Make sure you followed the prerequisites and installed mongodb. If your system PATH variable includes the location of the mongod binary and if you use the default data directory (i.e., /data/db), simply enter mongod at the system prompt:
```
$ mongod
```
* Run the app. And open your browser type in localhost:3000. Now you will see the app up and running! 
```
$ grunt
```

## Configuration
All configuration is specified in the [server/config](server/config/) folder, particularly the [config.js](server/config/config.js) file and the [env](server/config/env/) files. Here you will need to specify your application name, database name, and hook up any social app keys if you want integration with Twitter, Facebook, GitHub, or Google.

### Environmental Settings

There are three environments provided by default: __development__, __test__, and __production__.

Each of these environments has the following configuration options:

 * __db__ - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
  * __clientID__
  * __clientSecret__
  * __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

    $ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

    $ NODE_ENV=test node server

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## Heroku Quick Deployment
Before you start make sure you have the [Heroku toolbelt](<https://toolbelt.heroku.com/")
installed and an accessible MongoDB instance - you can try [MongoHQ](http://www.mongohq.com/)
which has an easy setup).

Add the db string to the production env in server/config/env/production.js.

```
git init
git add .
git commit -m "initial version"
heroku apps:create
heroku config:add NODE_ENV=production
heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
git push heroku master
heroku config:set NODE_ENV=production
```

## Reference
  * [Node.js, MongoDB, and AngularJS Web Development by Brad Dayley](http://www.amazon.com/Node-js-MongoDB-AngularJS-Development-Developers/dp/0321995783/ref=sr_1_1?ie=UTF8&qid=1404013795&sr=8-1&keywords=Brad+Dayley)
  * [mean.io](http://mean.io/#!/docs)
  * [mean.io blog](http://blog.mean.io/)

## License
[The MIT License](http://opensource.org/licenses/MIT)
