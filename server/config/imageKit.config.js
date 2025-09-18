import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();

const  imagekit = new ImageKit({
  publicKey : process.env.IMAGE_PUBLIC_KEY,
  privateKey : process.env.IMAGE_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGE_URL_ENDPOINT
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
