import { createClient } from "redis";

// TODO: refactor this
// persistence/
//   providers/redis.ts
//   task_timestamps/
//      index
//      redis

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

export default client;

export async function set(key: string, value: any) {
  return quickRedis((client) => client.set(key, value));
}

export async function get(key: string) {
  return quickRedis((client) => client.get(key));
}

export async function save() {
  return quickRedis((client) => client.save());
}

export async function quickRedis<T = any>(
  cb: (arg: typeof client) => Promise<T>
) {
  await client.connect();
  const val: T = await cb(client);
  await client.quit();
  return val;
}
