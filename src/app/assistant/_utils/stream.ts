type Options = {
  signal: RequestInit["signal"];
};

export async function getStream(
  prompt: string,
  options: Partial<Options> = {},
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
}

export async function* decodeStreamToText(
  data: ReadableStream<Uint8Array> | null,
): AsyncIterableIterator<string> {
  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      try {
        yield decoder.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
