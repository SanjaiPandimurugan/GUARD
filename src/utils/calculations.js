import { cropDatabase } from '../data/cropDatabase';

// Calculate base nutrient requirements for a crop based on area
export const calculateBaseNutrients = (cropId, area) => {
  const crop = cropDatabase[cropId];
  if (!crop) return null;
  
  const baseNPK = crop.npk;
  return baseNPK.map(nutrient => nutrient * area);
};

// Calculate fertilizer quantity based on NPK requirements and ratio
export const calculateFertilizerQuantity = (requiredNutrients, manureNPKContent) => {
  // Convert user input percentage to decimal
  const manureRatios = manureNPKContent.map(ratio => ratio / 100);
  
  // Calculate required quantity for each nutrient
  const quantities = requiredNutrients.map((required, idx) => 
    manureRatios[idx] > 0 ? required / manureRatios[idx] : 0
  );
  
  // Use maximum quantity to ensure all nutrient requirements are met
  const totalQuantityKg = Math.max(...quantities.filter(q => q > 0));
  
  return {
    quantityTons: (totalQuantityKg / 1000).toFixed(2),
    quantityKg: totalQuantityKg.toFixed(2),
    nutrientsProvided: manureRatios.map(ratio => 
      (totalQuantityKg * ratio).toFixed(2)
    ),
    ratio: manureNPKContent.join(':'),
    applicationRate: (totalQuantityKg / parseFloat(requiredNutrients[0])).toFixed(2)
  };
};

// Calculate application schedule based on crop growth stages
export const calculateApplicationSchedule = (cropId, totalQuantity) => {
  const crop = cropDatabase[cropId];
  if (!crop || !crop.growthStages) return null;

  const stages = crop.growthStages;
  return stages.map(stage => ({
    stage: stage.name,
    timing: stage.timing,
    percentage: stage.nutrientNeed,
    quantity: ((stage.nutrientNeed / 100) * totalQuantity).toFixed(2)
  }));
};

// Validate fertilizer ratio
export const validateFertilizerRatio = (ratio) => {
  if (!Array.isArray(ratio) || ratio.length !== 3) return false;
  return ratio.every(value => 
    typeof value === 'number' && 
    !isNaN(value) && 
    value >= 0 && 
    value <= 100
  );
};

// Calculate cost estimation (if price per kg is provided)
export const calculateCostEstimate = (quantityKg, pricePerKg = 0) => {
  if (!pricePerKg) return null;
  const totalCost = quantityKg * pricePerKg;
  return {
    totalCost: totalCost.toFixed(2),
    costPerHectare: (totalCost / area).toFixed(2)
  };
}; 