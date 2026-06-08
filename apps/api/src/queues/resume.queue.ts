import { Queue } from "bullmq";

import Redis from "ioredis";

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const resumeQueue = new Queue("resume-analysis", {
  connection,
});
