import React, { useState } from "react";
import WeeklySchedule from "./components/WeeklySchedule";
import CardData from "./components/CardData";
import VisitsTenats from "./components/VisitsTenats";
import TenantReassessment from "./components/TenantReassessment";
import FinancialFlowLineChart from "./Charts/FinancialFlowLineChart";
import PayPeriodChart from "./Charts/PayPeriodChart";
import TenantInfoChart from "./Charts/TenantInfoChart";
import HCMInfoChart from "./Charts/HCMInfoChart";
import PayPeriodPieChart from "./Charts/PayPeriodPieChart";
import AccountSetupPopup from "../auth/AcoountSetup/AccountSetupPopup";

const MainDashboard = () => {
  const [activeView, setActiveView] = useState("tenant");
  const [activeSection, setActiveSection] = useState("visit");

  const accountSetup = JSON.parse(localStorage.getItem("user")).accountSetup;
  // console.log("boolena", accountSetup);
  const [showPopup, setShowPopup] = useState(!accountSetup);

  return (
    <>
      <div className="p-8 pt-0">
        <div className="flex justify-between align-center">
          <h1 style={styles.header} className="text-2xl flex items-center gap-2">
            <span>Dashboard</span>
          </h1>
        </div>
        <div className="mt-4">
          <div className="gap-4">
            <div>
              <CardData />
            </div>
            <div className="flex gap-8 p-2">
              <div className="flex shadow-md px-10 py-6 gap-10 justify-between border-2 rounded-3xl w-full">
                <div className="flex flex-col">
                  <h3 className="mt-2 ml-2 text-2xl text-[#6f84f8] font-semibold">
                    Financial Flow
                  </h3>
                  <FinancialFlowLineChart style={{ height: "150px" }} />
                </div>
                <div className="ml-4 ">
                  <h3 className="mt-2 ml-2 text-2xl text-[#6f84f8] font-semibold">
                    Pay Period
                  </h3>
                  <PayPeriodChart style={{ height: "150px" }} />
                </div>
                <div className="ml-4 ">
                  <h3 className="mt-2 ml-2 text-2xl text-[#6f84f8] font-semibold">
                    Pay Period
                  </h3>
                  <PayPeriodPieChart style={{ height: "150px" }} />
                </div>
              </div>
            </div>
            <WeeklySchedule />
            <div className="flex gap-8 my-5 p-2 w-full mx-auto">
              <div className="flex shadow-md px-6 pt-6 pb-2 gap-10 justify-evenly border-2 rounded-3xl  w-full ">
                <div className="p-5">
                  <div className="flex gap-4">
                    <button
                      className={`py-2 px-6 font-semibold transition-colors duration-300 rounded-lg ${activeSection === "visit"
                        ? "bg-[#6F84F8] text-white shadow-lg" // Updated color
                        : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      onClick={() => setActiveSection("visit")}
                    >
                      Visit Compliance
                    </button>
                    <button
                      className={`py-2 px-6 font-semibold transition-colors duration-300 rounded-lg ${activeSection === "reassessment"
                        ? "bg-[#6F84F8] text-white shadow-lg" // Updated color
                        : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      onClick={() => setActiveSection("reassessment")}
                    >
                      Tenant Reassessment
                    </button>
                  </div>
                  <div className="mt-4">
                    {activeSection === "visit" && (
                      <>
                        <VisitsTenats />
                      </>
                    )}
                    {activeSection === "reassessment" && (
                      <>
                        <TenantReassessment />
                      </>
                    )}{" "}
                  </div>
                </div>

                <div className="flex flex-col flex-2">
                  <h3 className="mt-2 mb-2 text-2xl text-[#6f84f8] font-semibold">
                    Info
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className={`py-1 px-2 rounded-lg ${activeView === "tenant"
                        ? "bg-[#6F84F8] text-white shadow-lg"
                        : "bg-gray-200"
                        }`}
                      onClick={() => setActiveView("tenant")}
                    >
                      Tenant
                    </button>
                    <button
                      className={`py-1 px-2 rounded-lg ${activeView === "hcm"
                        ? "bg-[#6F84F8] text-white shadow-lg"
                        : "bg-gray-200"
                        }`}
                      onClick={() => setActiveView("hcm")}
                    >
                      HCM
                    </button>
                  </div>
                  <div className="mt-2">
                    {activeView === "tenant" && (
                      <>
                        <TenantInfoChart style={{ height: "150px" }} />{" "}
                      </>
                    )}
                    {activeView === "hcm" && (
                      <>
                        <HCMInfoChart style={{ height: "150px" }} />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <AccountSetupPopup
          open={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};
const styles = {
  header: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
};
export default MainDashboard;
