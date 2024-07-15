const B2 = require("backblaze-b2");
// const { getSignedUrl } = require("./s3Controller");
const PRODUCT_FileSAVE_LOCATION = "fashion/product_files/";
const PRODUCT_ImageSAVE_LOCATION = "fashion/marketplace/";

const b2 = new B2({
  applicationKeyId: process.env.AWS_ACCESS_KEY_ID,
  applicationKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const common_args = {
  // axios request level config, see https://github.com/axios/axios#request-config
  axios: {
    timeout: 30000, // (example)
  },
  axiosOverride: {
    /* Don't use me unless you know what you're doing! */
  },
};

const initialize = async () => {
  const auth = await b2.authorize();
  // const link = getSignedUrl();
  try {
    const credentials = {
      downloadUrl: auth.data.downloadUrl,
      authorizationToken: auth.data.authorizationToken,
    };
    // console.log("atuh", auth.data);
    return credentials;
  } catch (error) {
    console.log("error", error);
  }
};

const uploadFile = async (data, type) => {
  const auth = await b2.authorize();
  const upload_info = await b2.getUploadUrl({
    bucketId: auth.data.allowed.bucketId,

    // common_args
  }); // returns promise
  // upload file
  // https://pod-040-2011-18.backblaze.com/b2api/v2/b2_upload_file/3832846c57ec344e853a0b1a/c004_v0402011_t0008
  const uploadUrl = upload_info.data.uploadUrl;
  const path = uploadUrl.split("/").pop() + "." + data.name.split(".").pop();
  const uploadName =
    type == "file"
      ? PRODUCT_FileSAVE_LOCATION
      : PRODUCT_ImageSAVE_LOCATION + path;
  const uploaded = await b2.uploadFile({
    uploadUrl: uploadUrl,
    uploadAuthToken: upload_info.data.authorizationToken,
    fileName: uploadName,
    // contentLength: 0, // optional data length, will default to data.byteLength or data.length if not provided
    // mime: data.mimetype, // optional mime type, will default to 'b2/x-auto' if not provided
    data: data.data, // this is expecting a Buffer, not an encoded string
    // hash: 'sha1-hash', // optional data hash, will use sha1(data) if not provided

    onUploadProgress: (event) => {},
  });
  return path;
};

const removeFile = async (fileName) => {
  const auth = await b2.authorize();
  const bucketId = auth.data.allowed.bucketId;
  let response = await b2.startLargeFile({ bucketId, fileName });

  await b2.deleteFileVersion({
    fileId: response.data.fileId,
    fileName: fileName,
    // ...common arguments (optional)
  });
};

module.exports = {
  initialize,
  uploadFile,
  removeFile,
};
