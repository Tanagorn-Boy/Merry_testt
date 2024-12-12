import { NavBar, Footer } from "@/components/NavBar";
import { GoHeartFill } from "react-icons/go";
import { CustomButton } from "@/components/CustomUi";

export default function MerryPackage() {
  const packages = [
    {
      name: "Basic",
      cost: 59.0,
      details: [
        "‘Merry’ more than a daily limited",
        "Up to 25 Merry per day",
      ],
      icon: <GoHeartFill className="w-8 h-8" />,
    },
    {
      name: "Platinum",
      cost: 99.0,
      details: [
        "Enjoy unlimited ‘Merry’",
        "Exclusive features for premium users",
      ],
      icon: <GoHeartFill className="w-8 h-8" />,
    },
    {
      name: "Premium",
      cost: 140.0,
      details: [
        "All-inclusive ‘Merry’ experience",
        "Priority customer support",
      ],
      icon: <GoHeartFill className="w-8 h-8" />,
    },
  ];

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

        {packages.map((pkg, index) => (
          <article
            key={index}
            className="bg-utility-primary border-2 mt-5 rounded-box p-4 gap-3 flex flex-col"
          >
            {/* icon package */}
            <div className="bg-slate-600 rounded-2xl w-16 h-16 flex flex-row items-center justify-center">
              {pkg.icon}
            </div>
            {/* Title package */}
            <div>
              <h1 className="text-3xl font-bold">{pkg.name}</h1>
            </div>
            {/* Cost package */}
            <div>
              <h1>
                THB {pkg.cost.toFixed(2)} <span>/Month</span>
              </h1>
            </div>
            {/* details */}
            {pkg.details.map((detail, detailIndex) => (
              <div key={detailIndex}>
                <h1>{detail}</h1>
              </div>
            ))}
            <hr />
            <CustomButton className="flex flex-shrink-0">
              Choose Package
            </CustomButton>
          </article>
        ))}
      </section>
      <Footer />
    </>
  );
}
