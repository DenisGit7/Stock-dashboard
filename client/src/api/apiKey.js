export const apiKey = async () => {
  const key = await fetch("/api/key")
    .then((response) => response.json())
    .then((data) => {
      const apiKey = data.apiKey;
      console.log(apiKey);
      return apiKey;
    })
    .catch((error) => console.error("Error fetching API key:", error));
  return key;
};

export default apiKey;
