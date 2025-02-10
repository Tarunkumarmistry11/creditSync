import PropTypes from 'prop-types'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SecuredUnsecuredPieChart = ({ secured, unsecured }) => {
  const data = {
    labels: ['Secured Amount', 'Unsecured Amount'],
    datasets: [
      {
        data: [secured, unsecured],
        backgroundColor: ['#4CAF50', '#FF9800'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Loan Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

SecuredUnsecuredPieChart.propTypes = {
  secured: PropTypes.number.isRequired,   
  unsecured: PropTypes.number.isRequired, 
};

export default SecuredUnsecuredPieChart;
