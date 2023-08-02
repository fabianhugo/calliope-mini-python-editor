#!/usr/bin/env node
const ref = process.env.GITHUB_REF;
let stage;
let distributionId;

if (ref.startsWith("refs/heads/feature")) {
  stage = "STAGING";
  distributionId = "EJULDYM4LTZ5B";
} else if (ref.startsWith("refs/heads/main")) {
  stage = "PRODUCTION";
  distributionId = "E27E23HSV7YX3Y";
} else {
  stage = "REVIEW";
}

console.log(`STAGE=${stage}`);
console.log(`REACT_APP_STAGE=${stage}`);
console.log(`DISTRIBUTION_ID=${distributionId}`);
