import React, {
  useState,
  useCallback,
  memo,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChevronDown, ChevronRight, Lock, Unlock, RotateCcw, Plus, Calculator, AlertTriangle } from "lucide-react";
import defaultCars from "../mock";
import { Car } from "../types/Car";
import CarsRating from "./CarsRating";

// Define the shape of our cars context
interface CarsContextType {
  cars: Car[];
  updateCarData: (index: number, car: Car) => void;
}

const defaultContextValue: CarsContextType = {
  cars: [],
  updateCarData: () => {}, // No-op function
};

const CarsContext = createContext<CarsContextType>(defaultContextValue);

// Type definitions
interface EditableCellProps {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
}

interface ReadOnlyCellProps {
  value: string | number;
  className?: string;
}

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  bgColor?: string;
}

interface CarColumnProps {
  initialCarData: Car;
  index: number;
  isVisible: boolean;
  expandedSections: ExpandedSections;
}

interface MaskedColumnProps {
  index: number;
  onUnlock: () => void;
}

interface ExpandedSections {
  roadCost: boolean;
  noFinance: boolean;
  convenience: boolean;
  livingCost: boolean;
  withFinance: boolean;
  financeCost: boolean;
  financeConvenience: boolean;
  financeLivingCost: boolean;
  carbonEmissions: boolean;
  carbScore: boolean;
}

// Custom hook return type
type UseCarReturn = [Car, (field: keyof Car, value: any) => void];

// For read-only cells
const ReadOnlyCell = memo(({ value, className }: ReadOnlyCellProps) => {
  return (
    <div className={`p-2 text-center h-14 flex items-center justify-center border-b border-gray-200 ${className}`}>
      {value}
    </div>
  );
});

// For editable cells
const EditableCell = memo(({ value, onChange, className = '' }: EditableCellProps) => {
  return (
    <div className={`p-2 text-center h-14 w-full flex items-center justify-center border border-gray-100 relative group ${className}`}>
      <div className="absolute top-1 right-1 text-gray-300 group-hover:text-gray-500 transition-colors duration-200">
        <div className="relative">
          <span className="cursor-help text-xs">ⓘ</span>
          <div className="absolute bottom-full right-0 mb-2 w-32 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            This cell is editable
          </div>
        </div>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-2 w-full transition-all duration-200 bg-white border border-gray-200 hover:border-blue-300"
      />
    </div>
  );
});
// Custom hook for a single car's state
const useCar = (initialData: Car, index: number): UseCarReturn => {
  const carsContext = useContext(CarsContext);
  const [carData, setCarData] = useState<Car>(initialData);

  // Use a ref to track if this is an internal update
  const isInternalUpdate = useRef(false);

  // Effect to sync initialData changes to local state
  // This runs when initialData changes from parent
  useEffect(() => {
    if (!isInternalUpdate.current) {
      setCarData(initialData);
    }
  }, [initialData]);

  // When car data changes from internal updates, update the context
  useEffect(() => {
    // Skip the first render and when updates come from parent
    if (isInternalUpdate.current) {
      carsContext.updateCarData(index, carData);
    }
  }, [carData, index, carsContext]);

  const updateField = useCallback((field: keyof Car, value: any) => {
    // Set the flag to indicate this is an internal update
    isInternalUpdate.current = true;

    setCarData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset the flag after a short delay
    setTimeout(() => {
      isInternalUpdate.current = false;
    }, 0);
  }, []);

  return [carData, updateField];
};

const SectionHeader = memo(
  ({ title, isExpanded, onClick, bgColor = "" }: SectionHeaderProps) => (
    <div
      className={`p-2 border text-center border-gray-200 font-medium cursor-pointer h-14 flex items-center justify-center ${bgColor} hover:bg-opacity-80 transition-colors duration-200`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2" />
        )}
        {title}
      </div>
    </div>
  )
);

// Formatting function for currency values
const formatCurrency = (value: number): string => {
  if (value === 0) return "--";
  return value > 0 ? `$${value}` : `-$${Math.abs(value)}`;
};

