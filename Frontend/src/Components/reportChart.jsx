import PropTypes from 'prop-types';  
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportChart = ({ reportData = {} }) => {
  const chartData = {
    labels: ['Active Accounts', 'Closed Accounts', 'Secured Amount', 'Unsecured Amount'],
    datasets: [
      {
        label: 'Amount in ₹',
        data: [
          reportData.activeAccounts || 0,
          reportData.closedAccounts || 0,
          reportData.securedAmount || 0,
          reportData.unsecuredAmount || 0,
        ],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3', '#FF9800'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Credit Summary Overview' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₹' + value.toLocaleString(); 
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Credit Summary</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

ReportChart.propTypes = {
  reportData: PropTypes.shape({
    activeAccounts: PropTypes.number,
    closedAccounts: PropTypes.number,
    securedAmount: PropTypes.number,
    unsecuredAmount: PropTypes.number,
  }),
};

export default ReportChart;
