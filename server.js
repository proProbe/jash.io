import fs from 'fs';
import path from 'path';
import httpProxy from 'http-proxy';
import express from 'express';
import schema from './data/schema';
import morgan from 'morgan';
import GraphQLHTTP from 'express-graphql';
import {
  graphql
} from 'graphql';
import {
  introspectionQuery
} from 'graphql/utilities';

let isProduction = process.env.NODE_ENV === 'production';
let port = isProduction ? process.env.PORT : 3000;
let publicPath = path.resolve(__dirname, 'public');

let app = express();
app.use(morgan('dev'));
app.use(express.static(publicPath));

(async() => {
  try {

    // We only want to run the workflow when not in production
    if (!isProduction) {
      let proxy = httpProxy.createProxyServer();


      // remove any old residue bundles in build folder
      try {
        console.log('Removing old bundles in build');
        fs.unlinkSync('./public/build/bundle.js');
        fs.unlinkSync('./public/build/bundle.js.map');
      } catch (e) {
        // throw e;
        console.error('Files did not exist!\n');
      }

    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    let bundler = require('./server/bundler.js');
    bundler();

      // Any requests to localhost:3000/build is proxied
      // to webpack-dev-server
      app.all('/build/*', function(req, res) {
        // console.log(req);
        proxy.web(req, res, {
          target: 'http://localhost:8080'
        });
      });

      // It is important to catch any errors from the proxy or the
      // server will crash. An example of this is connecting to the
      // server when webpack is bundling
      proxy.on('error', function(e) {
        console.log('Could not connect to proxy, please try again...');
      });

    }

    app.use('/graphql', GraphQLHTTP({
      schema: schema,
      graphiql: true
    }));

    // Generate schema.json for now
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err;
      console.log("JSON schema created");
    })

    app.listen(port, () => console.log('Listening on port ' + port));

  } catch (e) {
    console.log(e);
  }
})();
