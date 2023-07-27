#!/usr/bin/env node
let url = "/";
if (process.env.GITHUB_REPOSITORY_OWNER === "calliope-edu") {
  if (!process.env.STAGE) {
    throw new Error("STAGE must be defined");
  }

  const deployment = require("../deployment");
  const { bucketPrefix, bucket, mode } = deployment;
  const branchName = process.env.GITHUB_REF.replace("refs/heads/", "");

  if (bucketPrefix) {
    url = `/${bucketPrefix}/`;
  }

  if (mode === "branch-prefix") {
    url = `/${branchName}/`;
  }

  let deployPath = `${bucket}`;

  if (branchName !== "main" && mode === "branch-prefix") {
    deployPath = `${bucket}/${branchName}`;
  }

  console.log(`BUCKET_NAME=${bucket}`);
  console.log(`DEPLOY_PATH=${deployPath}`);
}

// Two env vars as PUBLIC_URL seems to be blank when running jest even if we set it.
console.log(`PUBLIC_URL=${url}`);
console.log(`E2E_PUBLIC_URL=${url}`);
