import { defineFunction } from '@aws-amplify/backend';

export const getS3Objects = defineFunction({
    name: 'getS3Objects',
    entry: './handler.ts',
    environment: {
        API_URL: "https://59o5vujsgd.execute-api.ap-northeast-1.amazonaws.com/dev/data/list"
    }
});