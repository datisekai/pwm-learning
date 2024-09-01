import axios from "axios";
import axiosClient from "../config/axiosClient";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const generateAvatar = (email: string) => {
  return `https://ui-avatars.com/api/?background=EA8143&color=fff&name=${email}`;
};

export const formatNumber = (value: number) => {
  return value.toLocaleString("en-IN", {
    maximumSignificantDigits: 3,
  });
};

export const getImageServer = (filename: string) => {
  if (filename.includes("https://") || filename.includes("http://"))
    return filename;
  return `${process.env.NEXT_PUBLIC_SERVER_URL}/images/${filename}`;
};

const UPLOAD_NAME = process.env.NEXT_PUBLIC_UPLOAD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const upload = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${UPLOAD_NAME}/image/upload`,
});

export const uploadImg = async (file: any) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET as string);
  const imageData = await upload.post("/", formData);
  return imageData.data.url;
};

export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

interface Attribute {
  id: number;
  name: string;
  attributeId: number;
}

export function getCombinationsByAttributeId(arr: Attribute[]): Attribute[][] {
  const attributeMap: { [key: number]: Attribute[] } = {};
  arr.forEach((attribute) => {
    const { id, name, attributeId } = attribute;
    if (!attributeMap[attributeId]) {
      attributeMap[attributeId] = [];
    }
    attributeMap[attributeId].push({ id, name, attributeId });
  });

  const result: Attribute[][] = [];
  function getCombinationsHelper(i: number, combination: Attribute[]) {
    if (i === keys.length) {
      result.push(combination);
      return;
    }

    const attributeId = keys[i];
    const attributes = attributeMap[attributeId];
    for (let j = 0; j < attributes.length; j++) {
      const newCombination = [...combination, attributes[j]];
      getCombinationsHelper(i + 1, newCombination);
    }
  }

  const keys = Object.keys(attributeMap).map(Number);
  getCombinationsHelper(0, []);
  return result;
}

export function isNumber(value: string): boolean {
  return !isNaN(+value);
}
