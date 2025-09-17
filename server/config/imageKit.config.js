import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function fileUpload(file, fileName) {
  try {
    const result = await imagekit.upload({
      file: file, //required
      fileName: fileName,
    });
  
    return result;
  } catch (error) {
    console.log(error)
  }
}

export default fileUpload;
