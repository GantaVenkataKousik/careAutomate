import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo } from "../../redux/tenant/tenantSlice";
import usflag from "../../images/usa.png";

const SubStep1 = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.tenant.personalInfo);

  const [formData, setFormData] = useState(personalInfo);

  useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updatePersonalInfo({ [name]: value }));
  };
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="firstName">First Name*</label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="middleName">Middle Name</label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="middleName"
            name="middleName"
            value={personalInfo.middleName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="lastName">Last Name*</label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700" htmlFor="dob">DOB*</label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              type="date"
              id="dob"
              name="dob"
              value={personalInfo.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="gender">Gender*</label>
            <select
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              id="gender"
              name="gender"
              value={personalInfo.gender || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700" htmlFor="phoneNumber">Phone Number*</label>
          <div className="flex">
            <div className="flex items-center border border-gray-300 p-2 rounded-l focus:outline-none focus:border-blue-400">
              <img src={usflag} alt="US Flag" className="us-icon mr-2" />
              <span>+1</span>
            </div>
            <input
              className="border border-gray-300 p-2 w-full rounded-r focus:outline-none focus:border-blue-400"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700" htmlFor="email">Email*</label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SubStep1;
