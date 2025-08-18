import { defineFunction, secret } from '@aws-amplify/backend';
export const triggerCamunda = defineFunction({
    name: 'trigger-camunda',
    entry: './handler.ts',
    environment: {
        ZEEBE_ADDRESS: "b7b745e6-74fd-4db7-a065-0c07a36376af.dsm-1.zeebe.camunda.io:443",
        ZEEBE_CLIENT_ID: secret("ZEEBE_CLIENT_ID"),
        ZEEBE_CLIENT_SECRET: secret("ZEEBE_CLIENT_SECRET"),
        ZEEBE_AUTHORIZATION_SERVER_URL: "https://login.cloud.camunda.io/oauth/token",
        ZEEBE_REST_ADDRESS: "https://dsm-1.zeebe.camunda.io/b7b745e6-74fd-4db7-a065-0c07a36376af",
        ZEEBE_GRPC_ADDRESS: "grpcs://b7b745e6-74fd-4db7-a065-0c07a36376af.dsm-1.zeebe.camunda.io:443",
        ZEEBE_TOKEN_AUDIENCE: "zeebe.camunda.io",
        CAMUNDA_CLUSTER_ID: "b7b745e6-74fd-4db7-a065-0c07a36376af",
        CAMUNDA_CLIENT_ID: secret("ZEEBE_CLIENT_ID"),
        CAMUNDA_CLIENT_SECRET: secret("ZEEBE_CLIENT_SECRET"),
        CAMUNDA_CLUSTER_REGION: "dsm-1",
        CAMUNDA_CREDENTIALS_SCOPES: "Zeebe,Tasklist,Operate,Secrets",
        CAMUNDA_TASKLIST_BASE_URL: "https://dsm-1.tasklist.camunda.io/b7b745e6-74fd-4db7-a065-0c07a36376af",
        CAMUNDA_OPERATE_BASE_URL: "https://dsm-1.operate.camunda.io/b7b745e6-74fd-4db7-a065-0c07a36376af",
        CAMUNDA_OAUTH_URL: "https://login.cloud.camunda.io/oauth/token",
        HOME: '/tmp',
        BPMN_PROCESS_ID: 'Process_0owrc6e'
    },
    layers: {
        "@camunda8/sdk": "arn:aws:lambda:us-west-2:940482428367:layer:camunda-sdk-8:2"
    },
    timeoutSeconds: 30
});