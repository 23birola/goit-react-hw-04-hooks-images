import axios from "axios";

const fetchImages = async (query, page = 1) => {
  const pixabayKEY = "21757079-036beeeb18b1a04124bd9f213";
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${pixabayKEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

export default fetchImages;
