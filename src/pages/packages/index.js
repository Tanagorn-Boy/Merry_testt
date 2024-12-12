import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar, Footer } from "@/components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { CustomButton } from "@/components/CustomUi";

export default function MerryPackage() {
  // สร้าง state สำหรับเก็บข้อมูล package
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/packages");
        setPackages(response.data); // 
        setLoading(false);
      } catch (err) {
        setError("Error fetching packages");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []); 

  // ถ้ากำลังโหลด หรือเกิดข้อผิดพลาด ให้แสดงข้อความ
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <NavBar />
      <section className="bg-utility-primary p-5">
        <article className="flex flex-col gap-2 pb-5 bg-utility-primary pt-5 p-4">
          <div>
            <h3 className="text-third-700 font-medium">MERRY MEMBERSHIP</h3>
          </div>
          <div>
            <h1 className="text-3xl text-second-500 font-bold">
              Join us and start <br /> matching
            </h1>
          </div>
        </article>

        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className="bg-utility-primary border-2 mt-5 rounded-box p-4 gap-3 flex flex-col"
          >
            {/* icon package */}
            <div className="bg-slate-600 rounded-2xl w-16 h-16 flex flex-row items-center justify-center">
              {/* แสดงรูปภาพจาก URL */}
              <img
                src={pkg.icon_url} // ใช้ icon_url เป็น src ของรูปภาพ
                alt={pkg.title} // ใส่ alt เพื่อช่วยในการเข้าถึงข้อมูล
                className="w-12 h-12 object-cover" // 
              />
            </div>
            {/* Title package */}
            <div>
              <h1 className="text-3xl font-bold">{pkg.title}</h1>
            </div>
            <div className="flex gap-2 "> 
            <h2 className="text-2xl text-black"> {pkg.currency_code} </h2> 
            <h2 className="text-2xl text-black"> {pkg.price} </h2> 
            <h2 className="text-2xl text-gray-400"> /month </h2>
 
            </div>
            {/* Cost package */}
            <div>
              <h1>
                {pkg.cost} <span>{pkg.duration}</span>
              </h1>
            </div>
            {/* Details */}
            {pkg.details && Array.isArray(pkg.details) && pkg.details.length > 0 ? (
              pkg.details.map((detail, index) => (
                <div key={index}>
                  <h1>{detail}</h1>
                </div>
              ))
            ) : (
              <div>No details available</div>
            )}
            <hr />

            <CustomButton className="flex flex-shrink-0">Choose Package</CustomButton>
          </article>
        ))}
      </section>

      <Footer />
    </>
  );
}
