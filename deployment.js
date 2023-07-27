/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
const {
  createDeploymentDetailsFromOptions,
} = require("@calliope-edu/website-deploy-aws-config");

const { s3Config } = createDeploymentDetailsFromOptions({
  production: {
    bucket: "production.calliope.editor",
    mode: "major",
    allowPrerelease: true,
  },
  staging: {
    bucket: "staging.calliope.editor",
  },
  review: {
    bucket: "review.calliope.editor",
    mode: "branch-prefix",
  },
});
module.exports = {
  ...s3Config,
  region: "eu-central-1",
  removeNonexistentObjects: true,
  enableS3StaticWebsiteHosting: true,
  errorDocumentKey: "index.html",
  redirects: [],
  params: {
    "**/**.html": {
      CacheControl: "public, max-age=0, must-revalidate",
    },
    "static/**": { CacheControl: "public, max-age=31536000, immutable" },
    "**/**/!(sw).js": { CacheControl: "public, max-age=31536000, immutable" },
    "**/**.css": { CacheControl: "public, max-age=31536000, immutable" },
  },
};
