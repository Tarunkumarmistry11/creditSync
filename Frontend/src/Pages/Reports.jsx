import { useEffect, useState } from 'react';
import axios from 'axios';
import ReportChart from '../Components/reportChart';
import SecuredUnsecuredPieChart from '../Components/SecuredUnsecuredPieChart';
import CreditScoreLineChart from '../Components/CreditScoreLineChart';
import ReportTable from '../Components/reportTable';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/reports/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  if (!data) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Credit Report Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Basic Details</h2>
          <p className="mt-2 text-gray-400">Name: {data.name}</p>
          <p className="text-gray-400">PAN: {data.pan}</p>
          <p className="text-gray-400">Credit Score: {data.creditScore}</p>
        </div>

        {/* Last 7 Days */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Last 7 Days</h2>
          <p className="mt-2 text-gray-400">
            Credit Enquiries: {data.reportSummary?.last7DaysInquiries || 'N/A'}
          </p>
        </div>

        {/* Report Table */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Credit Accounts</h2>
          <ReportTable data={data.creditAccounts} />
        </div>

        {/* Bar Chart */}
        <div className="col-span-2">
          <ReportChart reportData={data.reportSummary} />
        </div>

        {/* Pie Chart */}
        <SecuredUnsecuredPieChart
          secured={data.reportSummary?.securedAmount || 0}
          unsecured={data.reportSummary?.unsecuredAmount || 0}
        />

        {/* Line Chart */}
        {data.creditScoreHistory?.length > 0 && (
          <CreditScoreLineChart scores={data.creditScoreHistory} />
        )}
      </div>
    </div>
  );
};

export default Reports;
