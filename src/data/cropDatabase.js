export const categoryMetadata = {
  Cereals: {
    image: "cereals-banner.jpg",
    icon: "🌾",
    description: "Basic food grains including wheat, rice, and maize",
    color: "amber-500"
  },
  Vegetables: {
    image: "vegetables-banner.jpg",
    icon: "🥬",
    description: "Common vegetable crops for daily consumption",
    color: "green-500"
  },
  Fruits: {
    image: "fruits-banner.jpg",
    icon: "🍎",
    description: "Fruit trees and plants",
    color: "red-500"
  },
  Commercial: {
    image: "commercial-banner.jpg",
    icon: "🏭",
    description: "Cash crops and industrial plants",
    color: "blue-500"
  },
  Spices: {
    image: "spices-banner.jpg",
    icon: "🌶️",
    description: "Spices and condiments",
    color: "orange-500"
  },
  Legumes: {
    image: "legumes-banner.jpg",
    icon: "🫘",
    description: "Nitrogen-fixing legume crops",
    color: "yellow-600"
  },
  "Tree Crops": {
    image: "tree-crops-banner.jpg",
    icon: "🌳",
    description: "Perennial tree crops",
    color: "emerald-600"
  }
};

export const cropDatabase = {
  // Cereals and Grains
  wheat: {
    name: "Wheat",
    scientific: "Triticum aestivum",
    npk: [80, 40, 40],
    characteristics: "Requires well-pulverized loam soil with moderate water holding capacity",
    tolerance: 10,
    category: "Cereals",
    image: "wheat.jpg",
    icon: "🌾",
    season: "Rabi",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  maize: {
    name: "Maize",
    scientific: "Zea mays",
    npk: [153, 62.5, 50],
    characteristics: "Adaptable to various soils; prefers deep, fertile, well-drained soils",
    tolerance: 10,
    category: "Cereals",
    image: "maize.jpg",
    icon: "🌾",
    season: "Rabi",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  ragi: {
    name: "Ragi",
    scientific: "Eleusine coracana",
    npk: [200, 100, 100],
    characteristics: "Thrives in porous loam soils with good water retention",
    tolerance: 10,
    category: "Cereals",
    image: "ragi.jpg",
    icon: "🌾",
    season: "Rabi",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  millet: {
    name: "Millet",
    scientific: "Pennisetum glaucum",
    npk: [70, 35, 35],
    characteristics: "Adapted to alluvial and sandy soils; hybrids require slightly higher NPK",
    tolerance: 10,
    category: "Cereals",
    image: "millet.jpg",
    icon: "🌾",
    season: "Rabi",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },

  // Vegetables
  tomato: {
    name: "Tomato",
    scientific: "Solanum lycopersicum",
    npk: [200, 250, 250],
    characteristics: "Requires loamy soils; NPK applied in split doses with fertigation for hybrids",
    tolerance: 10,
    category: "Vegetables",
    image: "tomato.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  chilli: {
    name: "Chilli",
    scientific: "Capsicum annum",
    npk: [120, 60, 60],
    characteristics: "Grows in well-drained loamy soils",
    tolerance: 10,
    category: "Vegetables",
    image: "chilli.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  onion: {
    name: "Onion",
    scientific: "Allium cepa",
    npk: [200, 200, 100],
    characteristics: "Prefers deep, friable loam soils with good drainage and moisture holding capacity",
    tolerance: 10,
    category: "Vegetables",
    image: "onion.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  bottleGourd: {
    name: "Bottle Gourd",
    scientific: "Lagenaria siceraria",
    npk: [600, 1200, 1200],
    characteristics: "Grows in sandy loam soils rich in organic matter",
    tolerance: 10,
    category: "Vegetables",
    image: "bottle-gourd.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  garlic: {
    name: "Garlic",
    scientific: "Allium sativum",
    npk: [800, 300, 200],
    characteristics: "Prefers well-drained loamy soils with high potash content",
    tolerance: 10,
    category: "Vegetables",
    image: "garlic.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  carrot: {
    name: "Carrot",
    scientific: "Daucus carota",
    npk: [100, 100, 100],
    characteristics: "Requires deep, loose loamy soil; ideal for cool season cultivation",
    tolerance: 10,
    category: "Vegetables",
    image: "carrot.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  bitterGourd: {
    name: "Bitter Gourd",
    scientific: "Momordica charantia",
    npk: [100, 200, 200],
    characteristics: "Grows in sandy loam or medium black soils with rich organic matter",
    tolerance: 10,
    category: "Vegetables",
    image: "bitter-gourd.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  brinjal: {
    name: "Brinjal",
    scientific: "Solanum melongena",
    npk: [100, 50, 50],
    characteristics: "Requires fertile loamy soils; prefers warm-season growth conditions",
    tolerance: 10,
    category: "Vegetables",
    image: "brinjal.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  cauliflower: {
    name: "Cauliflower",
    scientific: "Brassica oleracea",
    npk: [100, 100, 100],
    characteristics: "Prefers deep loamy soil rich in organic matter; cool moist climates are ideal",
    tolerance: 10,
    category: "Vegetables",
    image: "cauliflower.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  ladysFinger: {
    name: "Lady's Finger",
    scientific: "Abelmoschus esculentus",
    npk: [100, 100, 100],
    characteristics: "Adapts to various soil types, prefers high organic matter content",
    tolerance: 10,
    category: "Vegetables",
    image: "ladys-finger.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  potato: {
    name: "Potato",
    scientific: "Solanum tuberosum",
    npk: [100, 100, 100],
    characteristics: "Requires sandy or well-drained loamy soils; prefers slightly acidic soil conditions",
    tolerance: 10,
    category: "Vegetables",
    image: "potato.jpg",
    icon: "🥬",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },

  // Fruits
  mango: {
    name: "Mango",
    scientific: "Mangifera indica",
    npk: [200, 200, 300],
    characteristics: "Requires well-drained, aerated soils; grown in wide varieties of soil types",
    tolerance: 10,
    category: "Fruits",
    image: "mango.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  banana: {
    name: "Banana",
    scientific: "Musa",
    npk: [200, 100, 200],
    characteristics: "Grows well in deep, rich loamy soils with optimal drainage",
    tolerance: 10,
    category: "Fruits",
    image: "banana.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  papaya: {
    name: "Papaya",
    scientific: "Carica papaya",
    npk: [100, 100, 100],
    characteristics: "Grows in tropical regions with loamy soil and moderate temperature",
    tolerance: 10,
    category: "Fruits",
    image: "papaya.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  lemon: {
    name: "Lemon",
    scientific: "Citrus limon",
    npk: [800, 200, 1000],
    characteristics: "Requires loamy soils; nitrogen split into two doses for optimal growth",
    tolerance: 10,
    category: "Fruits",
    image: "lemon.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  pineapple: {
    name: "Pineapple",
    scientific: "Ananas comosus",
    npk: [140, 30, 100],
    characteristics: "Thrives in non-compacted, well-drained loamy soils",
    tolerance: 10,
    category: "Fruits",
    image: "pineapple.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  grapes: {
    name: "Grapes",
    scientific: "Vitis vinifera",
    npk: [100, 100, 200],
    characteristics: "Requires well-drained rich loamy soils with low water table",
    tolerance: 10,
    category: "Fruits",
    image: "grapes.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  sapota: {
    name: "Sapota",
    scientific: "Manilkara zapota",
    npk: [200, 100, 100],
    characteristics: "Grows well in sandy loam or alluvial soils with good drainage",
    tolerance: 10,
    category: "Fruits",
    image: "sapota.jpg",
    icon: "🍎",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },

  // Commercial Crops
  cotton: {
    name: "Cotton",
    scientific: "Gossypium",
    npk: [120, 60, 60],
    characteristics: "Best in alluvial and sandy loam soils; NPK applied in splits based on growth stages",
    tolerance: 10,
    category: "Commercial",
    image: "cotton.jpg",
    icon: "🏭",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  sugarcane: {
    name: "Sugarcane",
    scientific: "Saccharum officinarum",
    npk: [500, 500, 200],
    characteristics: "Requires well-drained, sandy loam soils; suitable for high rainfall regions",
    tolerance: 10,
    category: "Commercial",
    image: "sugarcane.jpg",
    icon: "🏭",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  cocoa: {
    name: "Cocoa",
    scientific: "Theobroma cacao",
    npk: [280, 100, 600],
    characteristics: "Grows best in deep, well-drained clay or sandy loam soils",
    tolerance: 10,
    category: "Commercial",
    image: "cocoa.jpg",
    icon: "🏭",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },

  // Spices and Condiments
  blackPepper: {
    name: "Black Pepper",
    scientific: "Piper nigrum",
    npk: [100, 100, 300],
    characteristics: "Thrives in red laterite soils, rich in humus content",
    tolerance: 10,
    category: "Spices",
    image: "black-pepper.jpg",
    icon: "🌶️",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  
  // Legumes
  beans: {
    name: "Beans",
    scientific: "Phaseolus",
    npk: [100, 100, 100],
    characteristics: "Grows well in loamy soils with good drainage; suited for cool climates",
    tolerance: 10,
    category: "Legumes",
    image: "beans.jpg",
    icon: "🫘",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },
  groundnut: {
    name: "Groundnut",
    scientific: "Arachis hypogaea",
    npk: [100, 200, 300],
    characteristics: "Best suited for sandy loam soils with neutral pH and moderate rainfall",
    tolerance: 10,
    category: "Legumes",
    image: "groundnut.jpg",
    icon: "🫘",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "90-120 days"
  },

  // Tree Crops
  arecanut: {
    name: "Arecanut",
    scientific: "Areca catechu",
    npk: [100, 100, 100],
    characteristics: "Thrives in gravelly laterite soils with deep drainage",
    tolerance: 10,
    category: "Tree Crops",
    image: "arecanut.jpg",
    icon: "🌳",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  cashewnut: {
    name: "Cashewnut",
    scientific: "Anacardium occidentale",
    npk: [100, 100, 100],
    characteristics: "Adaptable to red sandy loam soils; grown on plains and hill slopes",
    tolerance: 10,
    category: "Tree Crops",
    image: "cashewnut.jpg",
    icon: "🌳",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  },
  bamboo: {
    name: "Bamboo",
    scientific: "Bambusoideae",
    npk: [100, 100, 100],
    characteristics: "Prefers loamy, well-drained soils with slightly acidic conditions",
    tolerance: 10,
    category: "Tree Crops",
    image: "bamboo.jpg",
    icon: "🌳",
    season: "Kharif",
    waterRequirement: "Medium",
    growthDuration: "120-150 days"
  }
};

// Soil type efficiency factors
const SOIL_EFFICIENCY = {
  'Sandy': 0.70,
  'Loamy': 0.90,
  'Clay': 0.85,
  'Sandy Loam': 0.80,
  'Clay Loam': 0.85,
  'Silt Loam': 0.88,
  'Black': 0.90,
  'Red': 0.80,
  'Laterite': 0.75
};

export const calculateNutrientRequirements = (crop, area, soilType = 'Loamy', season = 'Kharif') => {
  const baseNPK = crop.npk;
  const soilFactor = SOIL_EFFICIENCY[soilType] || 0.80;
  const seasonFactor = season === 'Kharif' ? 1.2 : 1.0; // 20% more for rainy season

  return baseNPK.map(nutrient => 
    (nutrient * area * seasonFactor / soilFactor).toFixed(2)
  );
};

export const calculateFertilizerQuantity = (requiredNutrients, isSolidBioslurry = true) => {
  const npkContent = isSolidBioslurry ? BIOSLURRY_CONTENT.solid : BIOSLURRY_CONTENT.liquid;
  const availabilityFactor = isSolidBioslurry ? 0.5 : 0.7; // 50% for solid, 70% for liquid

  // Calculate required quantities for each nutrient
  const quantities = [
    requiredNutrients[0] / (npkContent.N * availabilityFactor), // N
    requiredNutrients[1] / (npkContent.P * availabilityFactor), // P
    requiredNutrients[2] / (npkContent.K * availabilityFactor)  // K
  ];

  // Use maximum quantity to ensure all nutrient requirements are met
  const totalQuantityKg = Math.max(...quantities);
  
  return {
    quantityTons: (totalQuantityKg / 1000).toFixed(2),
    quantityKg: totalQuantityKg.toFixed(2),
    nutrientsProvided: [
      (totalQuantityKg * npkContent.N * availabilityFactor).toFixed(2),
      (totalQuantityKg * npkContent.P * availabilityFactor).toFixed(2),
      (totalQuantityKg * npkContent.K * availabilityFactor).toFixed(2)
    ],
    applicationRate: (totalQuantityKg / parseFloat(requiredNutrients[0])).toFixed(2)
  };
};

// Constants and enums
export const seasons = ["Kharif", "Rabi", "Zaid"];

export const waterRequirements = ["Low", "Medium", "High"];

export const soilTypes = [
  "Sandy",
  "Loamy",
  "Clay",
  "Sandy Loam",
  "Clay Loam",
  "Silt Loam",
  "Black",
  "Red",
  "Laterite"
];

export const cropCategories = [
  "Cereals",
  "Vegetables",
  "Fruits",
  "Commercial",
  "Spices",
  "Legumes",
  "Tree Crops"
];

// Helper functions for metadata
export const getCategoryMetadata = (category) => {
  return categoryMetadata[category] || {
    image: "default-banner.jpg",
    icon: "🌱",
    description: "Agricultural crops",
    color: "gray-500"
  };
};

export const getCropMetadata = (cropId) => {
  return cropDatabase[cropId] || null;
};