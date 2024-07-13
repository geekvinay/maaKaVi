import { Request, Response, NextFunction } from 'express';

// Custom middleware to format response
export function formatResponse(req: Request, res: Response, next: NextFunction) {
    // Store the original res.json function
    const originalJson = res.json;

    // Override the res.json function
    res.json = function(data: any): any {
        // Construct the formatted response
        const formattedResponse = {
            success: true,
            data: data,
            dataFrom: 'maaKaVi'
        };

        // Call the original res.json with the formatted response
        originalJson.call(res, formattedResponse);
    };

    // Move to the next middleware or route handler
    next();
}
