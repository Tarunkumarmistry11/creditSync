import PropTypes from 'prop-types';  // Import PropTypes
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDF = ({ reportRef }) => {
  const handleDownload = () => {
    html2canvas(reportRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
      pdf.save('credit_report.pdf');
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Download PDF
    </button>
  );
};

// PropTypes validation
ExportPDF.propTypes = {
  reportRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),  // Ensures reportRef.current is an Element (or null)
  }),
};

export default ExportPDF;
