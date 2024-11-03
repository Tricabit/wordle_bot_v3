import fs from "fs";
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const readScoresFile = async () => {
  const s3client = new S3Client({});

  if (process.env.NODE_ENV === "development") {
    const response = await s3client.send(
      new GetObjectCommand({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "test/scores.json",
      })
    );
    const fileData = await response.Body.transformToString();
    return JSON.parse(fileData);
  } else {
    return JSON.parse(fs.readFileSync("test/scores.json", "utf-8"));
  }
};

export default readScoresFile;
