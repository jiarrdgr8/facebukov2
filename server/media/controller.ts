export {};
// const service = require("./service");
const AWS = require("aws-sdk");
// const sharp = require("sharp");
// const fileUpload = require("express-fileupload");

const s3Client = new AWS.S3({
  region: process.env.AWS_S3_REGION, // Update this with the appropriate AWS region (e.g., 'us-east-1')
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY, // Replace with your AWS access key ID
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY, // Replace with your AWS secret access key
  },
});

function replaceExtension(filename: string, newExtension: string) {
  return filename.replace(/\.[^/.]+$/, "") + newExtension;
}

// const s3Client = new AWS.S3({
//   endpoint: process.env.DO_SPACES_URL,
//   region: "sgp1",
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_ID,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

module.exports.upload = async (req: any, res: any) => {
  try {
    const file = req.files.fileUpload; // Ensure this matches your file input name
    console.log(file);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Determine the file type based on mimetype
    const isPng = file.mimetype === "image/png";

    // The file is already in buffer format in file.data, no need to convert it
    const fileBuffer = file.data;

    const fileNameInBucket = `facebuko/${replaceExtension(
      file.name,
      isPng ? ".png" : ".jpg"
    )}`;

    // Parameters for the S3 upload
    const params = {
      Bucket: process.env.AWS_S3_BUCKET, // Your AWS S3 bucket name
      Key: fileNameInBucket, // Ensure the file has the correct extension
      Body: fileBuffer, // The file buffer (already a buffer)
      ACL: "public-read", // Make the file publicly accessible
      ContentType: isPng ? "image/png" : "image/jpeg", // Set the correct MIME type
    };

    // Upload to S3
    const uploadResult = await s3Client.upload(params).promise();
    console.log(uploadResult);

    if (uploadResult) {
      return res.status(200).json({ photoUrl: uploadResult.Location });
    } else {
      return res.status(500).json({ message: "Error uploading file" });
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.status(500).json({ message: "Error uploading file" });
  }
};
