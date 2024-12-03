import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CropCard from '../components/CropCard';
import { cropDatabase } from '../data/cropDatabase';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Step2Crop = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleCropSelect = (cropKey, crop) => {
    navigate(`/step3/${cropKey}`, { state: { crop } });
  };

  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
        {t.selectCropTitle}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {Object.entries(cropDatabase)
          .filter(([_, crop]) => crop.category === category)
          .map(([key, crop]) => (
            <CropCard
              key={key}
              crop={crop}
              onClick={() => handleCropSelect(key, crop)}
            />
          ))}
      </div>
    </div>
  );
};

export default Step2Crop; 