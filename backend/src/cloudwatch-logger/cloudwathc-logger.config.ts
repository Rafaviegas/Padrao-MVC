export const cloudwatchConfig = {
    logGroupName: 'NestAppLogs',
    logStreamName: 'AppServiceLogs',
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
  