// /pages/api/proxy.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const EXTERNAL_API_URL =
  process.env.EXTERNAL_API_URL ||
  'https://jsonplaceholder.typicode.com/todos/10';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, url, headers, body } = req;

    console.log('proxy');

    // Construct the URL to forward the request to
    const targetUrl = `${EXTERNAL_API_URL}${url?.replace('/api', '')}`;

    // Forward the request to the external API
    const response = await axios({
      method,
      url: targetUrl,
      headers: {
        ...headers,
        // host: EXTERNAL_API_URL, // Optionally set a custom host header if needed
      },
      data: body,
    });

    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors from the external API
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        message: error.message,
        error: error.response?.data || null,
      });
    } else {
      res.status(500).json({
        message:
          'An error occurred while forwarding the request to the external API.',
        error: null,
      });
    }
  }
}
