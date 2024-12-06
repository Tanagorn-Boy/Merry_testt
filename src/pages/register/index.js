import { useState } from "react";
import { CustomButton } from "@/components/CustomUi";
import { IoMdArrowBack } from "react-icons/io";
import BackgroundPage from "@/components/BackgroundPage";
import { NavBar } from "@/components/NavBar";
// import CustomSelect from "@/components/register/CustomSelect";
import { useAuth } from "../../contexts/AuthContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [sexualIdentities, setSexualIdentities] = useState("");
  const [sexualPreferences, setSexualPreferences] = useState("");
  const [racialPreferences, setRacialPreferences] = useState("");
  const [meetingInterests, setMeetingInterests] = useState("");
  const [hobbies, sethobbies] = useState("");

  console.log("Testpassword", password);
  console.log("Testconfirm", confirm);

  const [avatar, setAvatars] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("city", city);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm", confirm);
    formData.append("sexualIdentities", sexualIdentities);
    formData.append("sexualPreferences", sexualPreferences);
    formData.append("racialPreferences", racialPreferences);
    formData.append("meetingInterests", meetingInterests);
    formData.append("hobbies", JSON.stringify(hobbies));

    // console.log("TestHobbies", hobbies);
    // console.log("Testpassword", password);
    // console.log("Testconfirm", confirm);

    for (let avatarKey in avatar) {
      formData.append("avatar", avatar[avatarKey]);
    }
    register(formData);
  };

  const updateHobbies = (selectedOptions) => {
    sethobbies(selectedOptions); // รับ selectedOptions เป็น array
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newAvatars = { ...avatar };

    // ตรวจสอบว่าอัปโหลดไฟล์มากกว่า 5 ไฟล์หรือไม่
    files.forEach((file, index) => {
      const uniqueId = Date.now() + index;
      if (Object.keys(newAvatars).length < 5) {
        newAvatars[uniqueId] = file;
      }
    });

    setAvatars(newAvatars);
  };
  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();

    // สร้างสำเนาของ avatars และลบ avatar ที่ต้องการ
    const updatedAvatars = { ...avatar };
    delete updatedAvatars[avatarKey]; // ลบ avatar ตาม avatarKey

    // อัปเดต state โดยการใช้สำเนาที่แก้ไขแล้ว
    setAvatars(updatedAvatars);
  };

  //useState
  // เก็บสถานะของขั้นตอน (step)
  const [step, setStep] = useState(1);

  //Step Navigation Function
  // ย้อนกลับไปหน้าก่อนหน้า
  const goToPrevStep = (e) => {
    e.preventDefault(); // หยุดการรีเฟรชหน้าเพจ
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // ไปหน้าถัดไป
  const goToNextStep = (e) => {
    e.preventDefault(); // หยุดการรีเฟรชหน้าเพจ
    if (password !== confirm) {
      alert("Password และ Confirm Password ไม่ตรงกัน!");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("pages/login"); // เปลี่ยนเส้นทางไปยังหน้าสำเร็จ
    }
  };

  return (
    <>
      <NavBar />
      <BackgroundPage className="flex items-center justify-center bg-utility-bgMain">
        <div className="">
          <div className="ml-3 lg:mt-[-300px]">
            {" "}
            <div className="lg:mt-32 lg:flex lg:h-[145px] lg:w-full lg:items-center lg:justify-between lg:px-8">
              {/* Header */}
              <div className="">
                <div className="lg:head lg:mr-8 lg:h-[145px] lg:w-[453px] lg:text-left">
                  <h2 className="font-nunito text-[14px] font-semibold">
                    Register
                  </h2>
                  <h1 className="font-nunito text-[32px] font-extrabold text-second-500 lg:text-[46px]">
                    Join us and start matching
                  </h1>
                </div>
              </div>

              {/* Step Indicator นับตัวเลยหน้าใช้.map*/}
              <div className="mt-5 flex justify-center gap-[16px] lg:h-[80px] lg:w-[430px]">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`tab relative flex h-auto w-auto items-center justify-start rounded-[8px] border-[1px] lg:tab lg:relative lg:h-[80px] lg:gap-[8px] lg:rounded-[16px] ${
                      step === num ? "border-second-500" : "border-gray-200"
                    } transform transition-all duration-300 ease-in-out ${
                      step === num ? "scale-105" : "scale-100"
                    }`}
                  >
                    {/* หมายเลข (1, 2, 3) อยู่ตรงกลางด้านซ้าย */}
                    <span
                      className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-fourth-200 text-center font-nunito text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500 lg:h-[50px] lg:w-[50px] lg:space-x-[12px] ${
                        step === num
                          ? "bg-fourth-200 text-second-500"
                          : "bg-gray-200 text-gray-500"
                      } ml-0 transition-all duration-300 ease-in-out`}
                    >
                      {num}
                    </span>

                    {/* Step และข้อความที่เกี่ยวข้องจะอยู่ทางขวา */}
                    {step === num && (
                      <div className="transition-all duration-300 ease-in-out lg:ml-auto">
                        <h2 className="text-left font-nunito font-medium lg:text-[12px] lg:leading-[18px]">
                          Step {num}/3
                        </h2>
                        {num === 1 && (
                          <div className="flex w-full items-center justify-between">
                            <h1 className="text-center font-nunito text-[16px] font-extrabold leading-[24px] text-second-500">
                              Basic Information
                            </h1>
                          </div>
                        )}
                        {num === 2 && (
                          // <h1 className="text-center font-nunito text-[16px] font-extrabold text-second-500 lg:text-right lg:leading-[24px]">
                          //   Identities and Interests
                          // </h1>

                          <h1 className="font-nunito text-[12px] font-extrabold text-second-500 lg:text-[12px] lg:leading-[24px]">
                            Identities and Interests
                          </h1>
                        )}
                        {num === 3 && (
                          <h1 className="font-nunito text-[16px] font-extrabold leading-[24px] text-second-500">
                            Upload Photos
                          </h1>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-5 px-4 lg:mt-10 lg:w-full lg:max-w-4xl">
            {step === 1 && (
              <div className="grid-cols-1 gap-6 lg:grid lg:grid-cols-2">
                <label className="form-control">
                  <span className="label-text">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                    placeholder="Name"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text">Date of Birth</span>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text">Location</span>
                  <select
                    name="location"
                    value={location} // ใช้ value เพื่อควบคุมการเลือก
                    onChange={(event) => setLocation(event.target.value)} // อัพเดตค่าของ location เมื่อมีการเปลี่ยนแปลง
                    className="select select-bordered h-[48px] rounded-[8px] border-[1px]"
                  >
                    <option value="" disabled>
                      Location
                    </option>{" "}
                    <option value="Star Wars">Star Wars</option>
                    <option value="Harry Potter">Harry Potter</option>
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text">City</span>
                  <select
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="select select-bordered h-[48px] rounded-[8px] border-[1px]"
                  >
                    <option value="" disabled>
                      City
                    </option>{" "}
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text">Username</span>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                    placeholder="Username"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                    placeholder="Email"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                    placeholder="Password"
                  />
                </label>
                <label className="form-control">
                  <span className="label-text">Confirm Password</span>
                  <input
                    type="password"
                    name="confirm"
                    value={confirm}
                    onChange={(event) => {
                      setConfirm(event.target.value);
                    }}
                    className="input input-bordered h-[48px] rounded-[8px] border-[1px]"
                    placeholder="Confirm Password"
                  />
                </label>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text">Sexual identities</span>
                  <select
                    className="select select-bordered"
                    name="sexualIdentities"
                    value={sexualIdentities}
                    onChange={(event) => {
                      setSexualIdentities(event.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Sexual Identity
                    </option>{" "}
                    {/* ใช้ value="" สำหรับ option disabled */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text">Sexual preferences</span>
                  <select
                    className="select select-bordered"
                    name="sexualPreferences"
                    value={sexualPreferences}
                    onChange={(event) => {
                      setSexualPreferences(event.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Sexual Preference
                    </option>{" "}
                    {/* ใช้ value="" สำหรับ option disabled */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text">Racial preferences</span>
                  <select
                    className="select select-bordered"
                    name="racialPreferences"
                    value={racialPreferences}
                    onChange={(event) => {
                      setRacialPreferences(event.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Racial Preference
                    </option>{" "}
                    {/* ใช้ value="" สำหรับ option disabled */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </label>

                <label className="form-control">
                  <span className="label-text">Meeting interests</span>
                  <select
                    className="select select-bordered"
                    name="meetingInterests"
                    value={meetingInterests}
                    onChange={(event) => {
                      setMeetingInterests(event.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Meeting Interest
                    </option>{" "}
                    {/* ใช้ value="" สำหรับ option disabled */}
                    <option value="1">Casual Dating</option>
                    <option value="2">Short-term Relationship</option>
                    <option value="3">Long-term Relationship</option>
                    <option value="4">Marriage</option>
                    <option value="5">Hookup</option>
                    <option value="6">Social Connections</option>
                    <option value="7">Meeting New People</option>
                    <option value="8">Making Friends</option>
                    <option value="9">Casual Meetups</option>
                    <option value="10">Activity Partner</option>
                    <option value="11">Open Relationship</option>
                    <option value="12">Polyamorous Relationship</option>
                  </select>
                </label>

                {/* <div>
                  <CustomSelect
                    formData={hobbies}
                    updateHobbies={updateHobbies}
                  />
                </div> */}
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <form
                  className="w-full max-w-4xl space-y-4 rounded-lg p-6"
                  encType="multipart/form-data"
                >
                  <h1 className="mb-4 font-nunito text-2xl text-[24px] font-bold leading-[30px] tracking-[-2%] text-second-500">
                    Profile pictures
                  </h1>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="form-control">
                      <span className="label-text">
                        Upload at least 2 photos
                      </span>
                    </label>
                  </div>
                  <div className="mx-auto flex h-auto w-full flex-wrap gap-4 rounded-lg border-gray-300 p-4 lg:w-[931px]">
                    {Object.keys(avatar).map((avatarKey, index) => (
                      <div
                        key={avatarKey}
                        className="relative h-[120px] w-[120px] flex-shrink-0 cursor-pointer rounded-lg border-2 border-gray-300 sm:h-[140px] sm:w-[140px] lg:h-[167px] lg:w-[167px]"
                      >
                        <img
                          src={URL.createObjectURL(avatar[avatarKey])}
                          alt={`profile-${avatarKey}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={(event) =>
                            handleRemoveImage(event, avatarKey)
                          }
                          className="absolute right-[-5px] top-[-10px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl text-white hover:bg-red-700"
                        >
                          x
                        </button>
                      </div>
                    ))}
                    {Object.keys(avatar).length < 5 && (
                      <div className="relative h-[120px] w-[120px] flex-shrink-0 cursor-pointer rounded-lg border-2 border-gray-300 sm:h-[140px] sm:w-[140px] lg:h-[167px] lg:w-[167px]">
                        <label
                          htmlFor="upload"
                          className="flex h-full w-full items-center justify-center text-sm text-gray-500"
                        >
                          {Object.keys(avatar).length === 0 ? (
                            <span>คลิกเพื่อเลือกไฟล์</span>
                          ) : (
                            <span>เลือกไฟล์ใหม่</span>
                          )}
                          <input
                            id="upload"
                            name="avatar"
                            type="file"
                            placeholder="Enter last name here"
                            onChange={handleFileChange}
                            className="absolute z-10 h-full w-full cursor-pointer opacity-0"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="absolute left-1/2 top-[850px] flex h-[112px] w-full -translate-x-1/2 items-center justify-between border-t border-gray-300 bg-white lg:w-full">
          <div className="ml-10">
            <span>{step}/3</span> {/* ข้อความ step/3 ชิดซ้าย */}
          </div>
          <div className="mr-10 flex space-x-4">
            <button
              disabled={step === 1}
              onClick={goToPrevStep}
              className="flex h-[48px] w-[80px] items-center justify-center rounded-full border-2 text-primary-500"
            >
              <IoMdArrowBack className="mr-2" />
              Back
            </button>
            <CustomButton
              className="w-[80px]"
              buttonType="primary"
              onClick={step < 3 ? goToNextStep : handleSubmit} // ใช้ function ตามค่า step
            >
              {step < 3 ? "Next Step" : "Submit"}
            </CustomButton>
          </div>
        </footer>
      </BackgroundPage>
    </>
  );
}

export default RegisterPage;
