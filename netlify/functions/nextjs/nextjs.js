const { builder } = require('@netlify/functions');

async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>L'affaire - Site d'affiliation</title>
          <script>
            window.location.href = "/";
          </script>
        </head>
        <body>
          <p>Redirection en cours...</p>
        </body>
      </html>
    `
  };
}

exports.handler = builder(handler);
