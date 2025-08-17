import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/sayHello/resource";
import { getS3Objects } from "../functions/getS3Objects/resource";
import { saveForm } from "../functions/saveForm/resource";
import { triggerCamunda } from "../functions/triggerCamunda/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
import { schema as generatedSqlSchema } from './schema.sql';
import { saveMetadata } from "../functions/saveMetadata/resource";

const sqlSchema = generatedSqlSchema.authorization(allow => [
  allow.resource(saveMetadata).to(['query', 'listen', 'mutate']),
]);


const schema = a.schema({
  S3File: a.customType({
    key: a.string(),
    versionId: a.string(),
    isLatest: a.boolean()
  }),
  FileInput: a.customType({
    key: a.string().required(),
    versionId: a.string().required(),
    isLatest: a.boolean()
  }),
  sayHello: a
    .mutation()
    .arguments({
      name: a.string(),
      userId: a.string()
    })
    .authorization((allow) => allow.authenticated())
    .handler((a.handler.function(sayHello)))
    .returns(a.string()),
  getS3Objects: a
    .query()
    .authorization((allow) => allow.authenticated())
    .handler((a.handler.function(getS3Objects)))
    .returns(a.ref('S3File').array()),
  saveForm: a
    .mutation()
    .arguments({
      acceptanceFile: a.ref("FileInput"),
      membershipInformationFile: a.ref("FileInput"),
      reEmploymentHistory: a.ref("FileInput")
    })
    .authorization((allow) => allow.authenticated())
    .handler((a.handler.function(saveForm)))
    .returns(a.boolean()),
  saveMetadata: a
    .mutation()
    .arguments({
      acceptanceFile: a.ref("FileInput"),
      membershipInformationFile: a.ref("FileInput"),
      reEmploymentHistory: a.ref("FileInput"),
      month: a.integer().required(),
      year: a.integer().required()
    })
    .authorization((allow) => allow.authenticated())
    .handler((a.handler.function(saveMetadata)))
    .returns(a.customType({
      processId: a.string()
    })),
  triggerCamunda: a
    .mutation()
    .arguments({
      fileProcessId: a.string().required(),
      acceptanceFile: a.ref("FileInput"),
      membershipInformationFile: a.ref("FileInput"),
      reEmploymentHistory: a.ref("FileInput")
    })
    .authorization((allow) => allow.authenticated())
    .handler((a.handler.function(triggerCamunda)))
    .returns(a.boolean()),

});
const combinedSchema = a.combine([schema, sqlSchema]);
export type Schema = ClientSchema<typeof combinedSchema>;

export const data = defineData({
  schema: combinedSchema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },

});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
