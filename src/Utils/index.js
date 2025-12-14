import axios from "axios";

export const imageUpload = async imageData => {

    const formData = new FormData();
    formData.append('image', imageData);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const { data } = await axios.post(image_API_URL, formData);
    // return data?.data?.display_url
    return data?.data?.url;
}