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

let translationsType = new GraphQLObjectType({
  name: "Translations",
  fields: () => ({
    english: {
      type: englishObjectType
    },
    japanese: {
      // type: new GraphQLList(japaneseObjectType)
      type: japaneseObjectType
    }
  })
})

let translationType = new GraphQLObjectType({
  name: "Translation",
  fields: () => ({
    keyword: { type: GraphQLString },
    translations: { type: new GraphQLList(translationsType) }
  })
})

let storeType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    translation: {
      type: translationType,
      args: { word: { type: GraphQLString }},
      resolve: (_, {word}) => {
          return scraper.scrape( utf8.encode(word.toLowerCase()) )
      }
    }
  })
})

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        resolve: () => store
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
