import app from './src/app';
import logger from "./src/utils/logger/logger";

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
