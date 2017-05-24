## Server Code:

webPush.setGCMAPIKey('SERVER API KEY');

router.route('/push/web/register')
.post((req, res) => {
    console.log('register:', req.body);
    setTimeout(() => {
        webPush.sendNotification({
            endpoint: req.body.endpoint,
            TTL: 1
        })
        .catch((error) => {
            console.log(error);
        });
    }, 5000);
    res.status(201).end();
});

