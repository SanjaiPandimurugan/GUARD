import React from 'react';
import { categoryMetadata } from '../data/cropDatabase';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const CategoryCard = ({ category, selected, onClick }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
  };

  const imagePath = categoryMetadata[category]?.image 
    ? `/images/categories/${categoryMetadata[category].image.toLowerCase().replace(' ', '-')}`
    : '/images/placeholder.jpg';

  const getCategoryTranslation = () => {
    const categoryKey = category.toLowerCase();
    return t.cropCategories[categoryKey] || {
      name: category,
      description: categoryMetadata[category]?.description,
      icon: categoryMetadata[category]?.icon
    };
  };

  const categoryTranslation = getCategoryTranslation();

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-4 transition-all ${
        selected ? 'bg-green-100 border-2 border-green-500' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <img 
        src={imagePath}
        alt={categoryTranslation.name}
        onError={handleImageError}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-center font-medium text-gray-900">
        {categoryTranslation.name}
      </h3>
      <p className="text-sm text-center text-gray-600">
        {categoryTranslation.description}
      </p>
      <span className="block text-center text-2xl mt-2">
        {categoryTranslation.icon}
      </span>
    </div>
  );
};

export default CategoryCard;