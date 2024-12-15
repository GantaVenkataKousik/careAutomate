import React from 'react';

const DownloadX12 = () => {
    const generateX12 = () => {
        // Sample X12 data
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

        // Create a blob from the X12 data
        const blob = new Blob([x12Data], { type: 'text/plain' });

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'sample_x12.edi';

        // Append to the body, click and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Download X12 EDI File</h1>
            <button onClick={generateX12} className="bg-blue-500 text-white px-4 py-2 rounded">
                Download X12 File
            </button>
        </div>
    );
};

export default DownloadX12;