const path = require('path');
const fs = require('fs');

let file = process.env.CONFIG_OVERRIDE_FILE || '.override.json';

if (!path.isAbsolute(file)) {
    file = path.join(__dirname, '..', file);
}

if (fs.existsSync(file)) {
    const config = require('config');
    const override = require(file);
    config.util.extendDeep(config, override);
}
