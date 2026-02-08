// scripts/audit.ts
import fs from 'fs';
import { execSync } from 'child_process';

// Simple color helper
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

const log = (color: keyof typeof colors, text: string) => {
  // eslint-disable-next-line security/detect-object-injection
  console.log(`${colors[color]}${text}${colors.reset}`);
};

console.log(`\n${colors.blue}${colors.bold}🛡️  INITIATING RESTORMEL SECURITY SCAN...${colors.reset}\n`);

let errors = 0;

// 1. CRITICAL FILES CHECK
const requiredFiles = ['.cursorrules', 'README.md', 'package.json'];
requiredFiles.forEach(file => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(file)) {
    log('red', `❌ MISSING CRITICAL FILE: ${file}`);
    errors++;
  } else {
    log('green', `✅ FOUND: ${file}`);
  }
});

// 2. DANGEROUS PATTERNS SCAN
const dangerPatterns = [
  { pattern: 'dangerouslySetInnerHTML', label: 'Dangerous HTML' },
  { pattern: 'eval\\(', label: 'Eval() Usage' },
  { pattern: 'sk_live_', label: 'Stripe Secret Key' },
];

dangerPatterns.forEach(({ pattern, label }) => {
  try {
    execSync(`grep -r "${pattern}" src/`, { stdio: 'pipe' });
    log('red', `❌ SECURITY RISK: ${label} detected in code.`);
    errors++;
  } catch {
    // Grep failed to find the pattern. This is good news.
    log('green', `✅ CLEAN: No ${label} found.`);
  }
});

// 3. DEPENDENCY VULNERABILITY CHECK
log('blue', '\n🔎 Scanning npm dependencies...');
try {
  execSync('npm audit --audit-level=high', { stdio: 'inherit' });
  log('green', '✅ DEPENDENCIES: Secure.');
} catch {
  log('red', '❌ VULNERABILITIES FOUND. Run "npm audit fix".');
  errors++;
}

// 4. ARCHITECTURE BOUNDARIES CHECK
log('blue', '\n🏗️  Scanning Architecture Boundaries...');
try {
  execSync('npx depcruise src --config .dependency-cruiser.js', { stdio: 'inherit' });
  log('green', '✅ ARCHITECTURE: Secure. No forbidden dependency rules violated.');
} catch {
  log('red', '❌ ARCHITECTURE VIOLATION: Forbidden dependencies detected!');
  errors++;
}

console.log('\n------------------------------------------------');
if (errors === 0) {
  log('green', `${colors.bold}🎉 RESTORMEL AUDIT PASSED. SYSTEM SECURE.`);
  process.exit(0);
} else {
  log('red', `${colors.bold}🚨 RESTORMEL AUDIT FAILED WITH ${errors} ERRORS.`);
  process.exit(1);
}