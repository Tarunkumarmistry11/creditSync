import PropTypes from 'prop-types';  // Import PropTypes
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const CreditScoreLineChart = ({ scores = [] }) => {
  const data = {
    labels: scores.map((s) => s.date), // Ensure `date` is in correct format
    datasets: [
      {
        label: 'Credit Score',
        data: scores.map((s) => s.score),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Credit Score Trend</h2>
      <Line data={data} />
    </div>
  );
};

// PropTypes validation
CreditScoreLineChart.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Assuming `date` is a string
      score: PropTypes.number.isRequired, // Assuming `score` is a number
    })
  ),
};

export default CreditScoreLineChart;
