const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_ENDPOINT,
  s3BucketEndpoint: true,
  signatureVersion: "v4",
});

// Tried with and without this. Since s3 is not region-specific, I don't
// think it should be necessary.
// AWS.config.update({region: 'us-west-2'})

const myBucket = process.env.AWS_BUCKET;
const myKey = "evoweb-dev/fashion/marketplace/NSZEfDOJtnru3a8lQApo.jpg";
const signedUrlExpireSeconds = 60 * 15;

const getSignedUrl = () => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
  });
  // console.log(url);
  return url;
};

module.exports = { getSignedUrl };
