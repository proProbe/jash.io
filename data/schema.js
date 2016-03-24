import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import WebScraper from '../api/WebScraper';
const ws = new WebScraper();

let japaneseObjectType = new GraphQLObjectType({
  name: "Japanese",
  fields: () => ({
    furigana: { type: GraphQLString },
    kanji: { type: GraphQLString }
  })
});

let englishObjectType = new GraphQLObjectType({
  name: "English",
  fields: () => ({
    word: { type: GraphQLString }
  })
});

let scrapedDataType = new GraphQLObjectType({
  name: "ScrapedData",
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
      data: {
        type: scrapedDataType,
        resolve: () => ws.scrape('japanese')
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
