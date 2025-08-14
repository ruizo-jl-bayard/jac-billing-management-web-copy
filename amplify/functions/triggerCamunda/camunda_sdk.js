import { Camunda8 } from '@camunda8/sdk';
function init() {
    const c8 = new Camunda8({
        ZEEBE_ADDRESS: process.env.ZEEBE_ADDRESS,
        ZEEBE_CLIENT_ID: process.env.ZEEBE_CLIENT_ID,
        ZEEBE_CLIENT_SECRET: process.env.ZEEBE_CLIENT_SECRET,
        ZEEBE_AUTHORIZATION_SERVER_URL: process.env.ZEEBE_AUTHORIZATION_SERVER_URL,
        ZEEBE_REST_ADDRESS: process.env.ZEEBE_REST_ADDRESS,
        ZEEBE_GRPC_ADDRESS: process.env.ZEEBE_GRPC_ADDRESS,
        ZEEBE_TOKEN_AUDIENCE: process.env.ZEEBE_TOKEN_AUDIENCE,
        CAMUNDA_CLIENT_ID: process.env.CAMUNDA_CLIENT_ID,
        CAMUNDA_CLIENT_SECRET: process.env.CAMUNDA_CLIENT_SECRET,
        CAMUNDA_CLUSTER_ID: process.env.CAMUNDA_CLUSTER_ID,
        CAMUNDA_CLUSTER_REGION: process.env.CAMUNDA_CLUSTER_REGION,
        CAMUNDA_CREDENTIALS_SCOPES: process.env.CAMUNDA_CREDENTIALS_SCOPES,
        CAMUNDA_TASKLIST_BASE_URL: process.env.CAMUNDA_TASKLIST_BASE_URL,
        CAMUNDA_OPERATE_BASE_URL: process.env.CAMUNDA_OPERATE_BASE_URL,
        CAMUNDA_OAUTH_URL: process.env.CAMUNDA_OAUTH_URL
    })

    return c8;
}

const startProcess = async (variables) => {
    try {
        const c8 = await init();
        const zeebe = c8.getZeebeGrpcApiClient();

        console.log("variables");
        console.log(variables);

        const result = await zeebe.createProcessInstance({
            bpmnProcessId: process.env.BPMN_PROCESS_ID,
            version: -1,
            variables
        });
        console.log(result);
    } catch (error) {
        console.error('Failed to complete task:', error);
    }
}

export default startProcess;