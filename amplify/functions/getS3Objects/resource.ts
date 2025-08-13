import { defineFunction } from '@aws-amplify/backend';

export const getS3Objects = defineFunction({
    name: 'getS3Objects',
    entry: './handler.ts'
});