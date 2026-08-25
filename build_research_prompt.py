#!/usr/bin/env python3

import argparse
import configparser
from pathlib import Path


def load_config(config_path: Path) -> dict:
    config = configparser.ConfigParser()
    config.read(config_path, encoding="utf-8")

    section = config["perspective"]

    return {
        "OWNER": section["owner"],
        "PRODUCT": section["product"],
        "CATEGORY": section["category"],
        "DEPLOYMENT": section["deployment"],
        "COMPETITORS": section["competitors"],
    }


def build_prompt(template_path: Path, config_path: Path, previous_run_path: Path | None) -> str:
    prompt = template_path.read_text(encoding="utf-8")
    values = load_config(config_path)

    for key, value in values.items():
        prompt = prompt.replace(f"{{{{{key}}}}}", value)

    if previous_run_path:
        previous_run = previous_run_path.read_text(encoding="utf-8").strip()
    else:
        previous_run = "null"

    prompt = prompt.replace("{{PREVIOUS_RUN_JSON}}", previous_run)

    return prompt


def main():
    parser = argparse.ArgumentParser(
        description="Inject product/competitor config values into the research prompt template."
    )
    parser.add_argument("config", type=Path, help="Path to product_competitor.config")
    parser.add_argument("template", type=Path, help="Path to research_prompt_template.md")
    parser.add_argument("output", type=Path, help="Path for generated research prompt")
    parser.add_argument(
        "--previous-run",
        type=Path,
        default=None,
        help="Optional previous-run JSON file for change detection"
    )

    args = parser.parse_args()

    final_prompt = build_prompt(
        template_path=args.template,
        config_path=args.config,
        previous_run_path=args.previous_run,
    )

    args.output.write_text(final_prompt, encoding="utf-8")
    print(f"Research prompt written to: {args.output}")


if __name__ == "__main__":
    main()
