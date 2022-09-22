const timeline = [
  'test/timeline/*.feature', // feature filter
  '--require test/timeline/*.steps.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and not @api"',
];
exports.timeline = timeline.join(' ');
