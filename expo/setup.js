const fs = require('fs');
const path = require('path');

fs.renameSync(path.join(__dirname, 'node_modules/expo-crypto'), path.join(__dirname, 'node_modules/crypto'));
process.exit();