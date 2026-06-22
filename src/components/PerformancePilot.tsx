import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Download, Plus, Trash2, Percent, IndianRupeeIcon , Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface ExpenseCategory {
  id: string;
  name: string;
  amount: string;
}

interface FinancialData {
  revenue: string;
  expenses: ExpenseCategory[];
  debtPayments: string;
  equityPayments: string;
  taxRate: string;
}

export function PerformancePilot() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    revenue: '',
    expenses: [
      { id: '1', name: 'Material Costs', amount: '' },
      { id: '2', name: 'Labor Costs', amount: '' },
      { id: '3', name: 'Rent', amount: '' },
      { id: '4', name: 'Utilities', amount: '' },
    ],
    debtPayments: '',
    equityPayments: '',
    taxRate: '30',
  });
  
  const [showResults, setShowResults] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  
  const handleRevenueChange = (value: string) => {
    setFinancialData(prev => ({ ...prev, revenue: value }));
  };
  
  const handleExpenseChange = (id: string, field: 'name' | 'amount', value: string) => {
    setFinancialData(prev => ({
      ...prev,
      expenses: prev.expenses.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };
  
  const handleAddExpense = () => {
    if (!newExpenseName.trim()) {
      toast.error('Please enter an expense name');
      return;
    }
    
    const newExpense: ExpenseCategory = {
      id: Date.now().toString(),
      name: newExpenseName,
      amount: '',
    };
    
    setFinancialData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense]
    }));
    setNewExpenseName('');
    toast.success(`Added ${newExpenseName}`);
  };
  
  const handleRemoveExpense = (id: string) => {
    setFinancialData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(exp => exp.id !== id)
    }));
    toast.success('Expense removed');
  };
  
  const handleAnalyze = () => {
    if (!financialData.revenue) {
      toast.error('Please enter your revenue');
      return;
    }
    
    const hasExpenses = financialData.expenses.some(exp => exp.amount);
    if (!hasExpenses) {
      toast.error('Please enter at least one expense');
      return;
    }
    
    setShowResults(true);
    toast.success('Financial analysis complete!');
  };
  
  // Calculate all financial metrics
  const revenue = parseFloat(financialData.revenue) || 0;
  const totalExpenses = financialData.expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
  const profitBeforeTax = revenue - totalExpenses;
  const taxRate = parseFloat(financialData.taxRate) || 0;
  const taxes = (profitBeforeTax * taxRate) / 100;
  const profitAfterTax = profitBeforeTax - taxes;
  const debtPayments = parseFloat(financialData.debtPayments) || 0;
  const equityPayments = parseFloat(financialData.equityPayments) || 0;
  const totalStakeholderPayments = debtPayments + equityPayments;
  const netProfit = profitAfterTax - totalStakeholderPayments;
  
  // Calculate ratios and metrics
  const grossProfitMargin = revenue > 0 ? ((profitBeforeTax / revenue) * 100) : 0;
  const netProfitMargin = revenue > 0 ? ((netProfit / revenue) * 100) : 0;
  const expenseRatio = revenue > 0 ? ((totalExpenses / revenue) * 100) : 0;
  const taxBurden = profitBeforeTax > 0 ? ((taxes / profitBeforeTax) * 100) : 0;
  const debtToEquityRatio = equityPayments > 0 ? (debtPayments / equityPayments) : 0;
  const returnOnRevenue = revenue > 0 ? ((netProfit / revenue) * 100) : 0;
  
  // Waterfall chart data
  const waterfallData = [
    { name: 'Revenue', value: revenue, color: '#10b981' },
    { name: 'Total Expenses', value: -totalExpenses, color: '#ef4444' },
    { name: 'Profit Before Tax', value: profitBeforeTax, color: '#3b82f6' },
    { name: 'Taxes', value: -taxes, color: '#f59e0b' },
    { name: 'Profit After Tax', value: profitAfterTax, color: '#8b5cf6' },
    { name: 'Debt Payments', value: -debtPayments, color: '#ec4899' },
    { name: 'Equity Payments', value: -equityPayments, color: '#f97316' },
    { name: 'Net Profit', value: netProfit, color: netProfit >= 0 ? '#10b981' : '#ef4444' },
  ];
  
  // Expense breakdown for pie chart
  const expenseBreakdown = financialData.expenses
    .filter(exp => parseFloat(exp.amount) > 0)
    .map(exp => ({
      name: exp.name,
      value: parseFloat(exp.amount),
    }));
  
  const COLORS = ['#0ea5e9', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#10b981', '#3b82f6'];
  
  // Get health status
  const getHealthStatus = (value: number, thresholds: { good: number; warning: number }): { status: string; color: string; icon: any } => {
    if (value >= thresholds.good) {
      return { status: 'Healthy', color: 'text-green-600', icon: CheckCircle };
    } else if (value >= thresholds.warning) {
      return { status: 'Moderate', color: 'text-yellow-600', icon: AlertCircle };
    } else {
      return { status: 'Needs Attention', color: 'text-red-600', icon: AlertTriangle };
    }
  };
  
  const profitMarginHealth = getHealthStatus(netProfitMargin, { good: 15, warning: 5 });
  const expenseRatioHealth = getHealthStatus(100 - expenseRatio, { good: 30, warning: 20 });
  
  // Generate recommendations
  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];
    
    if (netProfitMargin < 10) {
      recommendations.push('💰 Your net profit margin is below 10%. Consider reviewing expenses or increasing prices to improve profitability.');
    }
    
    if (expenseRatio > 80) {
      recommendations.push('📊 Expenses are consuming over 80% of revenue. Look for cost optimization opportunities in your largest expense categories.');
    }
    
    if (taxBurden > 35) {
      recommendations.push('🏛️ Tax burden is high. Consult with a tax advisor about deductions, credits, or tax-efficient structures.');
    }
    
    if (debtToEquityRatio > 2) {
      recommendations.push('⚖️ Debt-to-equity ratio is high (>2). Consider reducing debt or increasing equity to balance your capital structure.');
    }
    
    if (netProfit < 0) {
      recommendations.push('🚨 You\'re operating at a loss. Urgent action needed: increase revenue, reduce expenses, or both.');
    }
    
    const topExpenses = financialData.expenses
      .filter(exp => parseFloat(exp.amount) > 0)
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      .slice(0, 3);
    
    if (topExpenses.length > 0) {
      const topExpense = topExpenses[0];
      const topExpensePercent = revenue > 0 ? ((parseFloat(topExpense.amount) / revenue) * 100) : 0;
      if (topExpensePercent > 30) {
        recommendations.push(`🎯 ${topExpense.name} represents ${topExpensePercent.toFixed(1)}% of revenue. This is your biggest cost driver - negotiate better rates or find alternatives.`);
      }
    }
    
    if (totalStakeholderPayments > profitAfterTax * 0.8) {
      recommendations.push('💸 Stakeholder payments (debt + equity) are consuming most of your after-tax profit. Ensure you\'re retaining enough for business growth.');
    }
    
    if (netProfitMargin > 20) {
      recommendations.push('🎉 Excellent profit margin! Consider reinvesting in growth or building cash reserves for opportunities.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Your financials look balanced. Keep monitoring regularly and maintain this healthy performance.');
    }
    
    return recommendations;
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Performance Pilot</h1>
          <p className="text-xl text-gray-600">
            Comprehensive financial analysis with intelligent insights
          </p>
        </div>
        
        {/* Input Form */}
        <Card className="p-8 mb-8 shadow-lg border-gray-200">
          <h2 className="text-2xl text-gray-900 mb-6">Enter Your Financial Data</h2>
          
          {/* Revenue */}
          <div className="mb-8">
            <Label htmlFor="revenue" className="text-lg mb-2 block">Total Revenue</Label>
            <div className="relative">
              <IndianRupeeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="revenue"
                type="number"
                placeholder="1000000"
                value={financialData.revenue}
                onChange={(e) => handleRevenueChange(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Expenses */}
          <div className="mb-8">
            <h3 className="text-lg text-gray-900 mb-4">Expenses</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {financialData.expenses.map((expense) => (
                <div key={expense.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Label htmlFor={`expense-name-${expense.id}`} className="text-sm mb-1 block">
                      Expense Name
                    </Label>
                    <Input
                      id={`expense-name-${expense.id}`}
                      type="text"
                      placeholder="Expense name"
                      value={expense.name}
                      onChange={(e) => handleExpenseChange(expense.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`expense-amount-${expense.id}`} className="text-sm mb-1 block">
                      Amount (₹)
                    </Label>
                    <Input
                      id={`expense-amount-${expense.id}`}
                      type="number"
                      placeholder="50000"
                      value={expense.amount}
                      onChange={(e) => handleExpenseChange(expense.id, 'amount', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveExpense(expense.id)}
                    className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add New Expense */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor="new-expense" className="text-sm mb-1 block">
                  Add Custom Expense
                </Label>
                <Input
                  id="new-expense"
                  type="text"
                  placeholder="e.g., Marketing, Insurance, Equipment..."
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleAddExpense}
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Stakeholder Payments */}
          <div className="mb-8">
            <h3 className="text-lg text-gray-900 mb-4">Stakeholder Payments</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="debt-payments">Debt Payments (Interest + Principal)</Label>
                <Input
                  id="debt-payments"
                  type="number"
                  placeholder="25000"
                  value={financialData.debtPayments}
                  onChange={(e) => setFinancialData(prev => ({ ...prev, debtPayments: e.target.value }))}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Payments to debt holders (loans, bonds, etc.)</p>
              </div>
              <div>
                <Label htmlFor="equity-payments">Equity Payments (Dividends)</Label>
                <Input
                  id="equity-payments"
                  type="number"
                  placeholder="15000"
                  value={financialData.equityPayments}
                  onChange={(e) => setFinancialData(prev => ({ ...prev, equityPayments: e.target.value }))}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Dividends paid to shareholders/equity holders</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Tax Rate */}
          <div className="mb-8">
            <Label htmlFor="tax-rate" className="text-lg mb-2 block">
              Tax Rate (%)
            </Label>
            <div className="relative max-w-xs">
              <Percent className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="tax-rate"
                type="number"
                placeholder="30"
                value={financialData.taxRate}
                onChange={(e) => setFinancialData(prev => ({ ...prev, taxRate: e.target.value }))}
                className="pr-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Applicable corporate/business tax rate</p>
          </div>
          
          <Button 
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-6"
          >
            <Activity className="w-5 h-5 mr-2" />
            Analyze My Finances
          </Button>
        </Card>
        
        {/* Results */}
        {showResults && (
          <div className="space-y-8">
            {/* Financial Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 shadow-lg border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm text-gray-600">Total Revenue</h3>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl text-gray-900 mb-1">{formatCurrency(revenue)}</div>
                <div className="text-xs text-gray-600">Gross income from operations</div>
              </Card>
              
              <Card className="p-6 shadow-lg border-gray-200 bg-gradient-to-br from-red-50 to-rose-50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm text-gray-600">Total Expenses</h3>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-2xl text-gray-900 mb-1">{formatCurrency(totalExpenses)}</div>
                <div className="text-xs text-gray-600">{formatPercent(expenseRatio)} of revenue</div>
              </Card>
              
              <Card className="p-6 shadow-lg border-gray-200 bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm text-gray-600">Taxes Paid</h3>
                  <IndianRupeeIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-2xl text-gray-900 mb-1">{formatCurrency(taxes)}</div>
                <div className="text-xs text-gray-600">At {formatPercent(taxRate)} tax rate</div>
              </Card>
              
              <Card className={`p-6 shadow-lg border-gray-200 ${netProfit >= 0 ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-red-50 to-pink-50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm text-gray-600">Net Profit</h3>
                  {netProfit >= 0 ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className={`text-2xl mb-1 ${netProfit >= 0 ? 'text-blue-900' : 'text-red-900'}`}>
                  {formatCurrency(netProfit)}
                </div>
                <div className="text-xs text-gray-600">{formatPercent(netProfitMargin)} margin</div>
              </Card>
            </div>
            
            {/* Detailed Breakdown */}
            <Card className="p-8 shadow-lg border-gray-200">
              <h2 className="text-2xl text-gray-900 mb-6">Financial Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-gray-700">Revenue</span>
                  <span className="text-xl text-green-700">{formatCurrency(revenue)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-gray-700">− Total Expenses</span>
                  <span className="text-xl text-red-700">− {formatCurrency(totalExpenses)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-gray-700">= Profit Before Tax</span>
                  <span className={`text-xl ${profitBeforeTax >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                    {formatCurrency(profitBeforeTax)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-gray-700">− Taxes ({formatPercent(taxRate)})</span>
                  <span className="text-xl text-orange-700">− {formatCurrency(taxes)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-gray-700">= Profit After Tax</span>
                  <span className={`text-xl ${profitAfterTax >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
                    {formatCurrency(profitAfterTax)}
                  </span>
                </div>
                
                {totalStakeholderPayments > 0 && (
                  <>
                    <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <span className="text-gray-700">− Debt Payments</span>
                      <span className="text-xl text-pink-700">− {formatCurrency(debtPayments)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="text-gray-700">− Equity Payments (Dividends)</span>
                      <span className="text-xl text-orange-700">− {formatCurrency(equityPayments)}</span>
                    </div>
                    
                    <Separator />
                  </>
                )}
                
                <div className={`flex justify-between items-center p-4 rounded-lg border-2 ${netProfit >= 0 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'}`}>
                  <span className="text-lg text-gray-900">= Net Profit</span>
                  <span className={`text-3xl ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCurrency(netProfit)}
                  </span>
                </div>
              </div>
            </Card>
            
            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Expense Breakdown Pie Chart */}
              <Card className="p-6 shadow-lg border-gray-200">
                <h3 className="text-xl text-gray-900 mb-6">Expense Breakdown</h3>
                {expenseBreakdown.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {expenseBreakdown.map((exp, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-gray-700">{exp.name}</span>
                          </div>
                          <span className="text-gray-900">{formatCurrency(exp.value)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-12">No expense data available</div>
                )}
              </Card>
              
              {/* Waterfall Chart */}
              <Card className="p-6 shadow-lg border-gray-200">
                <h3 className="text-xl text-gray-900 mb-6">Profit Waterfall</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={waterfallData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(Math.abs(value))}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {waterfallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            
            {/* Key Metrics */}
            <Card className="p-8 shadow-lg border-gray-200">
              <h2 className="text-2xl text-gray-900 mb-6">Key Performance Indicators</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Net Profit Margin</h4>
                    <profitMarginHealth.icon className={`w-5 h-5 ${profitMarginHealth.color}`} />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{formatPercent(netProfitMargin)}</div>
                  <Badge variant="outline" className={profitMarginHealth.color}>
                    {profitMarginHealth.status}
                  </Badge>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Gross Profit Margin</h4>
                    <Percent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{formatPercent(grossProfitMargin)}</div>
                  <div className="text-xs text-gray-600">Before tax impact</div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Expense Ratio</h4>
                    <expenseRatioHealth.icon className={`w-5 h-5 ${expenseRatioHealth.color}`} />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{formatPercent(expenseRatio)}</div>
                  <Badge variant="outline" className={expenseRatioHealth.color}>
                    {expenseRatioHealth.status}
                  </Badge>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Tax Burden</h4>
                    <IndianRupeeIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{formatPercent(taxBurden)}</div>
                  <div className="text-xs text-gray-600">Of profit before tax</div>
                </div>
                
                {totalStakeholderPayments > 0 && (
                  <>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-600">Debt-to-Equity Ratio</h4>
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-2xl text-gray-900 mb-1">
                        {debtToEquityRatio === Infinity ? 'N/A' : debtToEquityRatio.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">Capital structure health</div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-600">Stakeholder Payments</h4>
                        <IndianRupeeIcon className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="text-2xl text-gray-900 mb-1">{formatCurrency(totalStakeholderPayments)}</div>
                      <div className="text-xs text-gray-600">Debt + Equity payments</div>
                    </div>
                  </>
                )}
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-600">Return on Revenue</h4>
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">{formatPercent(returnOnRevenue)}</div>
                  <div className="text-xs text-gray-600">Net profit per revenue</div>
                </div>
              </div>
            </Card>
            
            {/* AI Insights */}
            <Card className="p-8 shadow-lg border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl text-gray-900 mb-2">AI-Powered Recommendations</h3>
                  <p className="text-gray-600">Based on your financial data, here's what we recommend:</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {getRecommendations().map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => toast.success('Detailed report download feature coming soon!')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Detailed Report
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
