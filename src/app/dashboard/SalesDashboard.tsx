'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Filter, 
  BarChart3, LineChart as LineIcon, PieChart as PieIcon,
  ChevronDown, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getSalesByYear, SaleData } from '@/lib/data';

/**
 * UTILS
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ATOMS
 */

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  active = false,
  className 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'ghost'; 
  active?: boolean;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium",
      variant === 'primary' && (active ? "bg-indigo-600 text-white shadow-indigo-200 shadow-lg" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"),
      variant === 'secondary' && (active ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"),
      variant === 'ghost' && "hover:bg-slate-100 text-slate-600",
      className
    )}
  >
    {children}
  </button>
);

const Badge = ({ children, color = 'blue' }: { children: React.ReactNode, color?: 'blue' | 'green' | 'red' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    red: "bg-rose-100 text-rose-700 border-rose-200"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold border", colors[color])}>
      {children}
    </span>
  );
}

/**
 * MOLECULES
 */

const StatCard = ({ title, value, change, icon: Icon, color }: { 
  title: string; 
  value: string; 
  change: number; 
  icon: any; 
  color: string 
}) => {
  const isPositive = change > 0;
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl", color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <Badge color={isPositive ? 'green' : 'red'}>
          <div className="flex items-center gap-1">
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </div>
        </Badge>
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </Card>
  );
};

const ChartToggle = ({ type, setType }: { type: string, setType: (t: 'bar' | 'line' | 'pie') => void }) => (
  <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
    <Button 
      variant="ghost" 
      active={type === 'bar'} 
      onClick={() => setType('bar')}
      className={cn("px-3 rounded-lg", type === 'bar' && "bg-white text-indigo-600 shadow-sm")}
    >
      <BarChart3 size={18} />
    </Button>
    <Button 
      variant="ghost" 
      active={type === 'line'} 
      onClick={() => setType('line')}
      className={cn("px-3 rounded-lg", type === 'line' && "bg-white text-indigo-600 shadow-sm")}
    >
      <LineIcon size={18} />
    </Button>
    <Button 
      variant="ghost" 
      active={type === 'pie'} 
      onClick={() => setType('pie')}
      className={cn("px-3 rounded-lg", type === 'pie' && "bg-white text-indigo-600 shadow-sm")}
    >
      <PieIcon size={18} />
    </Button>
  </div>
);

/**
 * ORGANISMS
 */

export default function SalesDashboard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [threshold, setThreshold] = useState(0);
  const [data, setData] = useState<SaleData[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/sales?year=${selectedYear}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedYear]);

  const filteredData = useMemo(() => {
    return data.filter(d => d.sales >= threshold);
  }, [data, threshold]);

  const stats = useMemo(() => {
    const totalSales = filteredData.reduce((acc, curr) => acc + curr.sales, 0);
    const avgSales = filteredData.length > 0 ? totalSales / filteredData.length : 0;
    const totalProfit = filteredData.reduce((acc, curr) => acc + curr.profit, 0);
    
    // Comparison (mocking some growth)
    const growth = selectedYear === 2024 ? 12.5 : selectedYear === 2023 ? 8.2 : 5.4;

    return { totalSales, avgSales, totalProfit, growth };
  }, [filteredData, selectedYear]);

  const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      {/* Header Section (Atomic Molecule) */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Sales <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">
            Comprehensive overview of sales performance, profitability, and operational efficiency across multiple years.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 pl-2 border-r border-slate-100 pr-3">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent border-none focus:ring-0 text-sm font-semibold cursor-pointer outline-none"
            >
              <option value={2024}>FY 2024</option>
              <option value={2023}>FY 2023</option>
              <option value={2022}>FY 2022</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-2 pr-3">
            <Search size={18} className="text-slate-400" />
            <input 
              type="number"
              placeholder="Threshold..."
              className="bg-transparent border-none focus:ring-0 text-sm font-medium w-28 outline-none"
              onChange={(e) => setThreshold(Number(e.target.value) || 0)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid (Organism) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={loading ? '...' : `$${stats.totalSales.toLocaleString()}`} 
            change={stats.growth} 
            icon={DollarSign} 
            color="bg-indigo-600"
          />
          <StatCard 
            title="Average Ticket" 
            value={loading ? '...' : `$${Math.round(stats.avgSales).toLocaleString()}`} 
            change={2.1} 
            icon={TrendingUp} 
            color="bg-violet-600"
          />
          <StatCard 
            title="Net Profit" 
            value={loading ? '...' : `$${stats.totalProfit.toLocaleString()}`} 
            change={stats.growth + 1} 
            icon={TrendingUp} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Active Months" 
            value={loading ? '...' : `${filteredData.length}`} 
            change={0} 
            icon={TrendingUp} 
            color="bg-slate-800"
          />
        </section>

        {/* Chart Section (Organism) */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Performance Visualization</h2>
              <p className="text-slate-500 text-sm mt-1">Comparing monthly sales and expenditures</p>
            </div>
            <ChartToggle type={chartType} setType={setChartType} />
          </div>

          <div className="h-[400px] w-full relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Fetching intelligence data...</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={filteredData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="sales" name="Total Sales" fill="url(#salesGradient)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenditure" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="sales"
                    nameKey="month"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

      </main>

      <footer className="max-w-7xl mx-auto py-10 border-t border-slate-200 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
        <p>© 2026 Springer Sales Intelligence. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
