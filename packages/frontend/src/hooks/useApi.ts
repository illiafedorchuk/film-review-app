import useSWR from "swr";

export function useApiGet<T>(url: string, params = {}, send = true) {
  const queryParams = new URLSearchParams(params).toString();
  const { data, error, mutate } = useSWR<T>(
    send ? url + (queryParams ? `?${queryParams}` : "") : null,
    async () => {
      try {
        const response = await fetch(
          url + (queryParams ? `?${queryParams}` : "")
        );
        if (!response.ok) {
          if (response.status !== 409) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch data", error);
        throw error;
      }
    }
  );

  const isLoading = send && !data && !error;

  return { data, error, mutate, isLoading };
}
