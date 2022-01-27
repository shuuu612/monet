/* const { client } = require('../utils/microcms'); */
import axios from 'axios';
/* const fetch = require("node-fetch");  */

// eslint-disable-next-line require-await
exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }
  /* const { data } = await axios
    .get(
      `"https://suugo.microcms.io/api/v1/site/${id}"`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": "07e9c553869f4ee8bb0569648d659f355c69",
        },
        body: JSON.stringify({"visit":"111",}),
      }
    )
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((error) => ({ error }));
    return data */

  const result = await axios.patch(
    `"https://suugo.microcms.io/api/v1/site/ukb4lg2e-l"`,JSON.stringify({ "visit": "111" }),
    {
      /* method: "PATCH", */
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": "07e9c553869f4ee8bb0569648d659f355c69",
      },
      /* body: JSON.stringify({ "visit": "111" }), */
    }
  );
  console.log(await result.json());

  /* return client
    .get({
      method: 'PATCH',
      endpoint: 'site',
      contentId: id,
      body: {"visit": 111},
    })
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((error) => ({
      statusCode: 400,
      body: String(error),
    })); */
};
