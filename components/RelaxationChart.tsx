import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { time: '0m', heartRate: 85, stress: 80 },
  { time: '10m', heartRate: 78, stress: 70 },
  { time: '20m', heartRate: 72, stress: 55 },
  { time: '30m', heartRate: 68, stress: 45 },
  { time: '40m', heartRate: 65, stress: 35 },
  { time: '50m', heartRate: 63, stress: 30 },
  { time: '60m', heartRate: 60, stress: 25 },
  { time: '90m', heartRate: 58, stress: 20 },
  { time: '120m', heartRate: 57, stress: 15 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sanctuary-earth/90 border border-sanctuary-gold p-3 rounded shadow-xl backdrop-blur-md">
        <p className="text-sanctuary-mist text-sm font-bold mb-1">Time: {label}</p>
        <p className="text-sanctuary-gold text-xs">Heart Rate: {payload[0].value} bpm</p>
        <p className="text-blue-300 text-xs">Inner Noise: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
};

const RelaxationChart: React.FC = () => {
  return (
    <div className="w-full h-[350px] p-4 bg-sanctuary-dark/50 border border-sanctuary-sage/30 rounded-lg">
       <div className="mb-4">
        <h3 className="text-sanctuary-gold font-serif text-lg">Impact of The Sleepy Narrative</h3>
        <p className="text-xs text-sanctuary-mist/70">Visualizing the physiological shift during a 2-hour session.</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="#57534e" tick={{fill: '#a8a29e', fontSize: 12}} />
          <YAxis stroke="#57534e" tick={{fill: '#a8a29e', fontSize: 12}} />
          <CartesianGrid strokeDasharray="3 3" stroke="#44403c" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="heartRate" 
            stroke="#d4af37" 
            fillOpacity={1} 
            fill="url(#colorHr)" 
            strokeWidth={2}
            name="Heart Rate"
          />
          <Area 
            type="monotone" 
            dataKey="stress" 
            stroke="#9ca3af" 
            fillOpacity={1} 
            fill="url(#colorStress)" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            name="Inner Noise"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RelaxationChart;
