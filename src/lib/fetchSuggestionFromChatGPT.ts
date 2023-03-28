export const fetchSuggestionFromChatGPT = () => {
  return fetch("/api/suggestion", {
    cache: "no-store",
  }).then((res) => res.json());
};
