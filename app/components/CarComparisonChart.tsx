import React, { useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

// Define types for our component props
interface CarPoint {
  id: string;
  name: string;
  x: number; // 0-100 percentage position
  y: number; // Height value
  isCurrent?: boolean;
}

interface SectionData {
  color: string;
  title: string;
  percentage: number; // Percentage of data in this section
}

interface CarComparisonChartProps {
  carPoints?: CarPoint[];
  sections?: SectionData[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

interface Point {
  x: number;
  y: number;
}

// Define interfaces for Chart.js dataset types
interface DatasetType {
  label: string;
  data: Point[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  tension: number;
  pointRadius: number;
}

// Default sections if none provided
const defaultSections: SectionData[] = [
  { color: 'rgba(241,91,105,1)', title: 'Low Match', percentage: 15 },
  { color: 'rgba(254,226,130,1)', title: 'Below Average', percentage: 15 },
  { color: 'rgba(31,158,107,1)', title: 'Good Match', percentage: 45 },
  { color: 'rgba(79,162,255,1)', title: 'Above Average', percentage: 15 },
  { color: 'rgba(64,56,255,1)', title: 'Excellent', percentage: 10 }
];

const CarComparisonChart: React.FC<CarComparisonChartProps> = ({ 
  carPoints = [], 
  sections = defaultSections,
  xAxisLabel = 'Lorem Ipsum',
  yAxisLabel = 'User Match'
}) => {
  const chartRef = useRef<ChartJS>(null);

  // Calculate distribution data based on sections
  const distributionData: number[] = sections.map(section => section.percentage);
  
  // Create labels for the x-axis
  const labels: (string | string[][])[] = [];
  let sectionIndex = 0;
  // Create 11 points for 5 sections (2 points per section + 1 at the end)
  for (let i = 0; i < 11; i++) {
    if (i % 2 === 1) {
      // For odd indices, show labels
      labels.push([[`${sectionIndex + 1}`], [sections[sectionIndex]?.title || '']]);
      sectionIndex++;
    } else {
      // For even indices, show empty labels
      labels.push("");
    }
  }

  // Generate a bell curve (Gaussian distribution)
  const generateBellCurve = (numPoints = 100): Point[] => {
    const points: Point[] = [];
    const mean = 50; // Center of the curve at 50%
    const stdDev = 18; // Standard deviation controls width
    const amplitude = 80; // Maximum height of the curve

    for (let i = 0; i <= numPoints; i++) {
      const x = i / numPoints * 100; // Convert to 0-100 scale
      
      // Gaussian function
      const y = amplitude * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      points.push({ x: x / 10, y }); // Convert x from 0-100 to 0-10 for chart
    }
    return points;
  };

  // Generate bell curve points
  const bellCurvePoints: Point[] = generateBellCurve();
  
  // Create datasets for each colored section
  const createDatasets = () => {
    const colors: string[] = sections.map(section => section.color);
    const datasets: DatasetType[] = [];
    
    // Convert bell curve to datasets for each section
    // Each section will cover a portion of the bell curve
    
    // Get x-value breakpoints for each section
    const sectionBreakpoints: number[] = [0];
    let cumulativePercentage = 0;
    sections.forEach(section => {
      cumulativePercentage += section.percentage;
      sectionBreakpoints.push(cumulativePercentage);
    });

    // Normalize breakpoints to 0-100 scale
    const totalPercentage: number = sections.reduce((sum, section) => sum + section.percentage, 0);
    const normalizedBreakpoints: number[] = sectionBreakpoints.map(bp => (bp / totalPercentage) * 100);
    
    // Create a dataset for each section
    for (let s = 0; s < sections.length; s++) {
      const sectionStart: number = normalizedBreakpoints[s] / 10; // Convert to 0-10 chart scale
      const sectionEnd: number = normalizedBreakpoints[s+1] / 10;  // Convert to 0-10 chart scale
      
      // Filter bell curve points to this section
      const sectionPoints: Point[] = bellCurvePoints.filter(
        point => point.x >= sectionStart && point.x <= sectionEnd
      );
      
      // Add points at the bottom to close the shape for fill
      const dataPoints: Point[] = [
        { x: sectionStart, y: 0 }, // Start at bottom left
        ...sectionPoints,          // Add all curve points
        { x: sectionEnd, y: 0 }    // End at bottom right
      ];
      
      // Sort points by x value to ensure proper rendering
      dataPoints.sort((a: Point, b: Point) => a.x - b.x);
      
      // Create the dataset
      datasets.push({
        label: sections[s].title,
        data: dataPoints,
        backgroundColor: colors[s],
        borderColor: 'rgba(255,255,255,0)',
        borderWidth: 0,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      });
    }
    
    return datasets;
  };

  // Chart data
  const data: ChartData<'line'> = {
    datasets: createDatasets(),
  };

  // Build annotation objects for car points and percentages
  const buildAnnotations = (): Record<string, any> => {
    const annotations: Record<string, any> = {};
    
    // Calculate maximum Y value for positioning
    const maxCarYValue = carPoints.length > 0 
      ? Math.max(...carPoints.map(car => car.y)) 
      : 0;
    
    // Find appropriate Y positions for percentage labels
    // Make sure they don't overlap with car points
    const percentageLabelYBase = Math.max(maxCarYValue + 25, 70);
    
    // Add percentage annotations
    sections.forEach((section, index) => {
      // Calculate position for percentage label
      const prevTotal: number = sections.slice(0, index)
        .reduce((sum: number, s) => sum + s.percentage, 0);
      const midPoint: number = prevTotal + (section.percentage / 2);
      const normalizedMidPoint: number = (midPoint / 100) * 10; // Scale to 0-10
      
      annotations[`label${index + 1}`] = {
        type: 'label',
        display: true,
        xValue: normalizedMidPoint,
        yValue: index % 2 === 0 ? percentageLabelYBase + 10 : percentageLabelYBase, // Alternate height to prevent overlap
        backgroundColor: 'rgba(255,255,255,0)',
        content: [`${section.percentage}%`],
        font: {
          size: 12,
          weight: 'bold'
        },
      };
    });
    
    // Add car point annotations
    carPoints.forEach((car, index) => {
      // Convert 0-100 x position to 0-10 chart position
      const xPos = car.x / 10;
      
      // Ensure car points stay within visible bounds (0-10 on x, 0-yAxisMax on y)
      const boundedXPos = Math.max(0.1, Math.min(9.9, xPos));
      const boundedYPos = Math.min(car.y, yAxisMax * 0.85); // Keep within 85% of the max Y value
      
      annotations[`car${index}`] = {
        type: 'point',
        xValue: boundedXPos,
        yValue: boundedYPos,
        backgroundColor: car.isCurrent ? 'black' : 'red',
        borderColor: 'white',
        borderWidth: 2,
        radius: 6,
      };
      
      // Add car name label - position based on bounded position
      annotations[`carLabel${index}`] = {
        type: 'label',
        xValue: boundedXPos,
        yValue: boundedYPos + 15,
        content: [car.name],
        backgroundColor: 'rgba(255,255,255,0)',
        font: {
          size: 12,
          weight: 'bold'
        },
      };
    });
    
    return annotations;
  };

  // Find maximum Y value among car points
  const maxCarYValue = carPoints.length > 0 
    ? Math.max(...carPoints.map(car => car.y)) 
    : 0;
  
  // Calculate appropriate Y-axis max with padding
  const yAxisMax = Math.max(90, maxCarYValue * 1.2); // Either 90 or 120% of max car Y value, whichever is larger
  
  // Create chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 10,
        grid: {
          display: false
        },
        title: {
          display: true,
          text: xAxisLabel,
          font: {
            weight: 'bold',
            size: 14
          },
        },
        ticks: {
          callback: function(this: any, tickValue: string | number, index: number, ticks: any[]): string | string[] | null | undefined {
            // Convert to number for calculation regardless of input type
            const value = Number(tickValue);
            if (value % 2 === 1) {
              const sectionIndex = Math.floor(value / 2);
              return [`${sectionIndex + 1}`, sections[sectionIndex]?.title || ''];
            }
            return '';
          },
          font: {
            weight: 'bold',
            size: 12
          },
        }
      },
      y: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            weight: 'bold',
            size: 14
          },
        },
        ticks: {
          display: false
        },
        min: 0,
        max: yAxisMax, // Dynamic max based on car points and curve
      }
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curve
      },
      point: {
        radius: 0, // Hide points
      }
    },
    plugins: {
      tooltip: { 
        enabled: false 
      },
      legend: {
        display: false
      },
      annotation: {
        clip: false, // Ensure annotations aren't clipped
        common: {
          drawTime: 'afterDraw' // Additional setting to ensure annotations are on top
        },
        annotations: buildAnnotations()
      },
    },
  };

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-3">Car Comparison Chart</h2>
      <div className="text-center text-sm mb-4">Each dot represents other possible car matches</div>
      
      <div className="h-64 md:h-80 w-full mb-6">
        <Line options={options} data={data} />
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-5 h-5 flex-shrink-0 mr-2" 
              style={{ backgroundColor: section.color }}
            ></div>
            <div className="text-sm">{section.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sample data for demonstration
const CarComparisonChartDemo: React.FC = () => {
  const sampleCarPoints: CarPoint[] = [
    { id: 'current', name: 'Current Car', x: 8, y: 15, isCurrent: true },
    { id: 'car1', name: 'Car 1', x: 20, y: 45 },
    { id: 'car2', name: 'Car 2', x: 30, y: 60 },
    { id: 'car3', name: 'Car 3', x: 40, y: 65 },
    { id: 'car4', name: 'Car 4', x: 60, y: 50 },
    { id: 'car5', name: 'Car 5', x: 75, y: 35 }
  ];
  
  const sampleSections: SectionData[] = [
    { color: 'rgba(241,91,105,1)', title: 'Low Match', percentage: 15 },
    { color: 'rgba(254,226,130,1)', title: 'Below Average', percentage: 15 },
    { color: 'rgba(31,158,107,1)', title: 'Good Match', percentage: 45 },
    { color: 'rgba(79,162,255,1)', title: 'Above Average', percentage: 15 },
    { color: 'rgba(64,56,255,1)', title: 'Excellent', percentage: 10 }
  ];
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <CarComparisonChart 
        carPoints={sampleCarPoints} 
        sections={sampleSections}
        xAxisLabel="Lorem Ipsum"
        yAxisLabel="User Match"
      />
    </div>
  );
};

export default CarComparisonChartDemo;