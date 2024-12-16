import cloudinary from "cloudinary";
import fs from "fs/promises";

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ฟังก์ชันอัปโหลดไฟล์เดี่ยวไปยัง Cloudinary
const cloudinaryUpload = async (file) => {
  try {
    // อัปโหลดไฟล์ไปยัง Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "test/pic", // โฟลเดอร์ที่ต้องการจัดเก็บบน Cloudinary
      private: true, // กำหนดให้ไฟล์เป็น private
    });

    // ลบไฟล์ชั่วคราวที่เก็บใน server หลังอัปโหลดเสร็จ
    await fs.unlink(file.path);

    // ส่งคืน URL และ publicId ของไฟล์ที่อัปโหลด
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

export { cloudinaryUpload };


const cloudinaryUploadRegister = async (files) => {
  const fileUrls = []; // ชื่อควรเป็นพหูพจน์เพื่อบ่งบอกว่าเป็น array

  // ตรวจสอบว่า files.avatar เป็นอาร์เรย์หรือไม่
  if (!files.avatar || !Array.isArray(files.avatar)) {
    throw new Error(
      "Invalid file structure: files.avatar is undefined or not iterable.",
    );
  }

  for (let file of files.avatar) {
    let result;

    try {
      // อัปโหลดไฟล์ไปยัง Cloudinary
      result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "test/pic",
        private: true,
      });

      // เพิ่มข้อมูล URL และ publicId ลงใน array
      fileUrls.push({
        url: result.secure_url,
        publicId: result.public_id,
      });

      // ลบไฟล์ชั่วคราวออกหลังอัปโหลดเสร็จ
      await fs.unlink(file.path);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // ส่ง error ต่อไปเพื่อจัดการภายนอก
    }
  }

  return fileUrls; // ส่งคืน array ของ URL และ publicId
};

export { cloudinaryUploadRegister };

// utils/upload.js
// import cloudinary from "cloudinary";

// // ตั้งค่า Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ฟังก์ชันการอัปโหลดไฟล์ไปที่ Cloudinary
// export const cloudinaryUpload = async (files) => {
//   if (!files || !files.avatar) return null;

//   const avatar = files.avatar[0]; // ดึงไฟล์ avatar
//   const result = await cloudinary.v2.uploader.upload(avatar.path, {
//     folder: "avatars", // ระบุ folder ที่จะเก็บไฟล์ใน Cloudinary
//     resource_type: "image",
//   });

//   return result.secure_url; // ส่งกลับ URL ของภาพที่อัปโหลด
// };