import { Schema } from "../../data/resource"
// @ts-ignore
import startProcess from './camunda_sdk'
export const handler: Schema["triggerCamunda"]["functionHandler"] = async (event) => {
    const params = event.arguments
    try {
        const data = await startProcess({
            fileProcessId: params.fileProcessId,
            selectedFiles: {
                acceptanceFile: params.acceptanceFile,
                membershipInformationFile: params.membershipInformationFile,
                reEmploymentHistory: params.reEmploymentHistory
            }
        })
        return data;
    } catch (err: any) {
        console.error("Function error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message || "Unknown error",
            }),
        };

    }

}