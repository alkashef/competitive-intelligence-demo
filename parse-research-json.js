const raw = $json.text;

if (!raw) {
  throw new Error('No text field found in model output.');
}

const cleaned = raw
  .trim()
  .replace(/^```json\s*/i, '')
  .replace(/^```\s*/i, '')
  .replace(/\s*```$/, '');

let parsed;

try {
  parsed = JSON.parse(cleaned);
} catch (error) {
  throw new Error(
    `Model output is not valid JSON: ${error.message}`
  );
}

return {
  json: parsed
};
