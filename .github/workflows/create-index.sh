#!/bin/bash
set -e

# Create pages directory
mkdir -p pages

# Copy documentation (HTML files from markdown conversion)
cp -r docs/*.html pages/docs/ 2>/dev/null || true
cp docs/README.html pages/docs/ 2>/dev/null || true

# Install marked locally for conversion (if not already done)
npm install --no-save marked 2>/dev/null || true

# Copy Allure report
mkdir -p pages/allure
cp -r allure-report/* pages/allure/ 2>/dev/null || true

# Copy history
mkdir -p pages/history
cp -r history/* pages/history/ 2>/dev/null || true

# Create combined index.html
cat > pages/index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🧪 Playwright Saucedemo - Test Reports</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
    .container { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #333; border-bottom: 3px solid #667eea; padding-bottom: 15px; font-size: 2.5em; }
    h2 { color: #667eea; margin-top: 30px; }
    .card { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 5px solid #667eea; }
    a { color: #667eea; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; color: #764ba2; }
    ul { list-style: none; padding: 0; }
    li { padding: 12px 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px; }
    .emoji { font-size: 1.5em; }
    .date { color: 666; font-size: 0.9em; background: #eee; padding: 4px 12px; border-radius: 20px; }
    .stats { display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap; }
    .stat { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 Playwright Saucedemo Test Reports</h1>
    <p class="date">Last updated: TIMESTAMP</p>
    
    <div class="stats">
      <div class="stat">📊 Allure Reports</div>
      <div class="stat">📈 Test History</div>
      <div class="stat">📚 Documentation</div>
    </div>

    <div class="card">
      <h2>📊 Current Test Reports</h2>
      <ul>
        <li><span class="emoji">🎨</span> <a href="allure/index.html">Allure Test Report</a> - Interactive report with screenshots</li>
        <li><span class="emoji">📈</span> <a href="playwright-report/index.html">HTML Test Report</a> - Standard Playwright results</li>
        <li><span class="emoji">📄</span> <a href="test-results/results.json">JSON Results</a> - Machine-readable results</li>
      </ul>
    </div>

    <div class="card">
      <h2>📚 Documentation</h2>
      <ul>
        <li><span class="emoji">🏗️</span> <a href="docs/ARCHITECTURE.html">Architecture</a> - Project architecture</li>
        <li><span class="emoji">📋</span> <a href="docs/TEST_CASES.html">Test Cases</a> - Complete documentation</li>
        <li><span class="emoji">✨</span> <a href="docs/BEST_PRACTICES.html">Best Practices</a> - Testing guidelines</li>
        <li><span class="emoji">⚙️</span> <a href="docs/CONFIGURATION.html">Configuration</a> - Configuration guide</li>
      </ul>
    </div>

    <div class="card">
      <h2>📅 Test History</h2>
      <ul>
        <li><span class="emoji">📁</span> <a href="history/latest/index.html">Latest Report</a> - Most recent test results</li>
HTMLEOF

# List history items
for dir in history/*/; do
  if [ -d "$dir" ] && [ "$(basename "$dir")" != "latest" ]; then
    date=$(basename "$dir")
    echo "<li><span class=\"emoji\">📅</span> <a href=\"history/$date/index.html\">$date</a></li>" >> pages/index.html
  fi
done

cat >> pages/index.html << 'HTMLEOF'
      </ul>
    </div>

    <div class="card">
      <h2>🔗 Quick Links</h2>
      <ul>
        <li><span class="emoji">🐙</span> <a href="https://github.com/anxoportela/playwright-saucedemo">GitHub Repository</a></li>
        <li><span class="emoji">📖</span> <a href="https://playwright.dev/">Playwright Documentation</a></li>
        <li><span class="emoji">🛒</span> <a href="https://www.saucedemo.com/">Saucedemo Demo Site</a></li>
      </ul>
    </div>
  </div>
</body>
</html>
HTMLEOF

# Replace timestamp
sed -i "s/TIMESTAMP/$(date '+%Y-%m-%d %H:%M:%S')/g" pages/index.html

echo "✅ Index created successfully"
ls -la pages/
