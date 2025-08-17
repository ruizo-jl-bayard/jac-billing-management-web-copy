import { Schema } from "../../data/resource";
import { } from "@aws-amplify/backend-storage"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client();

export const handler: Schema["saveForm"]["functionHandler"] = async (event) => {

    const { acceptanceFile, membershipInformationFile, reEmploymentHistory } = event.arguments

    try {

        if (acceptanceFile)
            await downloadFile(acceptanceFile)

        if (membershipInformationFile)
            await downloadFile(membershipInformationFile)

        if (reEmploymentHistory)
            await downloadFile(reEmploymentHistory)

        return true;
    } catch (e) {
        console.log(e);
        console.log("Error occurred while downloading and uploading the s3 object")
        throw e;

    }

}

async function downloadFile(file: {
    key: string;
    versionId: string;
}) {

    const apiURL = process.env.API_URL ?? "";
    const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            key: file.key,
            versionId: file.versionId,
        }),
    });

    if (!res.ok) throw new Error(`Failed to get presigned URL: ${res.statusText}`);
    const responseData = await res.json();
    const downloadUrl = responseData.downloadUrl;
    const response = await fetch(downloadUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }

    // Convert to ArrayBuffer, then to Node.js Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
        Bucket: process.env.UPLOADS_BUCKET,
        Key: `uploads/${new Date().toISOString()}.csv`,
        Body: buffer
    });

    await s3Client.send(command);

}