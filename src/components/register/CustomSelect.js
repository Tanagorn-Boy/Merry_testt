// import React from "react";
// import Select, { components } from "react-select";

// // ตัวเลือกของ Dropdown Indicator
// const DropdownIndicator = (props) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       <span>▼</span>
//     </components.DropdownIndicator>
//   );
// };

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     borderRadius: "0.650rem", // กำหนดขอบมน
//     padding: "0.2rem", // เพิ่มพื้นที่ภายใน

//     // กำหนดให้กว้างเต็มที่
//     // กำหนดความสูงให้มากขึ้น
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     color: "blue", // กำหนดสีให้ Dropdown Indicator
//     padding: "0.1rem", // เพิ่มพื้นที่ภายในของไอคอน
//   }),
//   multiValue: (base) => ({
//     ...base,
//     backgroundColor: "#E0E7FF", // กำหนดสีพื้นหลังของตัวเลือกที่เลือก
//     borderRadius: "1.000rem", // กำหนดขอบมน
//     color: "#3B82F6", // กำหนดสีข้อความ
//   }),
// };

// export default function CustomSelect({ formData, updateHobbies }) {
//   const handleChange = (selectedOptions) => {
//     updateHobbies(selectedOptions); // เรียกใช้ฟังก์ชัน updateHobbies ที่ส่งจาก RegisterPage
//   };

//   return (
//     <>
//       <label
//         htmlFor="preferences"
//         className="block text-sm font-semibold text-gray-700"
//       >
//         Hobbies / Interests (Maximum 10)
//       </label>
//       <Select
//         closeMenuOnSelect={false}
//         components={{ DropdownIndicator }}
//         isMulti
//         styles={customStyles}
//         name="hobbies"
//         onChange={handleChange} // เมื่อเลือกตัวเลือกจะเรียก handleChange
//         value={formData.hobbies} // ใช้ค่าปัจจุบันจาก formData
//         options={[
//           { value: "1", label: "Reading" },
//           { value: "2", label: "Traveling" },
//           { value: "3", label: "Cooking" },
//           { value: "4", label: "Gaming" },
//           { value: "5", label: "Swimming" },
//           { value: "6", label: "Hiking" },
//           { value: "7", label: "Photography" },
//           { value: "8", label: "Gardening" },
//           { value: "9", label: "Music" },
//           { value: "10", label: "Dancing" },
//           { value: "11", label: "Crafting" },
//           { value: "12", label: "Writing" },
//           { value: "13", label: "Yoga" },
//           { value: "14", label: "Cycling" },
//           { value: "15", label: "Painting" },
//           { value: "16", label: "Running" },
//           { value: "17", label: "Fishing" },
//           { value: "18", label: "Knitting" },
//           { value: "19", label: "Martial Arts" },
//           { value: "20", label: "Collecting Stamps" },
//         ]}
//       />
//     </>
//   );
// }
