import React from 'react';
import { Leaf, Droplets, Zap, FlaskConical, Calculator, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import SensorCard from '../components/SensorCard';

const Home = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const sensorData = {
    nitrogen: {
      current: 140,
      history: [
        { nitrogen: 135 },
        { nitrogen: 138 },
        { nitrogen: 139 },
        { nitrogen: 140 }
      ],
      range: { min: 120, max: 160, optimal: 140 }
    },
    phosphorous: {
      current: 45,
      data: [
        { value: 41 },
        { value: 42 },
        { value: 44 },
        { value: 45 }
      ],
      range: { min: 30, max: 60, optimal: 45 }
    },
    potassium: {
      current: 185,
      history: [
        { potassium: 180 },
        { potassium: 182 },
        { potassium: 184 },
        { potassium: 185 }
      ],
      range: { min: 150, max: 200, optimal: 175 }
    },
    ph: {
      current: 6.5,
      history: [
        { ph: 6.3 },
        { ph: 6.4 },
        { ph: 6.4 },
        { ph: 6.5 }
      ],
      range: { min: 6.0, max: 7.0, optimal: 6.5 }
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800">
          {t.title}
        </h1>
        <p className="mt-3 text-xl text-gray-600">
          {t.soilAnalysisDesc}
        </p>
      </div>

      {/* NPK and pH Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <SensorCard
          title={t.nitrogenTitle}
          value={sensorData.nitrogen.current}
          unit="mg/kg"
          icon={<Leaf size={24} />}
          color="emerald"
          data={sensorData.nitrogen.history}
          range={sensorData.nitrogen.range}
        />

        <SensorCard
          title="Phosphorus"
          value={sensorData.phosphorous.current}
          unit="ppm"
          icon={<FlaskConical size={24} />}
          color="blue"
          data={sensorData.phosphorous.data}
          range={sensorData.phosphorous.range}
        />

        <SensorCard
          title={t.potassiumTitle}
          value={sensorData.potassium.current}
          unit="mg/kg"
          icon={<Zap size={24} />}
          color="amber"
          data={sensorData.potassium.history}
          range={sensorData.potassium.range}
        />

        <SensorCard
          title="pH Level"
          value={sensorData.ph.current}
          unit="pH"
          icon={<Droplets size={24} />}
          color="rose"
          data={sensorData.ph.history}
          range={sensorData.ph.range}
        />
      </div>

      {/* Analysis and Calculator Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Soil Analysis Card */}
        <Link to="/soil-analysis" className="group">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-xl font-semibold ml-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                {t.soilAnalysis}
              </h3>
            </div>
            <p className="text-gray-600">
              {t.soilAnalysisDesc}
            </p>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">{t.analyzeSoil}</span>
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Calculator Card */}
        <Link to="/step1" className="group">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-semibold ml-4 text-gray-800 group-hover:text-green-600 transition-colors">
                {t.manualSelection}
              </h3>
            </div>
            <p className="text-gray-600">
              {t.manualSelectionDesc}
            </p>
            <div className="mt-4 flex items-center text-green-600">
              <span className="text-sm font-medium">{t.calculate}</span>
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home; 