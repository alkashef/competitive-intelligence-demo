const approvedReview = $('Fetch Approved Review').first().json;
const currentIndex = $json;

if (!approvedReview.content) {
  throw new Error('Approved review.html content is missing.');
}

if (!currentIndex.sha) {
  throw new Error('Current index.html SHA is missing.');
}

return {
  json: {
    github_body: {
      message: 'Publish approved dashboard',
      content: approvedReview.content.replace(/\s/g, ''),
      sha: currentIndex.sha
    }
  }
};
