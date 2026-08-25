const draftHtml = $('Render Draft Dashboard').first().json.draft_html;

if (!draftHtml) {
  throw new Error('draft_html is missing.');
}

const body = {
  message: 'Update review dashboard',
  content: Buffer.from(draftHtml, 'utf8').toString('base64')
};

// On later runs GitHub returns a SHA.
// GitHub requires it when overwriting the file.
if ($json.sha) {
  body.sha = $json.sha;
}

return {
  json: {
    github_body: body
  }
};
