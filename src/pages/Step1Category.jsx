import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { categoryMetadata, cropCategories } from '../data/cropDatabase';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Step1Category = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleCategorySelect = (category) => {
    navigate(`/step2/${category}`);
  };

  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
        {t.selectCropTitle}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cropCategories.map(category => (
          <CategoryCard
            key={category}
            category={category}
            metadata={categoryMetadata[category]}
            onClick={() => handleCategorySelect(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default Step1Category;