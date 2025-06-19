
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface SkillData {
  name: string;
  level: number;
  category: string;
}

interface SkillChartProps {
  skills: SkillData[];
  animate?: boolean;
}

const SkillChart = ({ skills, animate = true }: SkillChartProps) => {
  const [animatedData, setAnimatedData] = useState(
    skills.map(skill => ({ ...skill, level: 0 }))
  );

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedData(skills);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAnimatedData(skills);
    }
  }, [skills, animate]);

  const getBarColor = (category: string) => {
    switch (category) {
      case "Frontend": return "#0066CC";
      case "Backend": return "#00CC66";
      case "Database": return "#FF6B35";
      default: return "#6B7280";
    }
  };

  return (
    <div className="w-full h-64 animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={animatedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, "Nível"]}
            labelFormatter={(label) => `Habilidade: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="level" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationBegin={0}
          >
            {animatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
