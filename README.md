# 1Vote

1Vote is a full-stack web app for creating and sharing live web polls. It features a lightning-fast front end with data visualizations, as well as an available full standalone API for leveraging the site as a back-end service.

I created 1Vote as part of the [freeCodeCamp][fcc] online self-study program.

## Tech

Technologies used include:

  - React & Redux
  - MongoDB / Mongoose
  - Express.js
  - Node.js
  - D3
  - Webpack with Babel and Sass loaders
  - Passport (forthcoming)

## API
### Get all polls:
```
GET /api/getPolls
```

### Add a poll:
```
POST /api/addPoll
```
Body should include the following JSON format:
{
    "poll":
    {
        "title": "What's your zodiac sign?",
        "choices": [{
            "title": "Wut"
        }, {
            "title": "Virgo"
        }],
        "owner": "Brap"
    }
}

### Add a single vote to a poll's choice:
```
POST /api/addVote
```
Body should include the following JSON format:
{
        "pollID": "5738828058fd5b023a0757fe",
        "choiceTitle": "Choice 3"
}
### Delete a poll:
```
DELETE /api/deletePoll/[pollID]
```


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [fcc]: <http://freecodecamp.com>
