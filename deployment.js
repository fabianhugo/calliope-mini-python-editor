/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
const createDeploymentDetailsFromOptions = (options) => {
  const STAGE = process.env.STAGE;

  if (!STAGE) {
    throw new Error("STAGE must be defined");
  }

  const environment = options[STAGE.toLocaleLowerCase()];

  if (!environment) {
    throw new Error(`No environment defined for stage ${STAGE}`);
  }

  if (!environment.bucket) {
    throw new Error(`No bucket defined for stage ${STAGE}`);
  }

  return {
    s3Config: {
      bucketPrefix: environment.prefix || "",
      bucket: environment.bucket,
    }
  };
};

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
