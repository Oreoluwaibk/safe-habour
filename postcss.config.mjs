import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const stylesheet = path.join(projectRoot, "src", "app", "globals.css");

function isFile(filePath) {
  if (!filePath) return false;
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// Turbopack sometimes omits the CSS filename, or passes the project directory.
// Tailwind then resolves `@import "tailwindcss"` from the parent folder.
function fixTailwindFrom() {
  return {
    postcssPlugin: "fix-tailwind-from",
    Once(_root, { result }) {
      const from = result.opts.from ? path.resolve(result.opts.from) : "";
      if (!isFile(from)) {
        result.opts.from = stylesheet;
      }
    },
  };
}
fixTailwindFrom.postcss = true;

const config = {
  plugins: [fixTailwindFrom, "@tailwindcss/postcss"],
};

export default config;
