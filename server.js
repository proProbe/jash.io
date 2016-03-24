import express from 'express';
import schema from './data/schema';
import morgan from 'morgan';
import GraphQLHTTP from 'express-graphql';

let app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/graphql', GraphQLHTTP({
  schema: schema,
  graphiql: true
}))


app.listen(3000, () => console.log('Listening on port 3000'));
