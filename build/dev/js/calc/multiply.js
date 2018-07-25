'use strict';

require('add.js');

var substract = function substract() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var result = x;
    for (var index = 0; index <= y; index++) {
        result += y;
    }
    return result;
};