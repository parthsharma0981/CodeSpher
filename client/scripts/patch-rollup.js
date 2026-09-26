import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rollupNativePath = path.resolve(__dirname, '../node_modules/rollup/dist/native.js');

if (fs.existsSync(rollupNativePath)) {
  let content = fs.readFileSync(rollupNativePath, 'utf8');
  if (!content.includes('@rollup/wasm-node/dist/native.js')) {
    content = content.replace(
      /const requireWithFriendlyError = id => \{[\s\S]*?try \{[\s\S]*?return require\(id\);[\s\S]*?\} catch \(error\) \{/,
      `const requireWithFriendlyError = id => {
\ttry {
\t\treturn require(id);
\t} catch (error) {
\t\ttry {
\t\t\treturn require('@rollup/wasm-node/dist/native.js');
\t\t} catch {}`
    );
    fs.writeFileSync(rollupNativePath, content, 'utf8');
    console.log('[patch-rollup] Successfully patched rollup native.js with wasm-node fallback');
  }
}
