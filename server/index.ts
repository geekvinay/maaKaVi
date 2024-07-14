import app from "./src/app";
import logger from "./src/utils/logger/logger";
import kaviRouter from "./src/routes/kavi/kavi";

const PORT = process.env.PORT || 3030;

// IIFE to initialize and start the server
(async () => {
  await kaviRouter.initializeApp(); // Ensure the app is initialized before starting the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server running on port ${PORT}`);
  });
})();
