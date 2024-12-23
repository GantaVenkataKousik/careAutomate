import React from 'react';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';

const BillsAndPayments = () => {
    const bills = [
        { date: '09/01/24', duration: '01:00 Hrs', hcm: 'Rick John', serviceType: 'H2015 U8', visitType: 'Indirect', billStatus: 'Not Billed', billAmount: '$70.00', receivedAmount: '$70.00', dateOfBill: '09/01/24', payor: 'Health Partners' },
        { date: '09/02/24', duration: '01:00 Hrs', hcm: 'Rick John', serviceType: 'H2015 U8', visitType: 'Indirect', billStatus: 'Not Billed', billAmount: '$70.00', receivedAmount: '$70.00', dateOfBill: '09/02/24', payor: 'Health Partners' },
        // Add more static bill entries as needed
    ];

    const handleDownloadAndUpload = async (bill) => {
        const x12Data = `
      ISA*00*          *00*          *ZZ*1164134086     *30*000000         *241203*0237*^*00501*111111299*1*P*:~
      GS*HC*1164134086*000000*20241203*0237*111111299*X*005010X222A1~
      ST*837*0001*005010X222A1~
      BHT*0019*00*111111299*20241203*0237*CH~
      NM1*41*2*Ease Housing LLC*****46*1164134086~
      PER*IC*Muna Abdisamad*TE*952-564-1128~
      NM1*40*2*Waystar*****46*000000~
      HL*1**20*1~
      PRV*BI*PXC*261Q00000X~
      NM1*85*2*EASE HOUSING LLC*****XX*1164134086~
      N3*3040 4TH AVE S STE 201~
      N4*MINNEAPOLIS*MN*554082409~
      REF*EI*883833073~
      HL*2*1*22*0~
      SBR*P*18*******CI~
      NM1*IL*1*BASHIR*MARYAN****MI*12905332~
      N3*279 WESTERN AVE N~
      N4*SAINT PAUL*MN*55103~
      DMG*D8*19870101*F~
      NM1*PR*2*HEALTH PARTNERS*****PI*SX009~
      REF*G2*1164134086~
      CLM*20912049*206.04***11:B:1*N*A*Y*Y*P~
      REF*EA*20912049~
      HI*ABK:F99~
      NM1*82*2*EASE HOUSING LLC*****XX*ATYPICAL~
      REF*G2*1164134086~
      LX*1~
      SV1*HC:H2015:U8:U4:::HOMEMAKER*206.04*UN*12***1~
      DTP*472*D8*20241125~
      REF*6R*20912049~
      SE*29*0001~
      GE*1*111111299~
      IEA*1*111111299~
    `;

        const blob = new Blob([x12Data], { type: 'text/plain' });
        const file = new File([blob], `bill_${bill.date}.edi`, { type: 'text/plain' });

        // Download the file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bill_${bill.date}.edi`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Upload the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://minnesota-housing-platform/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="p-8 w-full h-full">
            <h1 className="text-2xl font-bold mb-4">Tom Hank's Billing and Payments</h1>
            <div className="flex justify-between mb-4">
                <div>
                    <label>Start Date</label>
                    <input type="date" className="ml-2 border rounded" />
                </div>
                <div>
                    <label>End Date</label>
                    <input type="date" className="ml-2 border rounded" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Search Dates</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <p>Amount</p>
                    <p>Billed: $150</p>
                    <p>UnBilled: $89</p>
                    <p>Received: $89</p>
                    <p>Waiting for Payments: $89</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <p>Visits</p>
                    <p>Completed: 150</p>
                    <p>Billed: 89</p>
                    <p>Waiting for Decision: 89</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <p>Worked Hours</p>
                    <p>Worked: 20 (80 Units)</p>
                    <p>Billed: 10 (40 Units)</p>
                    <p>UnBilled: 10 (40 Units)</p>
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md mb-4">
                <p>SA - Housing Transition (05/01/2024 - 10/31/2024)</p>
                <p>Allotted Hours: 150 (600 Units)</p>
                <p>Worked Hours: 150 (600 Units)</p>
                <p>Remaining Hours: 150 (600 Units)</p>
            </div>
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th>Schedule</th>
                        <th>Duration</th>
                        <th>HCM</th>
                        <th>Service Type</th>
                        <th>Visit Type</th>
                        <th>Bill Status</th>
                        <th>Bill Amount</th>
                        <th>Received Amount</th>
                        <th>Date of Bill</th>
                        <th>Payor</th>
                        <th>Download & Upload</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill, index) => (
                        <tr key={index}>
                            <td>{bill.date}</td>
                            <td>{bill.duration}</td>
                            <td>{bill.hcm}</td>
                            <td>{bill.serviceType}</td>
                            <td>{bill.visitType}</td>
                            <td>{bill.billStatus}</td>
                            <td>{bill.billAmount}</td>
                            <td>{bill.receivedAmount}</td>
                            <td>{bill.dateOfBill}</td>
                            <td>{bill.payor}</td>
                            <td>
                                <button onClick={() => handleDownloadAndUpload(bill)} className="text-blue-500 hover:text-blue-700">
                                    <FaDownload size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillsAndPayments;