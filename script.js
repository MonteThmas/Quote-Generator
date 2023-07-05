const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

// Show the loader
function showLoadingSpin() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Stop to show the loader
function stopLoadingSpin() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new quote
function newQuote() {
    showLoadingSpin();
    // Pick a random quote from apiQuote
    let quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    stopLoadingSpin();
}

async function getQuotes() {
    showLoadingSpin();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch(error) {
        // handling error
    }
}

function tweetQuote() {
    const tweet = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweet, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuotes);

getQuotes();