// Masked Column Component
const MaskedColumn = memo(({ index, onUnlock }: MaskedColumnProps) => {
  const isCurrentVehicle = index === 0;
  const columnTitle = isCurrentVehicle ? "Current Vehicle" : `Option ${index}`;
  const bgClass = isCurrentVehicle ? "" : "bg-green-50";

  return (
    <div className={`flex flex-col border-l border-gray-200 ${bgClass}`}>
      {/* Column Header */}
      <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center h-14">
        <span className="text-center font-medium">{columnTitle}</span>
        <Lock className="w-4 h-4 text-gray-500" />
      </div>

      {/* Masked content area */}
      <div className="bg-gray-50 flex flex-col justify-center items-center text-center p-6 h-full" style={{ minHeight: '30rem' }}>
        <div className="bg-white shadow-md rounded-xl p-6 max-w-xs transition-all duration-300 hover:shadow-lg">
          <Lock className="w-16 h-16 text-green-400 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Premium Content</h3>
          <p className="text-gray-600 text-center mb-6">This comparison data is available in the premium version.</p>
          <button
            onClick={onUnlock}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 flex items-center mx-auto"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Unlock Column
          </button>
        </div>
      </div>
    </div>
  );
});

// Car column component with isolated state
const CarColumn = memo(
  ({
    initialCarData,
    index,
    isVisible,
    expandedSections,
  }: CarColumnProps) => {
    const [car, updateCar] = useCar(initialCarData, index);

    if (!isVisible) return null;

    const isCurrentVehicle = index === 0;
    const columnTitle = isCurrentVehicle
      ? "Current Vehicle"
      : `Option ${index}`;
    const bgClass = isCurrentVehicle ? "" : "bg-green-50";

    // Handle numeric input
    const handleNumericInput = useCallback(
      (field: keyof Car, value: string) => {
        if (value === "" || value === "-") {
          updateCar(field, 0);
          return;
        }

        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
          updateCar(field, parsedValue);
        }
      },
      [updateCar]
    );

    // Handle percentage input
    const handlePercentInput = useCallback(
      (field: keyof Car, value: string) => {
        const cleanValue = value.replace("%", "");
        if (cleanValue === "" || cleanValue === "-") {
          updateCar(field, 0);
          return;
        }

        const parsedValue = parseFloat(cleanValue);
        if (!isNaN(parsedValue)) {
          updateCar(field, parsedValue);
        }
      },
      [updateCar]
    );

    // Get CARB score background color
    const getCarbScoreBgColor = (score: number): string => {
      if (score >= 4.5) return "bg-emerald-500";
      if (score >= 4.0) return "bg-emerald-400";
      if (score >= 3.5) return "bg-emerald-300";
      return "bg-amber-300";
    };

    return (
      <div className={`flex flex-col border-l border-gray-200 ${bgClass}`}>
        {/* Column Header */}
        <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center h-14">
          <span className="text-center font-medium">{columnTitle}</span>
        </div>

        {/* Car Rating */}
        <div className="border-b border-gray-200">
        <CarsRating 
          rating={car.rating} 
          coo={car.coo} 
          co2={car.co2} 
          savings={car.savings} 
          starRating={car.starRating}
        />
      </div>

        {/* Basic Car Info */}
        <ReadOnlyCell value={car.make} />
        <ReadOnlyCell value={car.model} />
        <ReadOnlyCell value={car.category} />
        <ReadOnlyCell value={car.trimGrade} />
        <ReadOnlyCell value={car.drive} />
        <ReadOnlyCell value={car.energyType} />
        <ReadOnlyCell value={car.fuelType} />
        <ReadOnlyCell value={`${car.range} km`} />
        <ReadOnlyCell value={car.makeYear} />
        <ReadOnlyCell value={car.state} />

        <EditableCell
          value={car.kilometers}
          onChange={(value) => handleNumericInput("kilometers", value)}
        />

        <EditableCell
          value={car.driveAwayPrice}
          onChange={(value) => handleNumericInput("driveAwayPrice", value)}
        />

        {/* Cost of keeping on road */}
        <ReadOnlyCell value={car.costPerYear} className="bg-green-100"/>

        {expandedSections.roadCost && (
          <>
            <EditableCell
              value={car.scheduledMaintenance}
              onChange={(value) =>
                handleNumericInput("scheduledMaintenance", value)
              }
            />

            <ReadOnlyCell value={car.petrolCost} />

            <ReadOnlyCell value={car.electricityCost} />

            <EditableCell
              value={car.registrationFees}
              onChange={(value) =>
                handleNumericInput("registrationFees", value)
              }
            />

            <EditableCell
              value={car.insuranceCosts}
              onChange={(value) => handleNumericInput("insuranceCosts", value)}
            />

            <EditableCell
              value={car.tyres}
              onChange={(value) => handleNumericInput("tyres", value)}
            />

            <ReadOnlyCell value={car.tyreChanges} />
          </>
        )}

        {/* NO FINANCE */}
        <ReadOnlyCell value={car.driveAwayPrice} className="bg-green-100"/>

        {expandedSections.noFinance && (
          <>
            <EditableCell
              value={car.totalCostOfOwnership}
              onChange={(value) =>
                handleNumericInput("totalCostOfOwnership", value)
              }
            />

            {/* Price of Convenience */}
            <EditableCell
              value={
                car.driveAwayPrice + car.totalCostOfOwnership + car.totalCOO
              }
              onChange={(value) =>
                handleNumericInput("priceOfConvenience", value)
              }
            />

            {expandedSections.convenience && (
              <>
                <EditableCell
                  value={car.driveAwayPriceFinance}
                  onChange={(value) =>
                    handleNumericInput("driveAwayPriceFinance", value)
                  }
                />

                <EditableCell
                  value={car.dealerCashIncentives}
                  onChange={(value) =>
                    handleNumericInput("dealerCashIncentives", value)
                  }
                />

                <ReadOnlyCell value={car.totalCOO} />

                <ReadOnlyCell value={car.depreciationDollars} />

                <EditableCell
                  value={`${car.depreciationPercent}%`}
                  onChange={(value) =>
                    handlePercentInput("depreciationPercent", value)
                  }
                />

                <ReadOnlyCell value={car.tradeInValue} />
              </>
            )}

            {/* Living Cost Savings */}
            <ReadOnlyCell value={car.livingCostSavings} />

            {expandedSections.livingCost && (
              <>
                <ReadOnlyCell value={car.fiveYearSavings} />
                <ReadOnlyCell value={car.annualSavings} />
                <ReadOnlyCell value={car.monthlySavings} />
                <ReadOnlyCell value={car.weeklySavings} />
              </>
            )}
          </>
        )}

        {/* WITH FINANCE */}
        <ReadOnlyCell value={car.financeWithTradeIn} className="bg-green-100" />

        {expandedSections.withFinance && (
          <>
            <ReadOnlyCell value={car.totalCostOfOwnership} />

            {/* Finance Costs */}
            <ReadOnlyCell
              value={
                car.driveAwayPrice + car.totalCostOfOwnership + car.totalCOO
              }
            />

            {expandedSections.financeCost && (
              <>
                <EditableCell
                  value={car.driveAwayPriceFinance}
                  onChange={(value) =>
                    handleNumericInput("driveAwayPriceFinance", value)
                  }
                />

                <EditableCell
                  value={`${car.depreciationPercent}%`}
                  onChange={(value) =>
                    handlePercentInput("depreciationPercent", value)
                  }
                />

                <EditableCell
                  value={car.totalCOO}
                  onChange={(value) => handleNumericInput("totalCOO", value)}
                />

                <EditableCell
                  value={car.depreciationDollars}
                  onChange={(value) =>
                    handleNumericInput("depreciationDollars", value)
                  }
                />

                <EditableCell
                  value={car.dealerCashIncentives}
                  onChange={(value) =>
                    handleNumericInput("dealerCashIncentives", value)
                  }
                />

                <EditableCell
                  value={car.tradeInValue}
                  onChange={(value) =>
                    handleNumericInput("tradeInValue", value)
                  }
                />
              </>
            )}

            {/* Price of Convenience after 5 years */}
            <ReadOnlyCell value={car.livingCostSavings} />

            {expandedSections.financeConvenience && (
              <>
                <EditableCell
                  value={car.driveAwayPriceFinance}
                  onChange={(value) =>
                    handleNumericInput("driveAwayPriceFinance", value)
                  }
                />

                <EditableCell
                  value={car.dealerCashIncentives}
                  onChange={(value) =>
                    handleNumericInput("dealerCashIncentives", value)
                  }
                />

                <ReadOnlyCell value={car.totalCOO} />

                <ReadOnlyCell value={car.depreciationDollars} />

                <EditableCell
                  value={`${car.depreciationPercent}%`}
                  onChange={(value) =>
                    handlePercentInput("depreciationPercent", value)
                  }
                />

                <ReadOnlyCell value={car.tradeInValue} />
              </>
            )}

            {/* My Estimated Cost of Living Savings */}
            <ReadOnlyCell value={car.livingCostSavings} />

            {expandedSections.financeLivingCost && (
              <>
                <ReadOnlyCell value={car.fiveYearSavings} />
                <ReadOnlyCell value={car.annualSavings} />
                <ReadOnlyCell value={car.monthlySavings} />
                <ReadOnlyCell value={car.weeklySavings} />
              </>
            )}
          </>
        )}

        {/* Carbon Emissions */}
        <ReadOnlyCell value={" "} className="bg-emerald-400" />

        {expandedSections.carbonEmissions && (
          <>
            <EditableCell
              value={`${car.offGridEnergyPercent}%`}
              onChange={(value) =>
                handlePercentInput("offGridEnergyPercent", value)
              }
            />

            <ReadOnlyCell value={car.carbonEmissionsAnnual} />

            <ReadOnlyCell value={car.carbonEmissionsFiveYears} />
          </>
        )}

        {/* CARB Score */}
        <div
          className={`${getCarbScoreBgColor(
            car.carbScore
          )} p-2 font-medium text-center text-white border-b border-gray-200 h-14 flex items-center justify-center`}
        >
          {car.carbScore}
        </div>
      </div>
    );
  }
);

