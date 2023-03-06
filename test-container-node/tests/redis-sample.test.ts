import redis from "async-redis";
import type { RedisClientType } from 'redis' 
import { createClient } from 'redis';
import {
    TestContainer,
    GenericContainer,
    StartedTestContainer,
  } from "testcontainers";


describe("Redis", () => {
    let container: TestContainer = new GenericContainer("alpine");
    let startedContainer: StartedTestContainer;
    let redisClient: RedisClientType;

    beforeAll(async () => {
        startedContainer = await new GenericContainer("redis")
            .withExposedPorts(3000)
            .start();
        
        redisClient = createClient({
            socket: {
                host: startedContainer.getHost(),
                port: startedContainer.getMappedPort(3000)
            }
        });
    });

    afterAll(async () => {
        await redisClient.quit();
        await startedContainer.stop();
    });

    it("works", async () => {
        await redisClient.set("key", "val");
        expect(await redisClient.get("key")).toBe("val");
    });
});