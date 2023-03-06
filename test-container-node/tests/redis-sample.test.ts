const redis = require("async-redis");
const { GenericContainer } = require("testcontainers");

describe("Redis", () => {
    let container: { getMappedPort: (arg0: number) => any; getHost: () => any; stop: () => any; };
    let redisClient: {
        [x: string]: any; quit: () => any; 
};

    beforeAll(async () => {
        container = await new GenericContainer("redis")
            .withExposedPorts(6379)
            .start();
        
        redisClient = redis.createClient(
            container.getMappedPort(6379),
            container.getHost(),
        );
    });

    afterAll(async () => {
        await redisClient.quit();
        await container.stop();
    });

    it("works", async () => {
        await redisClient.set("key", "val");
        expect(await redisClient.get("key")).toBe("val");
    });
});