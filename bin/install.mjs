#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const skillSource = join(packageRoot, "skills", "picasso");

const args = process.argv.slice(2);
const command = args[0] || "install";

if (command === "help" || command === "--help" || command === "-h") {
  console.log(`
  picasso-skill - The ultimate AI design skill

  Usage:
    npx picasso-skill              Install to current project (.claude/skills/)
    npx picasso-skill --global     Install globally (~/.claude/skills/)
    npx picasso-skill --cursor     Install for Cursor (.cursor/skills/)
    npx picasso-skill --codex      Install for Codex (~/.codex/skills/)
    npx picasso-skill --agents     Install to .agents/skills/
    npx picasso-skill --path DIR   Install to a custom directory
  `);
  process.exit(0);
}

let targetDir;

if (args.includes("--global") || args.includes("-g")) {
  const home = process.env.HOME || process.env.USERPROFILE;
  targetDir = join(home, ".claude", "skills", "picasso");
} else if (args.includes("--cursor")) {
  targetDir = join(process.cwd(), ".cursor", "skills", "picasso");
} else if (args.includes("--codex")) {
  const home = process.env.HOME || process.env.USERPROFILE;
  targetDir = join(home, ".codex", "skills", "picasso");
} else if (args.includes("--agents")) {
  targetDir = join(process.cwd(), ".agents", "skills", "picasso");
} else if (args.includes("--path")) {
  const pathIdx = args.indexOf("--path");
  const customPath = args[pathIdx + 1];
  if (!customPath) {
    console.error("Error: --path requires a directory argument");
    process.exit(1);
  }
  targetDir = resolve(customPath, "picasso");
} else {
  // Default: project-level Claude Code
  targetDir = join(process.cwd(), ".claude", "skills", "picasso");
}

console.log(`\n  Installing Picasso skill to: ${targetDir}\n`);

try {
  mkdirSync(targetDir, { recursive: true });
  mkdirSync(join(targetDir, "references"), { recursive: true });

  // Copy SKILL.md
  cpSync(join(skillSource, "SKILL.md"), join(targetDir, "SKILL.md"));

  // Copy all reference files
  const refs = readdirSync(join(skillSource, "references"));
  for (const ref of refs) {
    cpSync(
      join(skillSource, "references", ref),
      join(targetDir, "references", ref)
    );
  }

  console.log(`  Done! Installed ${1 + refs.length} files:`);
  console.log(`    SKILL.md`);
  for (const ref of refs) {
    console.log(`    references/${ref}`);
  }
  console.log(`\n  Picasso is ready. Start designing.\n`);
} catch (err) {
  console.error(`  Error installing: ${err.message}`);
  process.exit(1);
}
