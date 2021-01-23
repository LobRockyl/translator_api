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

This is the main task with normal caching and no smart precaching.  
