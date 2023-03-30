export const fetchImages = () => {
  return fetch("/api/getImages", {
    cache: "no-store",
  }).then((res) => res.json());
};
