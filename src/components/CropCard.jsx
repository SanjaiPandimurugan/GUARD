import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const CropCard = ({ crop, onClick }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const getTranslatedName = (cropName) => {
    const lowercaseName = cropName.toLowerCase();
    return t.crops[lowercaseName] || cropName;
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg p-4 transition-all hover:bg-gray-50"
    >
      <div className="relative">
        <img 
          src={`/images/crops/${crop.category.toLowerCase()}/${crop.image}`}
          alt={getTranslatedName(crop.name)}
          className="w-full h-32 object-cover rounded-md mb-3"
        />
        <span className="absolute top-2 right-2 text-2xl">{crop.icon}</span>
      </div>
      <h3 className="font-medium text-gray-900">{getTranslatedName(crop.name)}</h3>
      <p className="text-sm text-gray-500 italic">{crop.scientific}</p>
      <p className="text-sm text-gray-600">
        {t.season}: {t.seasons[crop.season.toLowerCase()]}
      </p>
    </div>
  );
};

export default CropCard; 