import { defineFunction } from "@aws-amplify/backend";

export const saveMetadata = defineFunction({
    name: 'save-metadata',
    entry: './handler.ts',
    timeoutSeconds: 30,
});