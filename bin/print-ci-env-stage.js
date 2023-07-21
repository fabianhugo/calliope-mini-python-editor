#!/usr/bin/env node
const ref = process.env.GITHUB_REF;
let stage;
let bucketName = "staging.calliope.editor";

if (ref === "refs/heads/feature/calliope-rework") {
  stage = "STAGING";
} else if (ref.startsWith("refs/tags/v")) {
  stage = "PRODUCTION";
} else {
  stage = "REVIEW";
}

console.log(`BUCKET_NAME=${bucketName}`);
console.log(`STAGE=${stage}`);
console.log(`REACT_APP_STAGE=${stage}`);
