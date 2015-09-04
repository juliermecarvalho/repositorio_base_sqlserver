

module.exports = function (parans) {

    return {
        insertCommand: function(obj) {
            var property,
                command = 'INSERT INTO ' + parans.table + ' (';

            for (property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] !== 'function' && typeof obj[property] !== 'object' && property !== 'id') {
                        command += property + ',';
                    }
                }
            }

            command += ')';
            command = command.replace(',)', ') VALUES (');

            for (property in obj) {
                if (obj.hasOwnProperty(property)) {

                    if (typeof obj[property] !== 'function' && typeof obj[property] !== 'object' && property !== 'id') {

                        if (typeof obj[property] === 'number') {
                            command += obj[property] + ',';

                        } else if (typeof obj[property] === 'boolean') {
                            var valor = obj[property] ? 1 : 0;
                            command += valor + ',';

                        } else {
                            command += "'" + obj[property] + "',";
                        }
                    }


                }
            }

            command += ')';
            command = command.replace(',)', ')');
            return command;
        },

        updateCommand: function(obj) {
            var property,
                command = 'UPDATE ' + parans.table + ' set ';

            for (property in obj) {
                if (obj.hasOwnProperty(property)) {

                    if (typeof obj[property] !== 'function' && typeof obj[property] !== 'object' && property.toLowerCase() !== 'id'.toLowerCase()) {

                        if (typeof obj[property] === 'number') {
                            command += property + ' = ' + obj[property] + ',';

                        } else if (typeof obj[property] === 'boolean') {
                            var valor = obj[property] ? 1 : 0;
                            command += property + ' = ' + valor + ',';

                        } else {
                            command += property + ' = ' + "'" + obj[property] + "',";
                        }
                    }
                }
            }

            command += ')';
            command = command.replace(',)', '');

            command += ' where id = ' + obj.id;
            return command;
        },

        whereCommand: function(where) {
            var property,
                command = ' where ';

            if (!where) return '';
            if (typeof where === 'string') return command + where;

            for (property in where) {
                if (where.hasOwnProperty(property)) {

                    if (typeof where[property] !== 'function' && typeof where[property] !== 'object') {

                        if (typeof where[property] === 'number') {
                            command += property + ' = ' + where[property] + ' and ';

                        } else if (typeof where[property] === 'boolean') {
                            var valor = where[property] ? 1 : 0;
                            command += property + ' = ' + valor + ' and ';

                        } else {
                            command += property + ' = ' + "'" + where[property] + "' and ";
                        }
                    }
                }
            }

            command += ')';
            command = command.replace('and )', '');
            return command;
        },

        toCamelCase: function(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        },

        camelCasePropertyNamesContractResolver: function(recordset) {
            var self = this, key, newKey, toReturn = [], i = 0, obj, newObj;

            for (i; i < recordset.length; i++) {
                obj = recordset[i];
                newObj = {};
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newKey = self.toCamelCase(key);

                        newObj[newKey] = obj[key];
                    }
                }
                toReturn.push(newObj);
            }

            return toReturn;
        }
    }
}