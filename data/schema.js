import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import WebScraper from '../api/WebScraper';
import UTF8Helper from '../helpers/utf8.helper';
const scraper = new WebScraper();
const utf8 = new UTF8Helper();

let store = {};

let japaneseObjectType = new GraphQLObjectType({
  name: "Japanese",
  fields: () => ({
    furigana: { type: GraphQLString },
    kanji: { type: GraphQLString },
    type: { type: GraphQLString },
    level: { type: GraphQLString }
  })
});

let englishObjectType = new GraphQLObjectType({
  name: "English",
  fields: () => ({
    meaning: { type: GraphQLString },
    tags: { type: GraphQLString },
    number: { type: GraphQLInt }
  })
});

let storeType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    english: {
      type: englishObjectType
    },
    japanese: {
      type: japaneseObjectType
    }
  })
})

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        args: { word: { type: GraphQLString }},
        resolve: (_, {word}) => scraper.scrape( utf8.encode(word) )
      }
    })
  }),
  // mutations
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => ++counter
      }
    })
  })

});

export default schema;
