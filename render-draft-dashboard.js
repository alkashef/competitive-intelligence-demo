const researchData = $('Parse Research JSON').first().json;
const dashboardTemplate = $json.dashboard_template ?? $json.data;

if (!dashboardTemplate) {
  throw new Error('Dashboard template is missing.');
}

if (!dashboardTemplate.includes('__DASHBOARD_DATA__')) {
  throw new Error('Dashboard placeholder not found.');
}

const safeJson = JSON.stringify(researchData)
  .replace(/</g, '\\u003c');

const draftHtml = dashboardTemplate.replace(
  '__DASHBOARD_DATA__',
  safeJson
);

return {
  json: {
    draft_html: draftHtml
  }
};
