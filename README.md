# EconomicData.co (under construction)

[![Build Status](https://travis-ci.org/joshweir/economicdata.co.svg?branch=master)](https://travis-ci.org/joshweir/economicdata.co) [![Coverage Status](https://coveralls.io/repos/github/joshweir/economicdata.co/badge.svg?branch=master)](https://coveralls.io/github/joshweir/economicdata.co?branch=master)


## Setup

### Development

1. Install MongoDB 3.6
2. Install Node.js
3. `git clone https://github.com/joshweir/economicdata.co && cd economicdata.co`
4. `npm install`
5. On linux, setup environment: `./env_setup.sh development`
6. Create MongoDB tables: `./node_modules/.bin/mm`
7. Seed some test data: `./node_modules/node-mongo-seeds/bin/seed`

## License

MIT
