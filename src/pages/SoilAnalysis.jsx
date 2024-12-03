import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import preprocessImage from '../services/imagePreprocessing';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const ROBOFLOW_API_KEY = "RCqkJM0xLDGnA78lklZA";
const ROBOFLOW_MODEL_URL = "https://detect.roboflow.com/soil-type-identification/1";

const SoilAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath;
  const returnCrop = location.state?.crop;
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const soilTypeMap = {
    'Clay Soil': {
      npk: [20, 15, 15],
      description: 'Heavy texture, high water retention',
      icon: '🏺'
    },
    'Sandy Soil': {
      npk: [10, 12, 14],
      description: 'Light texture, low water retention',
      icon: '🏖️'
    },
    'Loamy Soil': {
      npk: [15, 15, 15],
      description: 'Medium texture, balanced properties',
      icon: '🌱'
    },
    'Black Soil': {
      npk: [12, 25, 12],
      description: 'Rich in organic matter',
      icon: '⚫'
    },
    'Red Soil': {
      npk: [18, 10, 14],
      description: 'Iron-rich, moderate fertility',
      icon: '🔴'
    }
  };

  const soilTypeTranslations = {
    en: {
      'Clay Soil': 'Clay Soil',
      'Sandy Soil': 'Sandy Soil',
      'Loamy Soil': 'Loamy Soil',
      'Black Soil': 'Black Soil',
      'Red Soil': 'Red Soil'
    },
    hi: {
      'Clay Soil': 'चिकनी मिट्टी',
      'Sandy Soil': 'बलुई मिट्टी',
      'Loamy Soil': 'दोमट मिट्टी',
      'Black Soil': 'काली मिट्टी',
      'Red Soil': 'लाल मिट्टी'
    },
    mr: {
      'Clay Soil': 'चिकणमाती',
      'Sandy Soil': 'वाळूमिश्रित माती',
      'Loamy Soil': 'मध्यम माती',
      'Black Soil': 'काळी माती',
      'Red Soil': 'लाल माती'
    }
  };

  const soilDescriptionTranslations = {
    en: {
      'Clay Soil': 'Heavy texture, high water retention',
      'Sandy Soil': 'Light texture, low water retention',
      'Loamy Soil': 'Medium texture, balanced properties',
      'Black Soil': 'Rich in organic matter',
      'Red Soil': 'Iron-rich, moderate fertility'
    },
    hi: {
      'Clay Soil': 'भारी बनावट, उच्च जल धारण क्षमता',
      'Sandy Soil': 'हल्की बनावट, कम जल धारण क्षमता',
      'Loamy Soil': 'मध्यम बनावट, संतुलित गुण',
      'Black Soil': 'जैविक पदार्थ से भरपूर',
      'Red Soil': 'लौह समृद्ध, मध्यम उर्वरता'
    },
    mr: {
      'Clay Soil': 'जड बनावट, जास्त पाणी धारण क्षमता',
      'Sandy Soil': 'हलकी बनावट, कमी पाणी धारण क्षमता',
      'Loamy Soil': 'मध्यम बनावट, संतुलित गुणधर्म',
      'Black Soil': 'सेंद्रिय पदार्थांनी समृद्ध',
      'Red Soil': 'लोह समृद्ध, मध्यम सुपीकता'
    },
    hr: {
      'Clay Soil': 'भारी माटी, पाणी रोकण आली',
      'Sandy Soil': 'हल्की माटी, कम पाणी रोकण आली',
      'Loamy Soil': 'दोमट माटी, सब चीज बराबर',
      'Black Soil': 'काली माटी, खाद आली',
      'Red Soil': 'लाल माटी, लोहे आली'
    }
  };

  const recommendedCropsTranslations = {
    en: {
      'Rice': 'Rice',
      'Wheat': 'Wheat',
      'Cabbage': 'Cabbage',
      'Carrots': 'Carrots',
      'Potatoes': 'Potatoes',
      'Peanuts': 'Peanuts',
      'Cotton': 'Cotton',
      'Sugarcane': 'Sugarcane',
      'Groundnut': 'Groundnut',
      'Tobacco': 'Tobacco',
      'Vegetables': 'Vegetables',
      'Most crops': 'Most crops',
      'General crops': 'General crops'
    },
    hi: {
      'Rice': 'धान',
      'Wheat': 'गेहूं',
      'Cabbage': 'पत्तागोभी',
      'Carrots': 'गाजर',
      'Potatoes': 'आलू',
      'Peanuts': 'मूंगफली',
      'Cotton': 'कपास',
      'Sugarcane': 'गन्ना',
      'Groundnut': 'मूंगफली',
      'Tobacco': 'तंबाकू',
      'Vegetables': 'सब्जियां',
      'Most crops': 'अधिकांश फसलें',
      'General crops': 'सामान्य फसलें'
    },
    mr: {
      'Rice': 'भात',
      'Wheat': 'गहू',
      'Cabbage': 'कोबी',
      'Carrots': 'गाजर',
      'Potatoes': 'बटाटा',
      'Peanuts': 'भुईमूग',
      'Cotton': 'कापूस',
      'Sugarcane': 'ऊस',
      'Groundnut': 'भुईमूग',
      'Tobacco': 'तंबाखू',
      'Vegetables': 'भाज्या',
      'Most crops': 'बहुतेक पिके',
      'General crops': 'सामान्य पिके'
    },
    hr: {
      'Rice': 'धान',
      'Wheat': 'गेहूं',
      'Cabbage': 'बंद गोभी',
      'Carrots': 'गाजर',
      'Potatoes': 'आलू',
      'Peanuts': 'मूंगफली',
      'Cotton': 'कपास',
      'Sugarcane': 'गन्ना',
      'Groundnut': 'मूंगफली',
      'Tobacco': 'तमाकू',
      'Vegetables': 'साग-सब्जी',
      'Most crops': 'ज्यादातर फसलां',
      'General crops': 'आम फसलां'
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const analyzeSoil = async () => {
    setAnalyzing(true);
    try {
      const processedImage = await preprocessImage(image);
      const formData = new FormData();
      formData.append('file', processedImage);

      const response = await fetch(
        `${ROBOFLOW_MODEL_URL}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      const prediction = result.predictions[0];
      
      if (!prediction) {
        throw new Error('No soil type detected');
      }

      const soilType = prediction.class;
      const confidence = prediction.confidence;

      // Check if confidence is below 50%
      if (confidence < 0.5) {
        alert('Please Upload the Correct Image');
        setAnalysisResults(null);
        setImage(null);
        setPreview(null);
        setAnalyzing(false);
        return;
      }

      const soilInfo = soilTypeMap[soilType] || {
        npk: [14, 14, 14],
        description: 'Standard balanced soil',
        icon: '🌱'
      };

      setAnalysisResults({
        soilType,
        confidence: (confidence * 100).toFixed(1),
        characteristics: {
          texture: getSoilTexture(soilType),
          waterRetention: getWaterRetention(soilType),
          fertility: getFertilityLevel(soilType),
          recommendedCrops: getRecommendedCrops(soilType)
        },
        npkRatio: soilInfo.npk,
        description: soilInfo.description,
        icon: soilInfo.icon
      });

    } catch (error) {
      console.error('Soil analysis failed:', error);
      alert('Failed to analyze soil. Please try again.');
      setAnalysisResults(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBack = () => {
    if (returnPath && returnCrop) {
      navigate(returnPath, {
        state: {
          crop: returnCrop,
          soilAnalysis: analysisResults
        }
      });
    } else {
      navigate('/');
    }
  };

  // Soil classification helper functions
  const getSoilTexture = (soilType) => {
    const textureMap = {
      'Clay Soil': 'Fine, dense particles',
      'Sandy Soil': 'Coarse, loose particles',
      'Loamy Soil': 'Mixed, balanced texture',
      'Black Soil': 'Fine to medium particles',
      'Red Soil': 'Medium particles'
    };
    return textureMap[soilType] || 'Medium texture';
  };

  const getWaterRetention = (soilType) => {
    const retentionMap = {
      'Clay Soil': 'High',
      'Sandy Soil': 'Low',
      'Loamy Soil': 'Medium',
      'Black Soil': 'High',
      'Red Soil': 'Medium-Low'
    };
    return retentionMap[soilType] || 'Medium';
  };

  const getFertilityLevel = (soilType) => {
    const fertilityMap = {
      'Clay Soil': 'Medium-High',
      'Sandy Soil': 'Low',
      'Loamy Soil': 'High',
      'Black Soil': 'Very High',
      'Red Soil': 'Medium'
    };
    return fertilityMap[soilType] || 'Medium';
  };

  const getRecommendedCrops = (soilType) => {
    const cropMap = {
      'Clay Soil': ['Rice', 'Wheat', 'Cabbage'],
      'Sandy Soil': ['Carrots', 'Potatoes', 'Peanuts'],
      'Loamy Soil': ['Most crops', 'Vegetables', 'Fruits'],
      'Black Soil': ['Cotton', 'Sugarcane', 'Wheat'],
      'Red Soil': ['Groundnut', 'Tobacco', 'Vegetables']
    };
    const crops = cropMap[soilType] || ['General crops'];
    return crops.map(crop => recommendedCropsTranslations[currentLanguage][crop]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
          {t.uploadTitle}
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {preview ? (
              <div className="space-y-4">
                <img 
                  src={preview} 
                  alt="Soil sample" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <p className="text-sm text-gray-500">
                  Click "Analyze" to process your soil image
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-6xl">📸</span>
                <p className="text-gray-600">{t.uploadDesc}</p>
                <p className="text-sm text-gray-500">
                  {t.uploadTip}
                </p>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="soil-image"
              disabled={analyzing}
            />
            <label
              htmlFor="soil-image"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              {t.selectImage}
            </label>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate('/step2/select-crop')}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              {t.skipAnalysis}
            </button>
            {image && (
              <button
                onClick={analyzeSoil}
                disabled={analyzing}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 
                  flex items-center justify-center"
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                      />
                    </svg>
                    {t.analyzing}
                  </>
                ) : (
                  t.analyzeButton
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Results - Only show if results exist */}
      {analysisResults && (
        <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">
              {t.resultsTitle}
            </h2>
            <div className="flex items-center justify-center mt-2">
              <span className="text-3xl mr-2">{analysisResults.icon}</span>
              <p className="text-xl">{analysisResults.soilType}</p>
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {analysisResults.confidence}% {t.confidence}
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌱</span> {t.characteristics}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>{t.texture}:</span>
                  <span className="font-medium">{analysisResults.characteristics.texture}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.waterRetention}:</span>
                  <span className="font-medium">{analysisResults.characteristics.waterRetention}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.fertility}:</span>
                  <span className="font-medium">{analysisResults.characteristics.fertility}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">📊</span> {t.npkRatio}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['N', 'P', 'K'].map((nutrient, index) => (
                  <div key={nutrient} className="text-center">
                    <div className="text-2xl font-bold text-blue-800">
                      {analysisResults.npkRatio[index]}%
                    </div>
                    <div className="text-sm text-gray-600">{nutrient}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="text-xl mr-2">🌾</span> {t.recommendedCrops}
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysisResults.characteristics.recommendedCrops.map(crop => (
                <span key={crop} className="bg-white px-3 py-1 rounded-full text-sm">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center"
            >
              <span className="text-xl mr-2">⬅️</span>
              {returnPath ? 'Back to Calculator' : 'Back to Home'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
            >
              <span className="text-xl mr-2">📄</span>
              Print Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilAnalysis;