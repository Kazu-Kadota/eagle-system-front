export function decodeBase64Worker(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/base64.ts', import.meta.url),
      {
        type: 'module',
      },
    );

    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(`Worker error: ${error.message}`));
      worker.terminate();
    };

    worker.postMessage(message);
  });
}
