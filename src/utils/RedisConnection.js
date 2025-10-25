import {createClient} from 'redis'


// Create the client
// By default, it connects to redis://127.0.0.1:6379
const redisClient = createClient()

// If your resid client runs on diff port
// const redisClient = createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379'
// });

// --- Handle Errors ---
redisClient.on("error", (err) => {
  console.error('Redis Client Error:', err);
});

// --- Connect the Client ---
// We create an async IIFE (Immediately Invoked Function Expression)
// to connect and await the connection.
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// Export the connected client
export default redisClient;