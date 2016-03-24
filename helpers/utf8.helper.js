class UTF8Helper {
  constructor() {
  }

  encode(s) {
    return unescape( encodeURIComponent(s) );
  }

  decode(s) {
    return decodeURIComponent( escape(s) );
  }
}

export default UTF8Helper;
