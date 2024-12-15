import React from "react";
import WeeklySchedule from "./components/WeeklySchedule";
import CardData from "./components/CardData";
import VisitsTenats from "./components/VisitsTenats";
import TenantReassessment from "./components/TenantReassessment";
import FinancialFlowLineChart from "./Charts/FinancialFlowLineChart";
import PayPeriodChart from "./Charts/PayPeriodChart";
import PayPeriodPieChart from "./Charts/PayPeriodPieChart";
import TenantInfoChart from "./Charts/TenantInfoChart";
import HCMInfoChart from "./Charts/HCMInfoChart";
const MainDashboard = () => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex">
        <div className="flex flex-col gap-4 p-8 pt-2">
          <CardData />
          <WeeklySchedule />
          <div className="flex px-2 py-1 border-2 rounded-3xl shadow-md p-4">
            <div className="flex flex-col">
              <h3 className="mt-4 ml-4 ">Financial Flow</h3>
              <FinancialFlowLineChart />
            </div>
            <div className="pay-period ml-8">
              <h3 className="mt-4 ml-4 ">Pay Period</h3>
              <PayPeriodChart />
            </div>
            <div className="pay-period ml-8">
              <h3 className="mt-4 ml-4 ">Pay Period</h3>
              <PayPeriodPieChart />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-2">
          <div className="px-2 py-1 border-2 rounded-3xl shadow-md p-4">
            <h3 className="mt-4 ml-4">Visit Compilance</h3>
            <VisitsTenats />
          </div>
          <div className="px-2 py-1 border-2 rounded-3xl shadow-md p-4">
            <h3 className="mt-4 ml-4">Tenants reassessments</h3>
            <TenantReassessment />
          </div>
        </div>
      </div>
      <div className="flex px-2 py-1 border-2 rounded-3xl shadow-md p-4 m-4 ml-8">
        <div className="flex flex w-full">
          <div className="w-1/2">
            <h3 className="mt-4 ml-4">Tenant Information</h3>
            <TenantInfoChart />
          </div>
          <div className="w-1/2">
            <h3 className="mt-4 ml-4">HCM Information</h3>
            <HCMInfoChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
