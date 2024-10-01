const axios = require('axios');
const {JOKE_API_URL} = require('./constants')


// function that gets the joke
async function getJoke(URL) {
    try {
        const response = await axios.get(URL);
        return response
      } catch (error) {
        console.error('Error getting joke:', error.message);
    }
}

function formatURL(input) {
    // format the url for the joke input
    var request = '';

        // add category
    request = JOKE_API_URL + input.category

        // add the blacklist
    request = request + "?blacklistFlags=religious"

        // add the joketype if not both
    if (input.joketype !== "both"){
        request = request + "&type=" + input.joketype
    }
        // add any keywords
    if (input.contains.trim().length !== 0){
        request = request + "&contains=" + input.contains.trim()
    }

    const full_url = encodeURI(request)

    return full_url
    
}



module.exports = {
    getJoke,
    formatURL
};