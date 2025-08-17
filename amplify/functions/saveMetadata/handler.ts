
import type { Handler } from 'aws-lambda';
import type { Schema } from '../../data/resource';
import { Amplify } from 'aws-amplify';
import { Client, generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/save-metadata'; // replace with your function name

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();


export const handler: Schema["saveMetadata"]["functionHandler"] = async (event) => {
    const params = event.arguments;


    const fileProcess = await client.models.FileProcess.create({
        year: params.year,
        month: params.month,
        requestParams: JSON.stringify(params),
        status: 'INPROGRESS',

    });

    console.log(fileProcess)
    if (!fileProcess.data) {
        console.log(fileProcess)
        throw new Error("File process creation failed");
    }

    await createFileUploads({
        fileProcessId: fileProcess.data.id,
        key: params.acceptanceFile?.key ?? '',
        versionId: params.acceptanceFile?.versionId ?? '',
        fileType: 'ACCEPTANCE_PLAN_DATA'
    });

    await createFileUploads({
        fileProcessId: fileProcess.data.id,
        key: params.membershipInformationFile?.key ?? '',
        versionId: params.membershipInformationFile?.versionId ?? '',
        fileType: 'MEMBERS_INFO_DATA'
    });
    await createFileUploads({
        fileProcessId: fileProcess.data.id,
        key: params.reEmploymentHistory?.key ?? '',
        versionId: params.reEmploymentHistory?.versionId ?? '',
        fileType: 'REEMPLOYMENT_DATA'
    });

    return {
        processId: fileProcess.data.id
    }
};

async function createFileUploads(data: {
    fileProcessId: string;
    key: string;
    versionId: string;
    fileType: 'ACCEPTANCE_PLAN_DATA' | 'MEMBERS_INFO_DATA' | 'REEMPLOYMENT_DATA' | 'INFORMATION_SUPPLEMENT_DATA';
}) {
    await client.models.FileUploads.create({
        fileProcessId: data.fileProcessId,
        s3ObjectKey: data.key ?? '',
        fileName: data.key ?? '',
        fileType: data.fileType,
        versionId: data.versionId ?? '',
    })
}
