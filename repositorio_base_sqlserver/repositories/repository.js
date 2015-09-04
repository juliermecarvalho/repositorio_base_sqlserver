
module.exports = function(parans) {
    var db = require('mssql');
    var config = require(__base + '/config/config-sql')();
    var commad = require(__base + '/repositories/command')(parans.table);
    var promise = global.Promise;

    promise.prototype['sucess'] = promise.prototype.then;
    promise.prototype['error'] = promise.prototype.catch;

    return {
        __promise: promise,

        query: function (command) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                db.connect(config, function (err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            recordset = commad.camelCasePropertyNamesContractResolver(recordset);
                            resolve(recordset);
                        }

                    });
                });
            });
        },

        all: function () {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                db.connect(config, function (err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    var command = 'select * from ' + parans.table;
                    if (err) reject(err);
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            recordset = commad.camelCasePropertyNamesContractResolver(recordset);
                            resolve(recordset);
                        }
                    });
                });
            });
        },
        
        findAll: function (where) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                db.connect(config, function (err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    var command = 'select * from ' + parans.table + commad.whereCommand(where);
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            recordset = commad.camelCasePropertyNamesContractResolver(recordset);
                            resolve(recordset);
                        }
                    });
                });
            });
        },

        findById: function (id) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                db.connect(config, function(err) {
                    if (err) reject(err);
                    
                    var request = new db.Request();
                    var command = 'select * from ' + parans.table + commad.whereCommand(id);
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            recordset = commad.camelCasePropertyNamesContractResolver(recordset);
                            resolve(recordset[0]);
                        }
                    });
                });
            });
        },

        remove: function (id) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                db.connect(config, function(err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    var command = 'delete from ' + parans.table + +commad.whereCommand(id);
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(recordset);
                        }
                    });
                });
            });
        },

        add: function (obj) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                var command = commad.insertCommand(obj);
                db.connect(config, function(err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(recordset);
                        }
                    });
                });
            });
        },
        
        update: function(obj) {
            var self = this;
            return new self.__promise(function(resolve, reject) {
                var command = commad.updateCommand(obj);
                db.connect(config, function(err) {
                    if (err) reject(err);
                    var request = new db.Request();
                    request.query(command, function(err, recordset) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(recordset);
                        }
                    });
                });
            });
        },
        
        addOrUpdate : function (obj) {
            var self = this;

            if (obj.id) {
               return self.update(obj);
            } else {
               return self.add(obj);                
            }
        }
    };
};