const configText = $json.config_text;
let prompt = $json.prompt_template;

const config = {};

for (const rawLine of configText.split('\n')) {
  const line = rawLine.trim();

  if (!line || line.startsWith('[') || line.startsWith('#') || line.startsWith(';')) {
    continue;
  }

  const separator = line.indexOf('=');
  if (separator === -1) continue;

  const key = line.slice(0, separator).trim().toLowerCase();
  const value = line.slice(separator + 1).trim();

  config[key] = value;
}

const replacements = {
  OWNER: config.owner,
  PRODUCT: config.product,
  CATEGORY: config.category,
  DEPLOYMENT: config.deployment,
  COMPETITORS: config.competitors,
};

for (const [key, value] of Object.entries(replacements)) {
  prompt = prompt.split(`{{${key}}}`).join(value || '');
}

prompt = prompt.split('{{PREVIOUS_RUN_JSON}}').join('null');

return {
  json: {
    research_prompt: prompt
  }
};
