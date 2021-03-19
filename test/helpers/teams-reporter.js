const request = require('superagent');
const hook = require('./hook-urls')
const moment = require('moment-timezone');
const BASE_URL = require('../../environments/base-urls');

function main() {
  if (hook.CI_TEAMS_HOOK === undefined) {
    throw new Error('HOOK_URL should be defined as Microsoft teams channel hook url');
  }
  const file = process.argv[2];
  if (!file) throw new Error('File path is not given');

  const hookUrl = hook.CI_TEAMS_HOOK;
  const project = "UI Testing Playground";
  const platform = 'wdio';
  let displayTime = moment.tz('Asia/Manila').format('MMMM Do YYYY, h:mm:ss a');

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  /** logic to get results */ 
  if (platform === 'wdio') {
    const testData = require(file);

    baseUrl = testData['baseUrl'];
    browser = testData['capabilities'][0]['browserName']
    browserName = browser.charAt(0).toUpperCase() + browser.slice(1);
    browserVersion = testData['capabilities'][0]['browserVersion']
    type = 'Regression Test';

    passed = testData['state']['passed'];
    failed = testData['state']['failed'];
    skipped = testData['state']['skipped'];
    
    total = passed + failed + skipped;
    /** Processing environment data based on baseUrl of the results 
      * Handled in switch case incase of multiple environments 
    */
    switch (baseUrl) {
      case BASE_URL.UITESTING:
          env = "UITESTING"
          break;
      default:
          env = "Not located"
          break;
  }
  } else {
    console.log("WebdriverIO framework is not in use")
  }

  let results = `**${total} Tests**: &#x2714;${passed} passed`;
  if (failed > 0) results += `, &#x2757;${failed} failed`;
  if (skipped > 0) results += `, &#x2796;${skipped} skipped`;

  request.post(hookUrl)
      .send(
          {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "33F0FF",
            "summary": `Test report for ${project}`,
            "sections": [
              {

                "activityTitle": `## ${project} | ${displayTime}`,
                // "activitySubtitle": "Status of build #90",
                "facts": [
                  {
                    "name": "Browser",
                    "value": browserName,
                  },
                  {
                    "name": "Version",
                    "value": browserVersion,
                  },
                  {
                    "name": "Environment",
                    "value": env,
                  },
                  {
                    "name": "URL",
                    "value": baseUrl,
                  },
                  {
                    "name": "Type",
                    "value": type,
                  },
                  {
                    "name": "Status",
                    "value": results,
                  },
                ],
                "markdown": true,
              },
            ],
          },
      )
      .then( (res) => {
        console.log(`Post results to Microsoft Teams with status: ${res.status}`);
      });
}

main();