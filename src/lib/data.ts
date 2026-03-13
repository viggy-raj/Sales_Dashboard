export type SaleData = {
  month: string;
  sales: number;
  expenses: number;
  profit: number;
};

export type YearlySales = {
  [year: number]: SaleData[];
};

export const MOCK_SALES_DATA: YearlySales = {
  2024: [
    { month: 'Jan', sales: 4500, expenses: 3200, profit: 1300 },
    { month: 'Feb', sales: 5200, expenses: 3400, profit: 1800 },
    { month: 'Mar', sales: 4800, expenses: 3100, profit: 1700 },
    { month: 'Apr', sales: 6100, expenses: 4000, profit: 2100 },
    { month: 'May', sales: 5900, expenses: 3800, profit: 2100 },
    { month: 'Jun', sales: 6800, expenses: 4200, profit: 2600 },
    { month: 'Jul', sales: 7200, expenses: 4500, profit: 2700 },
    { month: 'Aug', sales: 7500, expenses: 4600, profit: 2900 },
    { month: 'Sep', sales: 7100, expenses: 4400, profit: 2700 },
    { month: 'Oct', sales: 8200, expenses: 5000, profit: 3200 },
    { month: 'Nov', sales: 9500, expenses: 6000, profit: 3500 },
    { month: 'Dec', sales: 11000, expenses: 7000, profit: 4000 },
  ],
  2023: [
    { month: 'Jan', sales: 3800, expenses: 2800, profit: 1000 },
    { month: 'Feb', sales: 4100, expenses: 2900, profit: 1200 },
    { month: 'Mar', sales: 4300, expenses: 3000, profit: 1300 },
    { month: 'Apr', sales: 4900, expenses: 3400, profit: 1500 },
    { month: 'May', sales: 5100, expenses: 3600, profit: 1500 },
    { month: 'Jun', sales: 5500, expenses: 3800, profit: 1700 },
    { month: 'Jul', sales: 5800, expenses: 4000, profit: 1800 },
    { month: 'Aug', sales: 6000, expenses: 4100, profit: 1900 },
    { month: 'Sep', sales: 5900, expenses: 4000, profit: 1900 },
    { month: 'Oct', sales: 6400, expenses: 4300, profit: 2100 },
    { month: 'Nov', sales: 7200, expenses: 4800, profit: 2400 },
    { month: 'Dec', sales: 8500, expenses: 5500, profit: 3000 },
  ],
  2022: [
    { month: 'Jan', sales: 3000, expenses: 2200, profit: 800 },
    { month: 'Feb', sales: 3200, expenses: 2300, profit: 900 },
    { month: 'Mar', sales: 3100, expenses: 2200, profit: 900 },
    { month: 'Apr', sales: 3600, expenses: 2600, profit: 1000 },
    { month: 'May', sales: 3800, expenses: 2700, profit: 1100 },
    { month: 'Jun', sales: 4000, expenses: 2900, profit: 1100 },
    { month: 'Jul', sales: 4200, expenses: 3000, profit: 1200 },
    { month: 'Aug', sales: 4400, expenses: 3100, profit: 1300 },
    { month: 'Sep', sales: 4300, expenses: 3000, profit: 1300 },
    { month: 'Oct', sales: 4800, expenses: 3400, profit: 1400 },
    { month: 'Nov', sales: 5200, expenses: 3700, profit: 1500 },
    { month: 'Dec', sales: 6000, expenses: 4200, profit: 1800 },
  ],
};

export const getSalesByYear = (year: number): SaleData[] => {
  return MOCK_SALES_DATA[year] || [];
};
