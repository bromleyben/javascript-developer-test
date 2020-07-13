const { httpGet } = require('./mock-http-interface');

/* 
  Authors Note:

  I have prioritised readability in this code.

  There are a number of places where it could be written more concisely, however this would
  jeopardise legibility.

  I have added DocStrings as this is my standard practice. It enhances the quality of life for developers and makes the module easier to integrate with future applications.

  Thank you for considering my application!

  Ben Bromley
/*

/**
 * Formats result from Arnie Quote API.
 * @param {Object} res 
 * @returns {Object} Formatted Arnie Quote
 */
const formatArnieQuote = (res) => {
  // Format the key and body of the response
  const key = res.status === 200 ? 'Arnie Quote' : 'FAILURE',
        body = JSON.parse(res.body);

  return {
    [key]: body.message
  }
}

/**
 * Gets a single Arnie Quote. Just one.
 * @param {string} url 
 * @returns {Promise<Object>} 
 */
const getArnieQuote = async (url) => {
  // Perform GET Request
  const result = await httpGet(url);

  // Return formatted result
  return formatArnieQuote(result);
};

/**
 * Fetches Arnie quotes from a list of urls. Nice.
 * @param {Array<String>} urls
 */
const getArnieQuotes = async (urls) => {
  const requests = [];

  // Perform all requests in parallel so they can resolve asap.
  urls.forEach(url => {
    requests.push(getArnieQuote(url))
  });
  
  // Return results as a list once all have completed
  return await Promise.all(requests);
};

module.exports = {
  getArnieQuotes,
};
