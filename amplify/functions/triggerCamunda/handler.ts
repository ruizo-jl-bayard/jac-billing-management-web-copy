import { Schema } from "../../data/resource"
// @ts-ignore
import startProcess from './camunda_sdk'
export const handler: Schema["triggerCamunda"]["functionHandler"] = async (event) => {
    const params = event.arguments
    try {
        await startProcess({
            selectedFiles: params
        })

        return true;
    } catch (e) {
        console.log(e);
        console.log("Error occurred while downloading and uploading the s3 object")
        throw e;

    }

}