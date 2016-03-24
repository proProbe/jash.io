import fs from 'fs';
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

let app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

(async () => {

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

  app.listen(3000, () => console.log('Listening on port 3000'));
})();
