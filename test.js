var SSH = require('simple-ssh');

var ssh = new SSH({
    host: '10.0.1.130',
    username: 'omkar',
    password: 'northstar123456'
});

ssh.exec('dir', {
    out: function(stdout) {
        console.log(stdout);
    }
}).start();