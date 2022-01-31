const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        url: 'mongodb://localhost/music'
    },
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET
    }
};