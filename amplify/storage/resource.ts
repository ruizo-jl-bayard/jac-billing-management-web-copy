import { defineStorage } from "@aws-amplify/backend";
import { saveForm } from "../functions/saveForm/resource";

export const storage = defineStorage({
    name: 'jac-billing-management-test-bucket',
    access: (allow) => ({
        'uploads/*': [
            allow.resource(saveForm).to(['read', 'write'])
        ]
    })
});
