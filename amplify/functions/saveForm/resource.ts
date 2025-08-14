import { defineFunction } from '@aws-amplify/backend';

export const saveForm = defineFunction({
    name: 'saveForm',
    entry: './handler.ts',
    environment: {
        API_URL: "https://59o5vujsgd.execute-api.ap-northeast-1.amazonaws.com/dev/data/download-url",
        UPLOADS_BUCKET: "amplify-awsamplifygen2-je-jacbillingmanagementtest-lhbyhswebvdt"
    }
});