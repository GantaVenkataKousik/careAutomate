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
import SetupPop from "../auth/SetupPop";
const MainDashboard = () => {
  const [activeView, setActiveView] = useState("tenant");
  const [activeSection, setActiveSection] = useState("visit");

  const accountSetup = JSON.parse(localStorage.getItem("user")).accountSetup;
  // console.log("boolena", accountSetup);
  const [showPopup, setShowPopup] = useState(!accountSetup);

  const handleSave = () => {
    console.log("save");
  };
  return (
    <>
      <div className="p-8 pt-0">
        <div className="flex justify-between align-center">
          <h3
            className="text-xl font-bold"
            style={{ color: "rgba(0, 0, 0, 0.7)" }}
          >
            Dashboard
          </h3>
        </div>
        <div className="mt-4">
          <div className="gap-4">
            <div>
              <CardData />
            </div>
            <WeeklySchedule />
            <div className="flex gap-8 my-5 p-2 w-full mx-auto">
              <div className="flex shadow-md px-6 pt-6 pb-2 gap-10 justify-evenly border-2 rounded-3xl  w-full ">
                <div className="p-5">
                  <div className="flex gap-4">
                    <button
                      className={`py-2 px-6 font-semibold transition-colors duration-300 rounded-lg ${
                        activeSection === "visit"
                          ? "bg-[#6F84F8] text-white shadow-lg" // Updated color
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                      onClick={() => setActiveSection("visit")}
                    >
                      Visit Compliance
                    </button>
                    <button
                      className={`py-2 px-6 font-semibold transition-colors duration-300 rounded-lg ${
                        activeSection === "reassessment"
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
                      className={`py-1 px-2 rounded-lg ${
                        activeView === "tenant"
                          ? "bg-[#6F84F8] text-white shadow-lg"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setActiveView("tenant")}
                    >
                      Tenant
                    </button>
                    <button
                      className={`py-1 px-2 rounded-lg ${
                        activeView === "hcm"
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
                        <h3 className="mt-2 ml-2 text-xl text-[#6f84f8] font-bold">
                          Tenant
                        </h3>
                        <TenantInfoChart style={{ height: "150px" }} />{" "}
                      </>
                    )}
                    {activeView === "hcm" && (
                      <>
                        <h3 className="mt-2 ml-2 text-xl text-[#6f84f8] font-bold">
                          HCM
                        </h3>
                        <HCMInfoChart style={{ height: "150px" }} />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </div>

      {showPopup && (
        <SetupPop
          open={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSave}
        />
      )}
    </>
  );
};

export default MainDashboard;
