/*******************************
GLOBAL VARIABLES FOR APP
*******************************/

var quote = document.getElementById('quote');
var welcomeAffirmationWords = ['loved', 'cherished', 'awesome', 'amazing', 'a star', 'powerful',
    'brilliant', 'super', 'one of a kind', 'tops in my book', 'the best', 'wonderful', 'a genius',
    'fantastic', 'a superstar', 'courageous', 'brave', 'charming', 'fearless', 'adored', 'appreciated',
    'blissful', 'bold', 'cheerful', 'confident', 'creative', 'decisive', 'devine', 'dynamic', 'empowered',
    'energized', 'enlightened', 'enthusiastic', 'exciting', 'exquisite', 'extraordinary', 'exuberant',
    'fabulous', 'focused', 'free', 'fun', 'glorious', 'glowing', 'graceful', 'gracious', 'grateful', 'happy',
    'harmonious', 'hopeful', 'inspired', 'invigorated', 'irresistible', 'jazzed', 'joyful', 'joyous', 'jubilant',
    'kind', 'light', 'loveable', 'loving', 'magical', 'magnificent', 'marvelous', 'miraculous', 'noble', 'optimistic',
    'passionate', 'peaceful', 'playful', 'positive', 'precious', 'radiant', 'refreshed', 'renewed', 'resilient',
    'sensational', 'serene', 'spectacular', 'strong', 'terrific', 'trusting', 'unlimited', 'limitless', 'uplifted',
    'valuable', 'vibrant', 'vivacious', 'warm', 'welcomed', 'whole', 'wise', 'worthy', 'zestful'];
var welcomeGreetingWords = ['counted your blessings', 'smiled', 'loved someone', 'loved yourself', 'breathed deeply',
    'read His Word', 'meditated', 'blessed someone', 'encouraged someone', 'hugged someone',
    'enjoyed your life', 'treated yourself well', 'been at peace'];
var displayQuote = false;
var displayImage = false;


/*******************************
APP BUTTONS AND CLICK EVENTS
*******************************/

document.querySelector('.btn-love').addEventListener('click', btnLoveAndFaith);
document.querySelector('.btn-inspiration').addEventListener('click', btnBible);
// document.querySelector('#images').addEventListener('click', quoteImages);


/*******************************
RANDOMLY SELECTS AND DISPLAYS A WELCOME AFFIRMATION & WELCOME GREETING
*******************************/

function welcomeAffirmation() {
    var myRandom =  Math.floor(Math.random() * welcomeAffirmationWords.length);
    document.getElementById('welcome').innerHTML = welcomeAffirmationWords[myRandom];
}
welcomeAffirmation();

function welcomeGreeting() {
    var myRandom =  Math.floor(Math.random() * welcomeGreetingWords.length);
    document.getElementById('greeting').innerHTML = welcomeGreetingWords[myRandom];
}
welcomeGreeting();


/*******************************
RANDOMLY SELECTS AND DISPLAYS A TEXT QUOTE FROM DATABASE
*******************************/


function btnBible() {
    // var category = '&category=love';
    var ourRequest = new XMLHttpRequest(); //opens new XML request
    ourRequest.open('POST', 'https://quotes.rest/quote/search.json?author=bible&' + clave); //gets JSON data

    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        // console.log(ourData.contents.quote);
        renderHTML(ourData);
    };
    ourRequest.send();
}

function btnLoveAndFaith() {
    var category = '&category=love&faith';
    var ourRequest = new XMLHttpRequest(); //opens new XML request
    ourRequest.open('POST', 'https://quotes.rest/quote/search.json?' + clave + category); //gets JSON data

    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        // console.log(ourData.contents.quote);
        renderHTML(ourData);
    };
    ourRequest.send();
}

function renderHTML(data) {
    displayQuote = true;

    if (displayImage === true) {
        document.getElementById('displayImage').innerHTML = "";
    }

    if (data.contents.author !== null) {
        var htmlString = '"' + data.contents.quote + '"' + '<br><br>' +
            '-- ' + data.contents.author + ' --';
    } else {
        data.contents.author = '(Anonymous)';
        var htmlString = '"' + data.contents.quote + '"' + '<br><br>' +
            '-- ' + data.contents.author + ' --';
    }

    //document.getElementById('quote').textContent = htmlString; -> old way to display the string in text format
    document.getElementById('quote').innerHTML = htmlString;

}



/*******************************
RANDOMLY SELECTS AND DISPLAYS AN IMAGE PICTURE FROM DATABASE
*******************************/


function quoteImages() {
    var ourRequest = new XMLHttpRequest(); //opens new XML request
    ourRequest.open('POST', 'https://quotes.rest/quote/image/search.json?privae=false&' + clave); //gets JSON data

    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        // console.log(ourData.contents.qimage.download_uri);
        renderImage(ourData);
    };
    ourRequest.send();
}

function renderImage(data) {
    displayImage = true;

    if (displayQuote === true) {
        document.getElementById('quote').textContent = "";
    }

    var quoteImage = '<img src="' + data.contents.qimage.download_uri + '"/>';

    document.getElementById('displayImage').innerHTML = quoteImage;


}

var clave = 'api_key=VjaZA47W4L9HK0_AQnHNPweF';
