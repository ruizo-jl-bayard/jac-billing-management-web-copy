## Overview

This repository contains source of the Amplify Gen 2 setup for the Jac billing management web. Please refer to the [documents](https://docs.amplify.aws/) of Amplify Gen 2

## Development Setup

This project was configured with the following:

- **Frontend**: NextJS
- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by RDS Posgresql
- **Functions**: AWS Lambda setup with app sync resolver.

Clone the repository in your local machine.
Run the following command to switch your node version to 22

```
nvm use 22
```

Setup your AWS profile

```
aws configure
```

You will need to setup your database in the cloud. Create your database in the existing RDS instance with the following name conventon ${name}-jac-microservice
Once you created, run the following command to create an ssh tunnel, this is because the RDS is residing in the private subnet and only bastion host is allowed to connect to it.

```
ssh -i /Users/jeffreyhitosis/Downloads/NxG-Camunda-dev.pem \
  -L 5433:jac-microservice.cluster-chs4wwq0ay1g.us-west-2.rds.amazonaws.com:5432 \
  ec2-user@35.162.48.162
```

You will need to add the following configurations use by the app. Run the npx ampx sandbox secret set --profile ${} secret set ${configname} and then enter, it will prompt for the value, copy the value.

```
### to add secrets, this will create parameter store
### Cognito Setup to allow login using google SSO
npx ampx sandbox secret set --profile nxg-amplify-dev GOOGLE_CLIENT_ID
[PLEASE ASK THE ADMIN FOR THE VALUE]

npx ampx sandbox secret set --profile nxg-amplify-dev GOOGLE_CLIENT_SECRET
[PLEASE ASK THE ADMIN FOR THE VALUE]

### Camunda Configuration
npx ampx sandbox --profile nxg-amplify-dev secret set ZEEBE_CLIENT_ID
[PLEASE ASK THE ADMIN FOR THE VALUE]

npx ampx sandbox --profile nxg-amplify-dev secret set ZEEBE_CLIENT_SECRET
[PLEASE ASK THE ADMIN FOR THE VALUE]
```

Connection to your database and generate the schema.sql.ts
Make sure that you already run the script for the ssh tunnelling.

```
npx ampx sandbox  --profile nxg-amplify-dev secret set SQL_CONNECTION_STRING
[PLEASE ASK THE ADMIN FOR THE VALUE]
```

Edit your hosts file to include the domain of your RDS endpoint and point it to local (example)

```
127.0.0.1       jac-microservice-instance-1.chs4wwq0ay1g.us-west-2.rds.amazonaws.com
```

Add this configuration for the SSL verification to your RDS (Download the certificate us-west-2-bundle.pem or ask the admin)

```
npx ampx sandbox secret --profile nxg-amplify-dev set RDS_SSL_CERTIFICATE < us-west-2-bundle.pem
```

Then run the following to generate the schema

```
npx ampx generate  --profile nxg-amplify-dev schema-from-database --connection-uri-secret SQL_CONNECTION_STRING --out amplify/data/schema.sql.ts --ssl-cert-secret RDS_SSL_CERTIFICATE
```

Once you've already setup and the schema has been generated, you will need to change your SQL_CONNECTION_STRING to the actual RDS connection string. It's because you will only need the connection from your local to RDS when generating the schema, but when you run the sandbox, it will need to connect to your RDS from lmabda functions deployed in to the cloud.

```
npx ampx sandbox  --profile nxg-amplify-dev secret set SQL_CONNECTION_STRING
[PLEASE ASK THE ADMIN FOR THE VALUE]
```

At this stage, you will need to remove your entry in your hosts file that you added earlier, otherwise, it will refence your localhost. You may need to switch it back again when generating updated schema.

Run the following command when running your sandbox.

```
npx ampx sandbox --profile nxg-amplify-dev
```
