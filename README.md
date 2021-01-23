# Translator API


# Installation


```sh
git clone https://github.com/LobRockyl/translator_api.git # or clone your own fork
cd translator_api
npm install
npm start
```


For the actual translation, I have used a third party google translate api repo: https://github.com/vitalets/google-translate-api
The source and target language is definable via the API.


The Request is made as given below: 

Type: GET
{


    "from":"en",
    
    
    "to": "hi",
    
    
    "text":"How are you"
    
    
}

And the response will simply return this:


{


    "text": "क्या हाल है"
    
    
}


In addition, I am storing translations in database(SQL database), in order to avoid repeated hits to the translation API. 

The database architecture is simple as one table having 4 columns


### input_text  input_lang   output_text  output_lang

input_text : the text we want to translate


input_lang : the language the input text is in


output_text: the translated text


output_lang: the language we want to convert the input text in

# Smart Caching


This means we assume that if a user translates a text into Kannada, he is likely to also translate the same text to Hindi. Therefore we want to not only request Kannada from the external service but also other languages like Hindi, Tamil, etc. and store it in our cache. So for every request we translate to the following languages(some languages were trimmed down for reducing number of requests due to google translate limitation):


{ 
    'ar': 'Arabic',
    'bn': 'Bengali',
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'gu': 'Gujarati',
    'hi': 'Hindi',
    'it': 'Italian',
    'ja': 'Japanese',
    'kn': 'Kannada',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'te': 'Telugu',
    'ur': 'Urdu',
    
}

Google translate API (in the free tier) gives error 429 if too many requests are made from a single API in a particular time span so I have used a proxy tunnel using a free proxy from the web. 


The smart caching function runs asynchronously so that the API response time is not affected. 


Finally the API was tested in Postman and verified
