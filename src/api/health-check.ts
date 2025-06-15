import "server-only";

import { API_BASE_URL } from "@/config";

export const healthCheck = async () => {
  const url = `${API_BASE_URL}/up`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          reject(`API Health Check Failed: ${res.status}`);
        }
        resolve(true);
      })
      .catch((error) => {
        reject(
          `API Health Check Failed: ${error.message}, Request URL: ${url}`
        );
      });
  });
};