// Main component
const CarComparisonCalculator: React.FC = () => {
  // Initialize cars state with default values - use deep clone to avoid reference issues
  const [cars, setCars] = useState<Car[]>(
    JSON.parse(JSON.stringify(defaultCars))
  );

  // Use section expansion state
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    roadCost: false,
    noFinance: false,
    convenience: false,
    livingCost: false,
    withFinance: false,
    financeCost: false,
    financeConvenience: false,
    financeLivingCost: false,
    carbonEmissions: false,
    carbScore: false,
  });

  // Track visibility for each column
  const [columnVisibility, setColumnVisibility] = useState<boolean[]>(
    defaultCars.map(() => true)
  );

  // Track which columns are masked (last two columns by default)
  const [maskedColumns, setMaskedColumns] = useState<boolean[]>(() => {
    return defaultCars.map((_, index, array) => {
      // Set the last three columns to be masked
      return index >= array.length - 3;
    });
  });

  // State to track if calculation is in progress
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // State for premium unlock modal
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [columnToUnlock, setColumnToUnlock] = useState<number | null>(null);

  // Create a function to update car data from child components - memoized to avoid creating new functions
  const updateCarData = useCallback((index: number, carData: Car) => {
    setCars((prevCars) => {
      // Skip update if the data is the same
      if (JSON.stringify(prevCars[index]) === JSON.stringify(carData)) {
        return prevCars;
      }

      const newCars = [...prevCars];
      newCars[index] = carData;
      return newCars;
    });
  }, []);

  // Create a context value - memoized to prevent unnecessary context updates
  const carsContextValue = React.useMemo(
    () => ({
      cars,
      updateCarData,
    }),
    [cars, updateCarData]
  );

  // Toggle section expansion
  const toggleSection = useCallback((section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // Handle unlock column request
  const handleUnlockColumn = useCallback((index: number) => {
    setColumnToUnlock(index);
    setShowUnlockModal(true);
  }, []);

  // Confirm unlock column
  const confirmUnlockColumn = useCallback(() => {
    if (columnToUnlock !== null) {
      setMaskedColumns((prev) => {
        const updated = [...prev];
        updated[columnToUnlock] = false;
        return updated;
      });
      setShowUnlockModal(false);
    }
  }, [columnToUnlock]);

  // Create toggle handlers for each column
  const toggleHandlers = defaultCars.map((_, index) => {
    return useCallback(() => {
      setColumnVisibility((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    }, [index]);
  });

  // Reset all
  const resetAll = useCallback(() => {
    setCars(JSON.parse(JSON.stringify(defaultCars)));
    // Reset visibility as well
    setColumnVisibility(defaultCars.map(() => true));
    // Reset masked columns - last two are masked
    setMaskedColumns(defaultCars.map((_, index, array) => index >= array.length - 3));
  }, []);

  // Add new car
  const addNewCar = useCallback(() => {
    // Clone the first car and add it to the list
    const newCar = { ...defaultCars[0], id: `car-${cars.length + 1}` };
    setCars((prev) => [...prev, newCar]);
    setColumnVisibility((prev) => [...prev, true]);
    // New car is masked by default
    setMaskedColumns((prev) => [...prev, true]);
  }, [cars.length]);

  // Calculate derived values for a car
  const calculateDerivedValues = (car: Car): Car => {
    // Calculate cost per year
    const costPerYear =
      car.scheduledMaintenance +
      car.petrolCost +
      car.electricityCost +
      car.registrationFees +
      car.insuranceCosts;

    // Calculate depreciation dollars
    const depreciationDollars =
      car.driveAwayPrice * (car.depreciationPercent / 100);

    // Calculate trade-in value
    const tradeInValue = car.driveAwayPrice - depreciationDollars;

    // Calculate total COO
    const totalCOO = car.costPerYear * 5 + car.tyres;

    // Calculate living cost savings (compared to first car if index > 0)
    const livingCostSavings = cars[0]
      ? cars[0].totalCostOfOwnership -
        car.totalCostOfOwnership +
        (cars[0].driveAwayPrice - car.driveAwayPrice) +
        (cars[0].depreciationDollars - car.depreciationDollars)
      : 0;

    // Calculate savings periods
    const fiveYearSavings = livingCostSavings;
    const annualSavings = livingCostSavings / 5;
    const monthlySavings = annualSavings / 12;
    const weeklySavings = annualSavings / 52;

    // CARB Score calculation (simplified)
    const emissionFactor = car.fuelType === "Electric" ? 0.1 : 1.0;
    const offGridFactor = 1 - car.offGridEnergyPercent / 100;
    const efficiencyFactor = car.range > 500 ? 1.2 : 1.0;
    const carbScore = 5 - emissionFactor * offGridFactor * efficiencyFactor;

    return {
      ...car,
      costPerYear,
      depreciationDollars,
      tradeInValue,
      totalCOO,
      livingCostSavings,
      fiveYearSavings,
      annualSavings,
      monthlySavings,
      weeklySavings,
      carbScore: parseFloat(carbScore.toFixed(1)),
    };
  };

  // Recalculate and send data to backend
  const recalculateAndSend = async () => {
    setIsCalculating(true);

    try {
      // Get only the visible cars that aren't masked
      const visibleCars = cars.filter(
        (_, index) => columnVisibility[index] && !maskedColumns[index]
      );

      // Calculate all derived values before sending
      const calculatedCars = visibleCars.map(calculateDerivedValues);

      console.log(
        "Sending updated car data to backend:",
        JSON.stringify(calculatedCars, null, 2)
      );

      // Send data to backend API
      const response = await fetch("your-backend-api-endpoint/recalculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calculatedCars),
      });

      if (response.ok) {
        const updatedData = await response.json();

        // Update the state with the recalculated values from the backend
        setCars((prevCars) => {
          const newCars = [...prevCars];

          // Match returned data with current cars by ID
          updatedData.forEach((updatedCar: Car) => {
            const index = newCars.findIndex((car) => car.id === updatedCar.id);
            if (index !== -1) {
              newCars[index] = updatedCar;
            }
          });

          return newCars;
        });

        // For demo purposes, show notification instead of alert
        // alert("Recalculation successful!");
      } else {
        const errorData = await response.json();
        // alert(`Error recalculating data: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error recalculating data:", error);

      // For demonstration purposes (when no backend is available)
      // Calculate values locally and update state
      const recalculatedCars = cars.map(calculateDerivedValues);
      setCars(recalculatedCars);

      // Show a success message
      // alert("Recalculation completed locally (no backend connection)");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <CarsContext.Provider value={carsContextValue}>
      <div className="max-w-full bg-gray-50 min-h-screen">
        <div className="mx-auto p-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Car Comparison Calculator</h2>
                  <p className="text-green-100 mt-1">Save costs and reduce environmental impact</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={resetAll}
                    className="bg-white text-green-800 px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-green-50 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset All
                  </button>
                  <button
                    onClick={addNewCar}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-emerald-600 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Car
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex">
                {/* Labels column */}
                <div className="flex-none border-r border-gray-200 bg-white">
                  <div className="p-3 bg-gray-100 border-b border-gray-200 h-14 flex items-center">
                    <span className="font-medium"></span>
                  </div>
                  <div className="border-b border-gray-200">
                    <span><CarsRating
                      rating={0}
                      coo={0}
                      co2={0}
                      savings={0}
                      starRating={0}
                    />
                    </span>
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Make
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    Model
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Category
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    Trim Grade
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Drive
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    Energy Type
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Fuel Type
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    Range
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Make Year
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    State
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                    Est. Kilometers per annum
                  </div>
                  <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                    Drive away price (incl. Govt. incentives)
                  </div>

                  {/* Cost of keeping this car on the road per year */}
                  <SectionHeader
                    title="Cost of keeping this car on the road per year"
                    isExpanded={expandedSections.roadCost}
                    onClick={() => toggleSection("roadCost")}
                    bgColor="bg-green-100"
                  />

                  {expandedSections.roadCost && (
                    <>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Scheduled Maintenance (Dealer)
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                        Petrol Cost
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Electricity Cost
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                        Registration Fees
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Insurance Costs (incl. Comprehensive)
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                        Tyres (only included in 5yr COO)
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        No. Tyre changes (50,000km)
                      </div>
                    </>
                  )}

                  {/* NO FINANCE */}
                  <SectionHeader
                    title="NO FINANCE"
                    isExpanded={expandedSections.noFinance}
                    onClick={() => toggleSection("noFinance")}
                    bgColor="bg-green-100"
                  />

                  {expandedSections.noFinance && (
                    <>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Total Cost Of Ownership (COO) over 5 years
                      </div>

                      {/* Price of Convenience */}
                      <SectionHeader
                        title="Price of Convenience after 5 years"
                        isExpanded={expandedSections.convenience}
                        onClick={() => toggleSection("convenience")}
                      />

                      {expandedSections.convenience && (
                        <>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Drive away price (incl. Govt. incentives)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Dealer Cash Incentives (NOT product giveaways)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Total COO
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Depreciation ($)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Depreciation (%)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Trade-in or Resale Value (inc.)
                          </div>
                        </>
                      )}

                      {/* My Estimated Cost of Living Savings */}
                      <SectionHeader
                        title="My Estimated Cost of Living Savings"
                        isExpanded={expandedSections.livingCost}
                        onClick={() => toggleSection("livingCost")}
                      />

                      {expandedSections.livingCost && (
                        <>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            5 years
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Annual
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Monthly
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Weekly
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* WITH FINANCE */}
                  <SectionHeader
                    title="WITH FINANCE and/or Trade-in"
                    isExpanded={expandedSections.withFinance}
                    onClick={() => toggleSection("withFinance")}
                    bgColor="bg-green-100"
                  />

                  {expandedSections.withFinance && (
                    <>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Total Cost Of Ownership (COOF) over 5 years
                      </div>

                      {/* Finance Costs */}
                      <SectionHeader
                        title="Finance Costs"
                        isExpanded={expandedSections.financeCost}
                        onClick={() => toggleSection("financeCost")}
                      />

                      {expandedSections.financeCost && (
                        <>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Loan amount (after Deposit, Trade-in/Resale)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Interest rate (APR)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Loan term (months)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Balloon payment
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Loan Establishment fees
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Admin fees
                          </div>
                        </>
                      )}

                      {/* Price of Convenience after 5 years */}
                      <SectionHeader
                        title="Price of Convenience after 5 years"
                        isExpanded={expandedSections.financeConvenience}
                        onClick={() => toggleSection("financeConvenience")}
                      />

                      {expandedSections.financeConvenience && (
                        <>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Drive away price (incl. Govt. incentives)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Dealer Cash Incentives (NOT product giveaways)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Total COOF
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Depreciation ($)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Depreciation (%)
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Trade-in or Resale Value (est.)
                          </div>
                        </>
                      )}

                      {/* My Estimated Cost of Living Savings */}
                      <SectionHeader
                        title="My Estimated Cost of Living Savings"
                        isExpanded={expandedSections.financeLivingCost}
                        onClick={() => toggleSection("financeLivingCost")}
                      />

                      {expandedSections.financeLivingCost && (
                        <>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            5 years
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Annual
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                            Monthly
                          </div>
                          <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                            Weekly
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* CARBON EMISSIONS */}
                  <SectionHeader
                    title="CARBON EMISSIONS"
                    isExpanded={expandedSections.carbonEmissions}
                    onClick={() => toggleSection("carbonEmissions")}
                    bgColor="bg-emerald-400"
                  />

                  {expandedSections.carbonEmissions && (
                    <>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Off-grid energy % (e.g. solar)
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center">
                        5 years (kg)
                      </div>
                      <div className="border-b border-gray-200 p-2 font-medium h-14 flex items-center bg-gray-50">
                        Annual (kg)
                      </div>
                    </>
                  )}

                  {/* CARB SCORE */}
                  <SectionHeader
                    title="CARB SCORE"
                    isExpanded={expandedSections.carbScore}
                    onClick={() => toggleSection("carbScore")}
                    bgColor="bg-amber-100"
                  />
                </div>

                {/* Car columns */}
                {cars.map((car, index) => {
                  // Check if this column should be visible
                  if (!columnVisibility[index]) return null;
                  
                  // Check if this column should be masked
                  if (maskedColumns[index]) {
                    return (
                      <MaskedColumn 
                        key={car.id} 
                        index={index} 
                        onUnlock={() => handleUnlockColumn(index)} 
                      />
                    );
                  }
                  
                  // Otherwise render normal column
                  return (
                      <CarColumn
                        key={car.id}
                        initialCarData={car}
                        index={index}
                        isVisible={true}
                        expandedSections={expandedSections}
                      />
                  );
                })}

                {/* Add new car column button */}
                <div className="flex-none border border-gray-200 border-dashed flex items-center justify-center w-16 hover:bg-green-50 transition-colors duration-200">
                  <button
                    className="text-green-600 p-4 rounded-full hover:bg-green-100 transition duration-200"
                    onClick={addNewCar}
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Information cards below the calculator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Premium content message */}
              {maskedColumns.some(Boolean) && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-green-600 rounded-full p-2 mr-4">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-green-800">Premium Content Available</h3>
                      <p className="text-gray-700 mb-3">
                        Unlock all comparison columns to see complete data and make a more informed decision.
                      </p>
                      <button 
                        onClick={() => handleUnlockColumn(maskedColumns.findIndex(Boolean))}
                        className="text-green-600 font-medium hover:text-green-800 transition-colors duration-200 flex items-center"
                      >
                        Upgrade to Premium <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CarReb Recommendation */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="bg-emerald-600 rounded-full p-2 mr-4">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-emerald-800">CarReb Recommendation</h3>
                    <p className="text-gray-700">
                      Compare vehicles side by side to make an informed decision that
                      saves money and reduces environmental impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                All calculations are estimates. Consult with a financial advisor for personalized advice.
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200 flex items-center"
                  onClick={resetAll}
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-sm transition duration-200 flex items-center"
                  onClick={recalculateAndSend}
                  disabled={isCalculating}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  {isCalculating ? "Calculating..." : "Recalculate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Unlock Premium Content</h3>
            <p className="mb-6 text-gray-600">
              Upgrade to premium to unlock this comparison column and gain access to all vehicle data.
            </p>
            <div className="bg-green-50 p-6 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-green-800">Premium Membership</span>
                <span className="font-bold text-xl text-green-800">$9.99<span className="text-sm font-normal">/month</span></span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-white text-xs">✓</div> Access all car comparison data</li>
                <li className="flex items-center"><div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-white text-xs">✓</div> Save multiple comparisons</li>
                <li className="flex items-center"><div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-white text-xs">✓</div> Export detailed reports</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={confirmUnlockColumn}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Unlock Now
              </button>
            </div>
          </div>
        </div>
      )}
    </CarsContext.Provider>
  );
};

export default CarComparisonCalculator;