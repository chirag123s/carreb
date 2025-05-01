import React, {
  useState,
  useCallback,
  memo,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChevronDown, ChevronRight, Lock, Unlock } from "lucide-react";
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
const ReadOnlyCell = memo(({ value ,className }: ReadOnlyCellProps) => {
  return (
    <div className={`p-2 text-center h-14 flex items-center justify-center border-b border-gray-300 ${className}`}>
      {value}
    </div>
  );
});

// For editable cells
const EditableCell = memo(({ value, onChange }: EditableCellProps) => {
  return (
    <div className="p-2 text-center h-14 bg-green-100 w-full flex items-center justify-center border-b border-gray-300">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md p-2"
      />
    </div>
  );
});

// Custom hook for a single car's state - FIXED to prevent infinite loop
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
      className={`p-2 border text-center border-gray-300 font-medium cursor-pointer h-14 flex items-center justify-center ${bgColor}`}
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
    <div className={`flex flex-col border-l border-gray-300 ${bgClass}`}>
      {/* Column Header */}
      <div className="p-3 bg-gray-200 border-b border-gray-300 flex justify-between items-center h-14">
        <span className="text-center font-medium">{columnTitle}</span>
        <Lock className="w-4 h-4 text-gray-500" />
      </div>

      {/* Masked content area */}
      <div className="bg-gray-100 flex flex-col justify-center items-center text-center p-6 h-full " style={{ minHeight: '30rem' }}>
        <Lock className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Premium Content</h3>
        <p className="text-gray-500 text-center mb-6">This comparison data is available in the premium version.</p>
        <button
          onClick={onUnlock}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 flex items-center"
        >
          <Unlock className="w-4 h-4 mr-2" />
          Unlock Column
        </button>
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
      if (score >= 4.5) return "bg-green-500";
      if (score >= 4.0) return "bg-green-400";
      if (score >= 3.5) return "bg-green-300";
      return "bg-yellow-300";
    };

    return (
      <div className={`flex flex-col border-l border-gray-300 ${bgClass}`}>
        {/* Column Header */}
        <div className="p-3 bg-gray-200 border-b border-gray-300 flex justify-between items-center h-14">
          <span className="text-center font-medium">{columnTitle}</span>
        </div>

        {/* Car Rating */}
        <div className="border-b border-gray-300">
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
        <ReadOnlyCell value={car.costPerYear} className="bg-gray-300"/>

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
        <ReadOnlyCell value={car.driveAwayPrice} className="bg-gray-300"/>

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
        <ReadOnlyCell value={car.financeWithTradeIn} className="bg-gray-300" />

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
        <ReadOnlyCell value={" "} className="bg-green-400" />

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
          )} p-2 font-medium text-center text-white border-b border-gray-300`}
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

        alert("Recalculation successful!");
      } else {
        const errorData = await response.json();
        alert(
          `Error recalculating data: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error recalculating data:", error);

      // For demonstration purposes (when no backend is available)
      // Calculate values locally and update state
      const recalculatedCars = cars.map(calculateDerivedValues);
      setCars(recalculatedCars);

      // Show a success message
      alert("Recalculation completed locally (no backend connection)");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <CarsContext.Provider value={carsContextValue}>
      <div className="max-w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="bg-green-100 p-4 rounded-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white bg-green-700 p-2 rounded">
                Save costs and the planet
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={resetAll}
                  className="bg-white text-green-800 px-4 py-2 rounded flex items-center"
                >
                  <span className="mr-2">↺</span> Reset All
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex">
              {/* Labels column */}
              <div className="flex-none border-r border-gray-300">
                <div className="p-3 bg-gray-200 border-b border-gray-300 h-14 flex items-center">
                  <span className="font-medium"></span>
                </div>
                <div className="border-b border-gray-300 ">
                  <span ><CarsRating
                    rating={0}
                    coo={0}
                    co2={0}
                    savings={0}
                    starRating={0}
                  />
                  </span>
                </div>
                <div className="border-b border-gray-300 p-2 font-medium h-14 flex items-center">
                  Make
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Model
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Category
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Trim Grade
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Drive
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Energy Type
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Fuel Type
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Range
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Make Year
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  State
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Est. Kilometers per annum
                </div>
                <div className="border-b border-gray-300 p-2 font-medium min-h-14">
                  Drive away price (incl. Govt. incentives)
                </div>

                {/* Cost of keeping this car on the road per year */}
                <SectionHeader
                  title="Cost of keeping this car on the road per year"
                  isExpanded={expandedSections.roadCost}
                  onClick={() => toggleSection("roadCost")}
                  bgColor="bg-gray-300"
                />

                {expandedSections.roadCost && (
                  <>
                      <ReadOnlyCell value={"Scheduled Maintenance (Dealer)"}/>
                      <ReadOnlyCell value={"Petrol Cost"}/>
                      <ReadOnlyCell value={"Electricity Cost"}/>
                      <ReadOnlyCell value={"Registration Fees"}/>
                      <ReadOnlyCell value={"Insurance Costs (incl. Comprehensive)"}/>
                      <ReadOnlyCell value={"Tyres (only included in 5yr COO)"}/>
                      <ReadOnlyCell value={"No. Tyre changes (50,000km)"}/>

                   
                  </>
                )}

                {/* NO FINANCE */}
                <SectionHeader
                  title="NO FINANCE"
                  isExpanded={expandedSections.noFinance}
                  onClick={() => toggleSection("noFinance")}
                  bgColor="bg-gray-300"
                />

                {expandedSections.noFinance && (
                  <>
                    <ReadOnlyCell
                      value = {"Total Cost Of Ownership (COO) over 5 years"}
                    />

                    {/* Price of Convenience */}
                    <SectionHeader
                      title="Price of Convenience after 5 years"
                      isExpanded={expandedSections.convenience}
                      onClick={() => toggleSection("convenience")}
                    />

                    {expandedSections.convenience && (
                      <>
                        <ReadOnlyCell 
                        value = {"Drive away price (incl. Govt. incentives)"}/>
                        <ReadOnlyCell 
                        value = {"Dealer Cash Incentives (NOT product giveaways)"}/>
                        <ReadOnlyCell 
                        value = {"Total COO"}/>
                        <ReadOnlyCell 
                        value = {"Depreciation ($)"}/>
                        <ReadOnlyCell 
                        value = {"Depreciation (%)"}/>
                        <ReadOnlyCell 
                        value = {"Trade-in or Resale Value (inc.)"}/>
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
                        <ReadOnlyCell value = {"5 years"}/>
                        <ReadOnlyCell value = {"Annual"}/>
                        <ReadOnlyCell value = {"Monthly"}/>
                        <ReadOnlyCell value = {"Weekly"}/>
                      </>
                    )}
                  </>
                )}

                {/* WITH FINANCE */}
                <SectionHeader
                  title="WITH FINANCE and/or Trade-in"
                  isExpanded={expandedSections.withFinance}
                  onClick={() => toggleSection("withFinance")}
                  bgColor="bg-gray-300"
                />

                {expandedSections.withFinance && (
                  <>
                    <ReadOnlyCell value = {"Total Cost Of Ownership (COOF) over 5 years"}/>

                    {/* Finance Costs */}
                    <SectionHeader
                      title="Finance Costs"
                      isExpanded={expandedSections.financeCost}
                      onClick={() => toggleSection("financeCost")}
                    />

                    {expandedSections.financeCost && (
                      <>
                        <ReadOnlyCell value = {"Loan amount (after Deposit, Trade-in/Resale)"}/>
                        <ReadOnlyCell 
                        value = {"Interest rate (APR)"}/>
                        <ReadOnlyCell 
                        value = {"Loan term (months)"}/>
                        <ReadOnlyCell 
                        value = {"Balloon payment"}/>
                        <ReadOnlyCell 
                        value = {"Loan Establishment fees"}/>
                        <ReadOnlyCell 
                        value = {"Admin fees"}/>
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
                        <ReadOnlyCell value={"Drive away price (incl. Govt. incentives)"} />
                        <ReadOnlyCell value={"Dealer Cash Incentives (NOT product giveaways)"} />
                        <ReadOnlyCell value={"Total COOF"} />
                        <ReadOnlyCell value={"Depreciation ($)"} />
                        <ReadOnlyCell value={"Depreciation (%)"} />
                        <ReadOnlyCell value={"Trade-in or Resale Value (est.)"} />
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
                        <ReadOnlyCell value={"5 years"} />
                        <ReadOnlyCell value={"Annual"} />
                        <ReadOnlyCell value={"Monthly"} />
                        <ReadOnlyCell value={"Weekly"} />
                      </>
                    )}
                  </>
                )}

                {/* CARBON EMISSIONS */}
                <SectionHeader
                  title="CARBON EMISSIONS"
                  isExpanded={expandedSections.carbonEmissions}
                  onClick={() => toggleSection("carbonEmissions")}
                  bgColor="bg-green-400"
                />

                {expandedSections.carbonEmissions && (
                  <>
                    <ReadOnlyCell
                      value = {"Off-grid energy % (e.g. solar)"}/>
                    <ReadOnlyCell
                      value = {"5 years (kg)"}/>
                    <ReadOnlyCell
                      value = {"Annual (kg)"}/>
                  </>
                )}

                {/* CARB SCORE */}
                <SectionHeader
                  title="CARB SCORE"
                  isExpanded={expandedSections.carbScore}
                  onClick={() => toggleSection("carbScore")}
                  bgColor="bg-yellow-100"
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
              <div className="flex-none border border-gray-300 border-dashed flex items-center justify-center w-16">
                <button
                  className="text-green-800 p-2 rounded-full hover:bg-green-100 transition duration-200"
                  onClick={addNewCar}
                >
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium content message */}
          {maskedColumns.some(Boolean) && (
            <div className="bg-blue-50 p-4 mt-6 rounded-md">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Premium Content Available
              </h3>
              <p className="text-gray-700 mb-3">
                Some comparison columns are locked. Unlock them to see all the data and make a more informed decision.
              </p>
            </div>
          )}

          <div className="bg-green-50 p-4 mt-6 rounded-md text-center">
            <h3 className="text-lg font-medium mb-2">CarReb Recommendation</h3>
            <p className="text-gray-700">
              Compare vehicles side by side to make an informed decision that
              saves money and reduces environmental impact.
            </p>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 flex items-center"
              onClick={recalculateAndSend}
              disabled={isCalculating}
            >
              {isCalculating ? "Calculating..." : "Recalculate"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Premium Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Unlock Premium Content</h3>
            <p className="mb-6">
              Upgrade to premium to unlock this comparison column and gain access to all vehicle data.
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>Premium Membership</span>
                <span className="font-bold">$9.99/month</span>
              </div>
              <ul className="text-sm text-gray-700">
                <li className="flex items-center"><span className="mr-2">✓</span> Access all car comparison data</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Save multiple comparisons</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Export detailed reports</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={confirmUnlockColumn}
                className="px-4 py-2 bg-green-600 text-white rounded"
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
