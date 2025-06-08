import { useState } from 'react';
import PredictionResults from '../components/PredictionResults';

const PredictPage = () => {
  const [showResults, setShowResults] = useState(false);

  const handlePredictClick = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!showResults ? (
        <div className="text-center">
          <button
            onClick={handlePredictClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Predict Yield
          </button>
        </div>
      ) : (
        <PredictionResults />
      )}
    </div>
  );
};

export default PredictPage; 