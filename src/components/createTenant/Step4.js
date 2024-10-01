import React from 'react';

const Step4 = ({ text, units }) => {
  return (
    <div>
      <h2>Schedule: {text}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr>
            <th className=""style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px',textAlign: 'center' }}>Service Type</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px',textAlign: 'center' }}>
              Housing Transition<br />
              05-05-24 to 05-04-25
            </th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px',textAlign: 'center'}}>
              Housing Sustaining<br />
              05-05-24 to 05-04-25
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>Total Days</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>365</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>365</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>Total Units (Hours)</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>15000 (3750)</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>15000 (3750)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>Units/Day (Hrs/day)</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>41.09 (10.27)</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>41.09 (10.27)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>Units/Week (Hrs/Week)</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>{units}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px',textAlign: 'center' }}>{units}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Step4;

