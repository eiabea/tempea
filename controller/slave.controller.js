const request = require('request');
const {SLAVE_HOST, SLAVE_PORT, SLAVE_ENDPOINT} = process.env;

module.exports = (parentLogger) => {
  const log = parentLogger.child({controller: 'slave'});

  const getData = async()=>{
    return new Promise((resolve, reject)=>{
      request(`http://${SLAVE_HOST}:${SLAVE_PORT}${SLAVE_ENDPOINT}`, (error, response, body) => {
        if (error) {
          log.error({error}, 'Error getting data from slave ' + SLAVE_HOST);
          return reject(error);
        }
        log.trace({body}, 'Slavedata');
        return resolve(JSON.parse(body));
      });
    });
  };

  return {
    getData
  };
};