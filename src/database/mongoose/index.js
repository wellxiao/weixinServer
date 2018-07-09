const Promise = require('bluebird');
const internal = require('./internal');
const external = require('./external');

module.exports = {
    internal,
    external,
    up() {
        return Promise.all([internal.up(), external.up()]);
    },
    down() {
        return Promise.all([internal.down(), external.down()]);
    }
};
