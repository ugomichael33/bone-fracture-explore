import AWS from 'aws-sdk';

// Configure AWS SDK using Cognito Identity Pool
AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  }),
});

export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'dataspan.frontend-home-assignment' },
});
