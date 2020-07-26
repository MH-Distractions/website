import { promisify } from "util";
import redis from "redis";

export class CacheClient {
  client = null;

  constructor() {
    this.client = redis.createClient();

    this.get = promisify(this.client.get).bind(this.client);
    this.set = promisify(this.client.set).bind(this.client);
    this.ttl = promisify(this.client.ttl).bind(this.client);
    this.del = this.client.del.bind(this.client);
  }
}
