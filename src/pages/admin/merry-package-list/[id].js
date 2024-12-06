import { AdminSideBar } from "@/components/admin/AdminSideBar";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

function MerryPackageEdit() {
  const router = useRouter();
  const { id } = router.query; // ดึง `id` จาก URL

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // deleteDetail Step3.3: เรียกใช้ setIsModalOpen เพื่อ false ปิดหน้า Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

  const confirmDelete = (id) => {
    setIsModalOpen(true);
  };

  // แก้ไขฟังก์ชัน handleDelete ให้ลบข้อมูลจากฐานข้อมูล
  const handleDeletePackage = async () => {
    try {
      // เรียก API เพื่อลบข้อมูลในฐานข้อมูล
      await axios.delete(`http://localhost:3000/api/admin/packages/${id}`);
      router.push("/admin/merry-package-list");
      //setDetails(details.filter((detail) => detail.id !== detailToDelete));
      // ปิด Modal
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package.");
    }
  };

  const [packageData, setPackageData] = useState({
    name_package: "",
    litmit_match: "",
    description: "",
    price: 0,
    icon_url: "",
  });
  const [newIcon, setNewIcon] = useState(null); // เก็บรูปภาพใหม่ที่อัปโหลด

  //const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([{ id: 1, text: "" }]); // state สำหรับเก็บรายการ Detail โดยเริ่มต้นที่ 1 และ text = ""
  const addDetail = () => {
    setDetails([...details, { id: details.length + 1, text: "" }]);
  };

  // ลบ Detail
  const handleDelete = (id) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  // อัปเดต Detail
  const updateDetail = (id, value) => {
    setDetails(
      details.map((detail) =>
        detail.id === id ? { ...detail, text: value } : detail,
      ),
    );
  };

  useEffect(() => {
    if (id && !isSaving) {
      fetchPackageData();
    }
  }, [id, isSaving]);

  const fetchPackageData = async () => {
    try {
      //setLoading(true);
      const res = await axios.get(`/api/admin/packages/${id}`);
      const packageDetails = JSON.parse(res.data.description || "[]");
      setDetails(
        packageDetails.map((text, index) => ({ id: index + 1, text })),
      );
      setPackageData(res.data);
      //  setLoading(false);
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewIcon(file); // เก็บรูปภาพใหม่ใน state
      const previewUrl = URL.createObjectURL(file); // สร้าง URL ชั่วคราวสำหรับรูปภาพ
      setPackageData({ ...packageData, icon_url: previewUrl }); // อัปเดต state ให้แสดง preview
    }
  };

  const handleRemoveIcon = () => {
    setNewIcon(null); // ลบรูปภาพใหม่
    setPackageData({ ...packageData, icon_url: "" }); // ลบรูปภาพเดิม
  };

  const handleSave = async () => {
    if (!id) {
      alert("Invalid package ID.");
      return;
    }

    const formData = new FormData();
    formData.append("name_package", packageData.name_package);
    formData.append("litmit_match", packageData.litmit_match);
    formData.append("price", packageData.price);
    formData.append("description", JSON.stringify(details.map((d) => d.text)));
    if (newIcon) formData.append("icon", newIcon); // เพิ่มรูปภาพใหม่ถ้ามี

    try {
      const response = await axios.put(`/api/admin/packages/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ตรวจสอบว่า API ส่ง URL ของรูปภาพใหม่กลับมาหรือไม่
      if (response.data.icon_url) {
        setPackageData((prev) => ({
          ...prev,
          icon_url: response.data.icon_url, // ใช้ URL ใหม่จาก API
        }));
      }

      alert("Package updated successfully!");
      router.push("/admin/merry-package-list");
    } catch (error) {
      console.error("Error updating package:", error);
      console.log(error);

      alert("Failed to update package.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar />
      {/* Main Content */}
      <main className="flex-1">
        <AdminHeader
          title="Add Package"
          buttons={[
            {
              label: "Cancel",
              type: "secondary",
              onClick: () => router.push("/admin/merry-package-list"),
            },
            {
              label: "Edit",
              type: "primary",
              onClick: handleSave,
            },
          ]}
        />
        <div className="mx-auto max-w-5xl p-8">
          <div className="mx-auto rounded-lg bg-white p-8 shadow">
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="packageName"
                  className="block font-medium text-gray-700"
                >
                  Package name <span className="text-red-500">*</span>
                </label>
                <input
                  id="packageName"
                  type="text"
                  placeholder="Enter package name"
                  value={packageData.name_package}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      name_package: e.target.value,
                    })
                  }
                  className="mt-1 h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="merryLimit"
                  className="block font-medium text-gray-700"
                >
                  Merry limit <span className="text-red-500">*</span>
                </label>
                <select
                  id="merryLimit"
                  value={packageData.litmit_match}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      litmit_match: e.target.value,
                    })
                  }
                  className="mt-1 h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm"
                >
                  <option value=""></option>
                  <option value="25">25</option>
                  <option value="45">45</option>
                  <option value="70">70</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="packageName"
                  className="block font-medium text-gray-700"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="text"
                  value={packageData.price}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      price: e.target.value,
                    })
                  }
                  className="mt-1 h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm"
                />
              </div>
              <div>
                <input className="mt-1 hidden h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm" />
              </div>
            </div>

            {/* Upload Icon */}
            <div className="mt-8">
              <label className="block font-medium text-gray-700">
                Icon <span className="text-red-500">*</span>
              </label>
              <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-3xl border">
                {/* แสดงภาพเดิมหรือภาพใหม่ */}
                {newIcon || packageData.icon_url ? (
                  <div className="relative h-full w-full">
                    <img
                      src={
                        newIcon
                          ? URL.createObjectURL(newIcon) // แสดง preview ของภาพใหม่
                          : packageData.icon_url // แสดงภาพเดิมจาก database
                      }
                      alt="Icon"
                      className="h-full w-full rounded-3xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveIcon}
                      className="absolute right-2 top-2 h-6 w-6 rounded-full bg-red-500 text-white"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      id="iconUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="iconUpload"
                      className="flex cursor-pointer flex-col items-center justify-center text-primary-500"
                    >
                      <span className="text-3xl font-bold">+</span>
                      <p className="text-sm font-medium">Upload Icon</p>
                    </label>
                  </>
                )}
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Package Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Package Detail
              </h3>

              {/* addDetail Step3:
               1. ใช้ .map เพื่อวนลูป State: details
               2. key={detail.id}  ใช้ id เป็น key เพื่อช่วย React แยกแยะ element แต่ละตัว 
               3. แสดงค่าจาก detail.text ใน <input>
              */}
              {details.map((detail) => (
                <div
                  key={detail.id}
                  className="mt-4 flex items-center space-x-4"
                >
                  <span className="cursor-move text-gray-400">⋮⋮</span>
                  <label className="w-full">
                    <input
                      type="text"
                      placeholder="Enter detail"
                      value={detail.text}
                      //updateDetail Step1: เก็บค่า key={detail.id} และ e.target.value
                      onChange={(e) => updateDetail(detail.id, e.target.value)}
                      id={`detail-${detail.id}`}
                      name={`detail-${detail.id}`}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </label>
                  {/* deleteDetail Step1: เรียกใช้ function confirmDelete และส่งค่า detail.id ของแถวนั้นๆ */}
                  <button
                    onClick={() => handleDelete(detail.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {/* Add Detail Button */}
              <div className="mt-6">
                <button
                  // addDetail Step1:  onClick to Function > addDetail
                  onClick={addDetail}
                  className="rounded-lg bg-pink-100 px-4 py-2 text-pink-500 hover:bg-pink-200"
                >
                  + Add detail
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex max-w-5xl justify-end">
            <button
              onClick={() => confirmDelete(id)}
              className="font-bold text-fourth-700 hover:underline"
            >
              Delete Package
            </button>
          </div>
        </div>
      </main>
      {/* Delete Confirm Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen} // isModalOpen = true เปิดใช้งาน
        onClose={closeModal} // deleteDetail Step3.2: เรียกใช้ function closeModal เพื่อยกเลิก
        onConfirm={handleDeletePackage} // ลบรายการโดยกดยืนยัน deleteDetail Step5: เรียกใข้ function: handleDelete
        message="Are you sure you want to delete this detail?"
        confirmLabel="Yes, I want to delete"
        cancelLabel="No, I don't want"
      />
    </div>
  );
}
export default MerryPackageEdit;

/*
<div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Edit Package</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Package Name</label>
            <input
              type="text"
              value={packageData.name_package}
              onChange={(e) =>
                setPackageData({ ...packageData, name_package: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Merry Limit</label>
            <input
              type="number"
              value={packageData.litmit_match}
              onChange={(e) =>
                setPackageData({ ...packageData, litmit_match: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={packageData.description}
              onChange={(e) =>
                setPackageData({ ...packageData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/merry-package-list")}
            className="ml-2 rounded-md bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
*/
