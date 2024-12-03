import React, { useState } from 'react';
import { cropDatabase, cropCategories, categoryMetadata, calculateNutrientRequirements, calculateFertilizerQuantity } from '../data/cropDatabase';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const CategoryCard = ({ category, selected, onClick }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  
  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-4 transition-all ${
        selected ? 'bg-green-100 border-2 border-green-500' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <img 
        src={`/images/categories/${category.toLowerCase()}.jpg`}
        alt={t.cropCategories[category.toLowerCase()].name}
        onError={handleImageError}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-center font-medium text-gray-900">
        {t.cropCategories[category.toLowerCase()].name}
      </h3>
      <p className="text-sm text-center text-gray-600">
        {t.cropCategories[category.toLowerCase()].description}
      </p>
      <span className="block text-center text-2xl mt-2">
        {t.cropCategories[category.toLowerCase()].icon}
      </span>
    </div>
  );
};

const CropCard = ({ crop, selected, onClick }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-4 transition-all ${
        selected ? 'bg-green-100 border-2 border-green-500' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <img 
          src={`/images/crops/${crop.category.toLowerCase().replace(' ', '-')}/${crop.image}`}
          alt={t.crops[crop.name.toLowerCase()]}
          onError={handleImageError}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <span className="absolute top-2 right-2 text-2xl">{crop.icon}</span>
      </div>
      <h3 className="font-medium text-gray-900">{t.crops[crop.name.toLowerCase()]}</h3>
      <p className="text-sm text-gray-500 italic">{crop.scientific}</p>
      <p className="text-sm text-gray-600 mt-2">{t.npkRatio}: {crop.npk.join('-')}</p>
      <div className="mt-2 text-sm">
        <p className="text-gray-600">{t.season}: {t.seasons[crop.season.toLowerCase()]}</p>
        <p className="text-gray-600">{t.duration}: {crop.growthDuration}</p>
      </div>
    </div>
  );
};

const NutrientCalculator = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    crop: '',
    landArea: 1,
    fertilizerN: 0,
    fertilizerP: 0,
    fertilizerK: 0
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResults = (e) => {
    e.preventDefault();
    const crop = cropDatabase[formData.crop];
    const requiredNutrients = calculateNutrientRequirements(crop, parseFloat(formData.landArea));
    const fertilizerRatio = [
      parseInt(formData.fertilizerN),
      parseInt(formData.fertilizerP),
      parseInt(formData.fertilizerK)
    ];

    const fertilizer = calculateFertilizerQuantity(requiredNutrients, fertilizerRatio);

    setResults({
      crop,
      area: formData.landArea,
      requiredNutrients,
      fertilizer
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800">
            Crop Nutrient Calculator
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Get the right amount of fertilizer for your crop
          </p>
        </div>

        {/* Step 1 */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
            Select Crop Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cropCategories.map(category => (
              <CategoryCard
                key={category}
                category={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Step 2 */}
        {selectedCategory && (
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Select Your Crop
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(cropDatabase)
                .filter(([_, crop]) => crop.category === selectedCategory)
                .map(([key, crop]) => (
                  <CropCard
                    key={key}
                    crop={crop}
                    selected={formData.crop === key}
                    onClick={() => handleInputChange({
                      target: { name: 'crop', value: key }
                    })}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {formData.crop && (
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              {t.enterLandDetails}
            </h2>
            <form onSubmit={calculateResults} className="max-w-2xl mx-auto space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {t.landArea}
                </label>
                <input
                  type="number"
                  name="landArea"
                  value={formData.landArea}
                  onChange={handleInputChange}
                  className="w-full text-lg p-3 border-2 border-gray-300 rounded-lg"
                  required
                  min="0.1"
                  step="0.1"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Organic Manure NPK Content (%)
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {['N', 'P', 'K'].map(nutrient => (
                    <div key={nutrient}>
                      <label className="block text-lg text-gray-700 mb-2">
                        {nutrient}
                      </label>
                      <input
                        type="number"
                        name={`fertilizer${nutrient}`}
                        value={formData[`fertilizer${nutrient}`]}
                        onChange={handleInputChange}
                        className="w-full text-lg p-3 border-2 border-gray-300 rounded-lg"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700"
              >
                Calculate Requirements
              </button>
            </form>
          </div>
        )}

        {/* Results section */}
        {results && (
          <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-800">
                Fertilizer Recommendation
              </h2>
              <div className="flex items-center justify-center mt-2">
                <span className="text-3xl mr-2">{results.crop.icon}</span>
                <p className="text-xl">{results.crop.name}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📊</span> Key Numbers
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Land Area:</span>
                    <span className="font-bold text-lg">{results.area} hectares</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Fertilizer:</span>
                    <span className="font-bold text-lg">{results.fertilizer.quantityTons} tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NPK Ratio:</span>
                    <span className="font-bold text-lg">{results.fertilizer.ratio}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌱</span> Growing Guide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">🗓️</span>
                    <span>Season: {results.crop.season}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">⏱️</span>
                    <span>Duration: {results.crop.growthDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">💧</span>
                    <span>Water Needs: {results.crop.waterRequirement}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <div className="flex">
                <span className="text-2xl mr-2">💡</span>
                <p>{results.crop.characteristics}</p>
              </div>
            </div>

            <button
              onClick={() => setResults(null)}
              className="mt-6 w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center"
            >
              <span className="text-xl mr-2">🔄</span>
              Calculate for Another Crop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutrientCalculator;