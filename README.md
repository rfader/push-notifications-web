## Server Code:

```
webPush.setGCMAPIKey('SERVER API KEY');

router.route('/push/web/register')
.post((req, res) => {
    console.log('register:', req.body);
    setTimeout(() => {
        webPush.sendNotification({
            endpoint: req.body.endpoint,
            keys: {
                p256dh: req.body.key,
                auth: req.body.authSecret
            }
        }, 'payload')
        .catch((error) => {
            console.log(error);
        });
    }, 2000);
    res.status(201).end();
});
```
