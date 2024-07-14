import express from "express";
import logger from "../../utils/logger/logger";

export const importDynamic = new Function(
  "modulePath",
  "return import(modulePath)"
);


// Initialize express app
const expressApp = express();
expressApp.use(express.json()); // Middleware to parse JSON requests

// Function to initialize the Gradio app
const initializeApp = async () => {
  try {
    const { Client } = await importDynamic("@gradio/client");
    const app = await Client.connect(process.env.HF_SPACE ?? "", {
      hf_token: `hf_${process.env.HF_TOKEN ?? ""}`,
    });
    const app_info = await app.view_api();
    //console.log(app_info);
    return app;
  } catch (error) {
    logger.error("Failed to initialize app:", error);
    process.exit(1); // Exit if cannot initialize app
  }
};

// Router setup
const kaviRouter = express.Router();

// Make a route to predict the model based on context and query received from the client
kaviRouter.post("/conversation", async (req, res) => {
  try {
    // Get the context and query from the request body
    const { context, query } = req.body;

    // Assuming `app` is available here, if not, consider fetching it from a broader scope or initializing it differently
    const app = await initializeApp(); // This should be optimized as per actual use case
    const response = await app.predict("/predict", [context, query]);

    // Send the response back to the client
    res.json(response);
  } catch (error) {
    logger.error("Error in prediction:", error);
    res.status(500).send("Error processing your request");
  }
});

export default { kaviRouter, initializeApp };
