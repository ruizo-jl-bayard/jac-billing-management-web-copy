import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { getS3Objects } from './functions/getS3Objects/resource.js';
import { sayHello } from './functions/sayHello/resource.js';
import { saveForm } from './functions/saveForm/resource.js';
import { storage } from './storage/resource.js';
import { triggerCamunda } from './functions/triggerCamunda/resource.js';
import { saveMetadata } from './functions/saveMetadata/resource.js';

defineBackend({
  auth,
  data,
  sayHello,
  getS3Objects,
  saveForm,
  storage,
  triggerCamunda,
  saveMetadata
})
