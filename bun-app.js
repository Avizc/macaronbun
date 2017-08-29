var TwitterPackage = require('twitter');
require('dotenv').config()
 
// PLACE KEYS INSIDE OF .ENV FILE HUZZAH
// THIS IS WHAT ALLOWS US TO USE THE TWITTER API TEHE
var secret = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
}
 
var Twitter = new TwitterPackage(secret);
 
var query = "sweet potato";
Twitter.get('search/tweets', {q: query, count: 1, lang:"en"}, function(error, tweets, response) {
    
   var tweet_list = tweets['statuses'];
    
   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        } 
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " Sweet potatoes are delicious, praise sweet potatoes!";
        var tweet_id = tweet_list[i].id_str
 
        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!")
            });
        }
 
        catch(err) {
            console.log(err);
        }
   }
});
