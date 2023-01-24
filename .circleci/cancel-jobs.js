const request = require('request');

// Get jobs in the current work flow
request({
  method: 'GET',
  url: `https://circleci.com/api/v2/workflow/${process.env.CIRCLE_WORKFLOW_ID}/job?circle-token=${process.env.CIRCLE_TOKEN}`
}, (error, _response, body) => {
  if (error) {
    throw new Error(error);
  }

  try {
    const json = JSON.parse(body);
    for (const item of json?.items || {}) {

      console.log(`Cancelling job ${item.name} [${item.job_number}]`)
      request({
        method: 'POST',
        url: `https://circleci.com/api/v2/project/gh/mozilla/fxa/job/${item.job_number}/cancel?circle-token=${process.env.CIRCLE_TOKEN}`
      }, (error, response) => {
        if (error) {
          console.log("Error cancelling job!", item.job_number, item.name)
          throw new Error(error);
        }

        console.log(`Cancelled ${item.job_number} - ${response.statusCode}`)
      })
    }
  }
  catch (err) {
    console.log("Error processing jobs list!", body)
    throw err;
  }
});
