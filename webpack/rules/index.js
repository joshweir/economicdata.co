const image = require('./image');
const javascript = require('./javascript');
const css = require('./css');
const cssVendor = require('./css-vendor');

module.exports = ({ production = false, browser = false } = {}) => (
  [
    javascript({ production, browser }),
    cssVendor({ production, browser }),
    css({ production, browser }),
    image()
  ]
);
