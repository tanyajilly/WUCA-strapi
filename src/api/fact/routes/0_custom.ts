module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/facts/:slug',
            handler: 'fact.findOne',
            config: {
                
            },
        }
    ]
}