import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface VariabilitySpotlightProps {
  variableName: string;
  dataset: string;
}

const VariabilitySpotlight: React.FC<VariabilitySpotlightProps> = ({ variableName, dataset }) => {
  const data = useMemo(() => {
    const points: any[] = [];
    const n = 100; // Sample size for the visual

    // Helper to generate normal distribution
    const normal = (mean: number, std: number) => {
      let u = 0, v = 0;
      while(u === 0) u = Math.random();
      while(v === 0) v = Math.random();
      return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    // Helper to generate skewed distribution
    const skewed = (min: number, max: number, skew: number) => {
      return min + Math.pow(Math.random(), skew) * (max - min);
    };

    if (variableName === 'time_in_hospital') {
      // 1-14 days, skewed right
      for (let i = 1; i <= 14; i++) {
        const count = Math.round(100 * Math.exp(-0.3 * i) * (Math.random() * 0.4 + 0.8));
        points.push({ name: `${i}d`, value: count });
      }
    } else if (variableName === 'num_lab_procedures') {
      // 1-100, normal-ish
      const bins = 10;
      const counts = new Array(bins).fill(0);
      for (let i = 0; i < n; i++) {
        const val = Math.max(1, Math.min(100, normal(43, 20)));
        const binIdx = Math.min(bins - 1, Math.floor((val - 1) / (100 / bins)));
        counts[binIdx]++;
      }
      counts.forEach((c, i) => points.push({ name: `${i * 10}-${(i + 1) * 10}`, value: c }));
    } else if (variableName === 'readmitted_30days') {
      points.push({ name: 'Yes', value: 11, color: '#991b1b' });
      points.push({ name: 'No', value: 89, color: '#065f46' });
    } else if (variableName === 'mh_score') {
      // 1.0-5.0, normal
      const bins = 8;
      const counts = new Array(bins).fill(0);
      for (let i = 0; i < n; i++) {
        const val = Math.max(1, Math.min(5, normal(3.2, 0.8)));
        const binIdx = Math.min(bins - 1, Math.floor((val - 1) / (4 / bins)));
        counts[binIdx]++;
      }
      counts.forEach((c, i) => points.push({ name: (1 + i * 0.5).toFixed(1), value: c }));
    } else if (variableName === 'median_household_income') {
      // $20k-$150k, log-normal
      const bins = 10;
      const counts = new Array(bins).fill(0);
      for (let i = 0; i < n; i++) {
        const val = Math.max(20, Math.min(150, Math.exp(normal(Math.log(55), 0.4))));
        const binIdx = Math.min(bins - 1, Math.floor((val - 20) / (130 / bins)));
        counts[binIdx]++;
      }
      counts.forEach((c, i) => points.push({ name: `$${Math.round(20 + i * 13)}k`, value: c }));
    } else if (variableName === 'pct_bachelors') {
      const bins = 10;
      const counts = new Array(bins).fill(0);
      for (let i = 0; i < n; i++) {
        const val = Math.max(5, Math.min(60, normal(28, 12)));
        const binIdx = Math.min(bins - 1, Math.floor((val - 5) / (55 / bins)));
        counts[binIdx]++;
      }
      counts.forEach((c, i) => points.push({ name: `${Math.round(5 + i * 5.5)}%`, value: c }));
    } else if (variableName === 'race') {
      points.push({ name: 'Cauc.', value: 75 });
      points.push({ name: 'AfrAm.', value: 19 });
      points.push({ name: 'Hisp.', value: 3 });
      points.push({ name: 'Other', value: 3 });
    } else if (variableName === 'change') {
      points.push({ name: 'Ch', value: 46 });
      points.push({ name: 'No', value: 54 });
    } else if (variableName === 'daily_sm_time') {
      points.push({ name: '<1h', value: 10 });
      points.push({ name: '1-2h', value: 20 });
      points.push({ name: '2-3h', value: 30 });
      points.push({ name: '3-5h', value: 25 });
      points.push({ name: '>5h', value: 15 });
    } else if (variableName === 'num_platforms') {
      for (let i = 1; i <= 9; i++) {
        points.push({ name: `${i}`, value: Math.round(10 + Math.random() * 15) });
      }
    } else if (variableName === 'purposeless_use' || variableName === 'feel_depressed' || variableName === 'difficulty_concentrating') {
      for (let i = 1; i <= 5; i++) {
        points.push({ name: `${i}`, value: Math.round(10 + Math.random() * 20) });
      }
    } else if (variableName === 'region') {
      points.push({ name: 'South', value: 38 });
      points.push({ name: 'West', value: 24 });
      points.push({ name: 'Midw.', value: 21 });
      points.push({ name: 'NE', value: 17 });
    } else if (variableName === 'urbanization') {
      points.push({ name: 'Rural', value: 45 });
      points.push({ name: 'Sub.', value: 35 });
      points.push({ name: 'Urban', value: 20 });
    } else if (variableName === 'pct_65_older') {
      const bins = 8;
      const counts = new Array(bins).fill(0);
      for (let i = 0; i < n; i++) {
        const val = Math.max(5, Math.min(40, normal(18, 6)));
        const binIdx = Math.min(bins - 1, Math.floor((val - 5) / (35 / bins)));
        counts[binIdx]++;
      }
      counts.forEach((c, i) => points.push({ name: `${Math.round(5 + i * 4.4)}%`, value: c }));
    } else {
      // Fallback generic distribution
      for (let i = 1; i <= 5; i++) {
        points.push({ name: `Cat ${i}`, value: Math.round(20 + Math.random() * 30) });
      }
    }

    return points;
  }, [variableName, dataset]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-bg rounded-xl p-4 border-2 border-teal/20 shadow-inner mt-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-teal" />
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-teal font-mono">
          Variability Spotlight: {variableName}
        </h4>
      </div>
      
      <div className="h-32 w-full" role="img" aria-label={`Histogram showing the distribution of ${variableName}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#475569', fontFamily: 'DM Mono' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#475569', fontFamily: 'DM Mono' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(6, 95, 70, 0.05)' }}
              contentStyle={{ 
                fontSize: '10px', 
                fontFamily: 'DM Mono', 
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#065f46'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-[10px] text-text-dim mt-2 leading-relaxed italic text-center">
        Notice how the data is spread out? This <strong>variability</strong> is why we need statistics to find the "typical" answer.
      </p>
    </motion.div>
  );
};

export default VariabilitySpotlight;
