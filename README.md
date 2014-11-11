# THE MEAN SHOP

THE MEAN SHOP is a small demonstration project I built which is based on the young and new MEAN stack framework [mean.io](http://mean.io/#!/). It utilizes RESTful calls to interact with backend database which is powered by mongodb. 

MEAN is a boilerplate that provides a nice starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. It is designed to give you a quick and organized way to start developing MEAN based web apps with useful modules like Mongoose and Passport pre-bundled and configured. 

## Demo
The demo can be accessed here at [mean shop](http://quiet-taiga-8190.herokuapp.com/).

To explore the demo, please:
1. Click on "Register" link on the upper right of the screen.
2. Enter your username and password to register
3. Login to explore
4. You may view products, add/delete product to/from cart, checkout with billing information or view your order history.

## Up and running locally

### Prerequisites
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

### Run the app
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

## More about the app
### Key features
* Basic role based anthentication. Users can register and login to the app. 
* Basic shopping cart functionality. Browse products, add/delete to/from cart, update shipping/billing information, keep track of the order history.
* Admin also has a feature as adding more products in the front end app. Currently this is pre-defined in the database file, so if you download the source code and running the app locally, you need to register an admin user and assign 'admin' to its roles.

### File structure
This app is build upon the mean.io framework. The shop functionality is mainly under the package 'products' if you view the source code.
```
--server
      |---config
      |---controllers
      |---models (defining the models for this app. including schema of user, product, order, billing address, shipping address etc.)
      |---routes
      |---views
--public
      |---auth
      |---system
--packages
      |---packages
           |---products
                 |---app.js (configure the menu)
                 |---server
                        |---controllers (handles the RESTful calls)
                        |---routes (handles routing of the RESTful calls in the controleers)
                 |---public
                        |---assets (product images under img subfolder)
                        |---controllers (main logic for the angular controllers)
                        |---routes 
                        |---services (Products service used for the products REST endpoint)
                        |---views (html files of the pages: order, cart, view etc.)
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

## License
[The MIT License](http://opensource.org/licenses/MIT)
