import cheerio from 'cheerio';
import request from 'request-promise';
import _ from 'lodash';

class WebScraper {
  constructor(baseURL = "http://jisho.org/search/") {
    this.baseURL = baseURL;
  }

  scrape(word) {
    console.log(word);
    return request(this.baseURL + word)
      .then((res) => {
        const $ = cheerio.load(res, {
          normalizeWhitespace: true,
          // xmlMode: true
        });

        let english = this._scrapeEnglish($);
        let japanese = this._scrapeJapanese($);
        let translations = _.zipWith(english, japanese, (e, j) => {
          return {
            english: e,
            japanese: j,
          }
        })

        let json = {
          keyword: word,
          translations: translations
        };
        return json
      })
      .catch((err) => {
        return err;
      })
  }

  _scrapeJapanese($) {
    let japArr = [];
    let japanese = {
      furigana: 'Furigana',
      kanji: 'Kanji',
      type: 'Type',
      level: 'Level'
    };

    $('#primary > div.exact_block div.concept_light-wrapper.columns.zero-padding').filter(function(i, el) {
      let jap = {
        furigana: 'Furigana',
        kanji: 'Kanji',
        type: 'Type',
        level: 'Level'
      };
      let data = $(this);
      jap.furigana = data.find('span.furigana').first().text();
      jap.kanji = data.find('span.text').first().text();
      jap.type = data.find('span.concept_light-common').first().text();
      jap.level = data.find('span.concept_light-tag > a').first().text();
      japArr.push(jap);
    });

    // if the arr is empty, init it
    if (japArr.length === 0) {
      japArr.push(japanese);
    }

    return japArr;
    // return japanese;
  }

  _scrapeEnglish($) {
    let engArr = [];
    let english = {
      meaning: 'Meaning',
      tags: 'Tags',
      number: -1,
    };
    $('#primary > div.exact_block div.concept_light-meanings.medium-9.columns > div.meanings-wrapper').filter(function(i, el) {
      let eng = {
        meaning: 'Meaning',
        tags: 'Tags',
        number: -1,
      };
      let data = $(this);
      eng.meaning = data.find('.meaning-wrapper .meaning-meaning').first().text();
      eng.number = data.find('.meaning-wrapper .meaning-definition-section_divider').first().text();
      eng.tags = data.find('.meaning-tags').first().text();
      engArr.push(eng);
    });

    if (engArr.length === 0) {
      engArr.push(english);
    }
    return engArr;
    // return english;
  }
}

export default WebScraper;
