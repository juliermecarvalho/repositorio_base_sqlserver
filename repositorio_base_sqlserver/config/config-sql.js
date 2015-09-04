

module.exports = function() {
    return {
        user: 'sa',
        password: 'erfrjss',
        server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
        database: 'SiteQCartorio',
   
        options: {
            encrypt: false // Use this if you're on Windows Azure 
        }
    }
};