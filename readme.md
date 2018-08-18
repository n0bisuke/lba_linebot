
## config.js

```
module.exports = {
    channelSecret: '',
    channelAccessToken: ''
};
```

## チートシート

### now

```
now secret add LBABOT_SECRET xxx
now secret add LBABOT_TOKEN xxxx
```

```
now -e LINE_SECRET=@lbabot_secret -e LINE_TOKEN=@lbabot_token --public
```

### Heroku

```
heroku config:set LINE_SECRET=
heroku config:set LINE_TOKEN=
```