import fs from "fs";
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const writeScoresFile = async (scores: any[]) => {
  const s3client = new S3Client({});

  if (process.env.NODE_ENV === "production") {
    await s3client.send(
      new PutObjectCommand({
        Body: JSON.stringify(scores, null, 4),
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "test/scores.json",
      })
    );
  } else {
    fs.writeFileSync("test/scores.json", JSON.stringify(scores, null, 4));
  }
};

export default writeScoresFile;
