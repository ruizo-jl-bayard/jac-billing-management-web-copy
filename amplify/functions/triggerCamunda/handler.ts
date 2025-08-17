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
    } catch (e) {
        console.log(e);
        console.log("Error occurred while downloading and uploading the s3 object")
        throw e;

    }

}