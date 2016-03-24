import cheerio from 'cheerio';
import request from 'request-promise';

class WebScraper {
  constructor(baseURL = "http://jisho.org/search/") {
    this.baseURL = baseURL;
  }

  scrape(word) {
    return request(this.baseURL + word)
      .then((res) => {
        const $ = cheerio.load(res);

        let english = this._scrapeEnglish($);
        let japanese = this._scrapeJapanese($);
        let json = { english: english, japanese: japanese };

        return json
      })
      .catch((err) => {
        return err;
      })
  }

  _scrapeJapanese($) {

    let japanese = { furigana: 'temp', kanji: 'temp' };

    $('#primary > div.exact_block > div:nth-child(2) > div.concept_light-wrapper.columns.zero-padding > div.concept_light-readings.japanese.japanese_gothic > div').filter(function() {
      let data = $(this);
      japanese.furigana = data.find('span.furigana > span.kanji-4-up.kanji').text();
      japanese.kanji = data.find('span.text').text();
    });

    return japanese;
  }

  _scrapeEnglish($) {

    let english = { word: 'nothing yet!' };
    $('#primary > div.exact_block > div:nth-child(2) > div.concept_light-meanings.medium-9.columns > div > div:nth-child(2) > div').filter(function() {
      let data = $(this);
      english.word = data.find('span.meaning-meaning').text();
    });

    return english;
  }
}

export default WebScraper;
