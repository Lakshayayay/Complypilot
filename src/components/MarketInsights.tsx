import { useState } from 'react';
import { stateMarketData, metrics, getDemandColor, getMetricValue, StateMarketData } from '../data/marketData';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  BarChart3, 
  Building2,
  FileText,
  X,
  ChevronRight,
  Calendar,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import indiaMapImage from 'figma:asset/9095003e1e419e15904f037d5226bfbc40b1db10.png';

interface IndiaMapProps {
  selectedMetric: string;
  hoveredState: string | null;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
  searchQuery: string;
}

const IndiaMap = ({ selectedMetric, hoveredState, onStateHover, onStateClick, searchQuery }: IndiaMapProps) => {
  const shouldHighlight = (stateId: string) => {
    if (!searchQuery) return false;
    const state = stateMarketData[stateId];
    return state?.stateName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Define clickable regions as percentages of image dimensions - only for states with data
  // Coordinates are improved to better match actual state boundaries on the map
  const stateRegions = [
    { id: 'HP', x: 22, y: 15, w: 10, h: 8, label: 'Himachal Pradesh', zIndex: 1 },
    { id: 'PB', x: 18, y: 17, w: 8, h: 6, label: 'Punjab', zIndex: 1 },
    { id: 'UT', x: 30, y: 19, w: 8, h: 6, label: 'Uttarakhand', zIndex: 1 },
    { id: 'HR', x: 22, y: 23, w: 8, h: 7, label: 'Haryana', zIndex: 2 },
    { id: 'DL', x: 27, y: 24, w: 3, h: 3, label: 'Delhi', zIndex: 10 },
    { id: 'RJ', x: 12, y: 28, w: 18, h: 22, label: 'Rajasthan', zIndex: 1 },
    { id: 'UP', x: 30, y: 25, w: 18, h: 18, label: 'Uttar Pradesh', zIndex: 1 },
    { id: 'GJ', x: 5, y: 38, w: 15, h: 20, label: 'Gujarat', zIndex: 1 },
    { id: 'MP', x: 25, y: 40, w: 20, h: 18, label: 'Madhya Pradesh', zIndex: 1 },
    { id: 'BR', x: 48, y: 32, w: 12, h: 10, label: 'Bihar', zIndex: 2 },
    { id: 'JH', x: 48, y: 42, w: 10, h: 12, label: 'Jharkhand', zIndex: 2 },
    { id: 'WB', x: 58, y: 40, w: 10, h: 18, label: 'West Bengal', zIndex: 1 },
    { id: 'OR', x: 48, y: 54, w: 12, h: 14, label: 'Odisha', zIndex: 1 },
    { id: 'CG', x: 42, y: 52, w: 10, h: 12, label: 'Chhattisgarh', zIndex: 2 },
    { id: 'MH', x: 18, y: 56, w: 22, h: 18, label: 'Maharashtra', zIndex: 1 },
    { id: 'GA', x: 16, y: 68, w: 4, h: 4, label: 'Goa', zIndex: 10 },
    { id: 'TG', x: 35, y: 64, w: 10, h: 10, label: 'Telangana', zIndex: 2 },
    { id: 'AP', x: 40, y: 72, w: 12, h: 12, label: 'Andhra Pradesh', zIndex: 1 },
    { id: 'KA', x: 22, y: 72, w: 16, h: 16, label: 'Karnataka', zIndex: 1 },
    { id: 'TN', x: 32, y: 84, w: 16, h: 12, label: 'Tamil Nadu', zIndex: 1 },
    { id: 'KL', x: 18, y: 82, w: 10, h: 14, label: 'Kerala', zIndex: 1 },
    { id: 'AS', x: 68, y: 44, w: 14, h: 14, label: 'Assam', zIndex: 1 },
  ].filter(region => stateMarketData[region.id]); // Only include states that have data

  return (
    <div className="relative w-full" style={{ position: 'relative', minHeight: '500px' }}>
      {/* Base Map Image */}
      <img 
        src={indiaMapImage} 
        alt="India Map" 
        className="w-full h-auto object-contain"
        style={{ display: 'block', width: '100%' }}
        draggable={false}
      />
      
      {/* Interactive Overlay Regions - Only show states with real data */}
      {stateRegions.map((region) => {
        const stateData = stateMarketData[region.id];
        if (!stateData) return null; // Skip states without data
        
        const isHovered = hoveredState === region.id;
        const isHighlighted = shouldHighlight(region.id);
        
        return (
          <div
            key={region.id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              isHovered 
                ? 'bg-teal-500/20 ring-2 ring-teal-400' 
                : isHighlighted
                ? 'bg-yellow-400/30 ring-2 ring-yellow-500 animate-pulse'
                : 'bg-transparent hover:bg-teal-500/10'
            }`}
            style={{
              position: 'absolute',
              left: `${region.x}%`,
              top: `${region.y}%`,
              width: `${region.w}%`,
              height: `${region.h}%`,
              zIndex: region.zIndex || 1,
              pointerEvents: 'auto',
              touchAction: 'none',
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              if (stateData) {
                onStateHover(region.id);
              }
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              onStateHover(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (stateData) {
                onStateClick(region.id);
              }
            }}
            title={`${stateData.stateName} - Click for details`}
          />
        );
      })}
      
      {/* State Tooltip - Only show if state has real data */}
      {hoveredState && stateMarketData[hoveredState] && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/95 dark:bg-slate-800/95 text-white px-4 py-2 rounded-lg shadow-xl border border-teal-500 z-50 pointer-events-none">
          <div className="text-sm">
            <div className="font-semibold">{stateMarketData[hoveredState].stateName}</div>
            <div className="text-teal-300">
              {selectedMetric === 'demand' && `Demand: ${stateMarketData[hoveredState].demandIndex}/100`}
              {selectedMetric === 'growth' && `Growth: ${stateMarketData[hoveredState].growthRate}%`}
              {selectedMetric === 'revenue' && `Revenue: ${stateMarketData[hoveredState].marketSize}`}
            </div>
            <div className="text-xs text-slate-400 mt-1">Click for detailed insights</div>
          </div>
        </div>
      )}
    </div>
  );
};



export default function MarketInsights({ onNavigateToCompliance }: { onNavigateToCompliance: () => void }) {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('demand');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<StateMarketData | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<null | {
    product: string;
    category?: string;
    summary?: {
      demandIndex?: number;
      marketSizeCr?: number;
      growthRatePct?: number;
      revenuePotentialCr?: number;
      complianceComplexity?: string;
      insights?: string[];
    };
  }>(null);

  const handleStateClick = (stateId: string) => {
    const state = stateMarketData[stateId];
    if (state) {
      setSelectedState(state);
      setShowDetailPopup(true);
    }
  };

  const handleSearch = async () => {
    if (!selectedProduct.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    setAiSummary(null);
    setError(null);

    try {
      const res = await fetch(`/api/market/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct, category: selectedCategory || undefined }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        const errorMsg = data.error || data.details || `Request failed with status ${res.status}`;
        setError(errorMsg);
        console.error('API Error:', data);
        return;
      }
      
      setAiSummary(data);
      setError(null);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to connect to backend. Make sure the backend server is running on port 5000.';
      setError(errorMsg);
      console.error('Analyze error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getMetricLabel = (metric: string) => {
    const found = metrics.find(m => m.value === metric);
    return found?.label || 'Demand Index';
  };

  const getDemandLabel = (index: number) => {
    if (index >= 85) return 'Very High';
    if (index >= 70) return 'High';
    if (index >= 55) return 'Moderate';
    if (index >= 40) return 'Low';
    return 'Very Low';
  };

  // Calculate stats for current view
  const currentStateData = hoveredState ? stateMarketData[hoveredState] : null;
  
  // Calculate aggregate stats when no state is hovered
  const allStatesData = Object.values(stateMarketData);
  const avgDemand = Math.round(allStatesData.reduce((sum, s) => sum + s.demandIndex, 0) / allStatesData.length);
  const avgGrowth = Math.round(allStatesData.reduce((sum, s) => sum + s.growthRate, 0) / allStatesData.length);
  const totalMarketSize = allStatesData.reduce((sum, s) => sum + parseFloat(s.marketSize.replace('₹', '').replace(' Cr', '')), 0);
  const topState = allStatesData.reduce((prev, curr) => (curr.demandIndex > prev.demandIndex ? curr : prev));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-teal-600 dark:text-teal-400 mb-2">{t('market.title')}</h1>
          <p className="text-muted-foreground">{t('market.subtitle')}</p>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6 bg-card border-border">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Product Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{t('market.selectProduct')}</label>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-background border-border"
                />
              </div>

              {/* Category Input */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                <Input
                  type="text"
                  placeholder="Enter category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-background border-border"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={!selectedProduct.trim()}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards - Updated dynamically on hover */}
        {hasSearched && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Current View Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">Current View</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentStateData ? currentStateData.stateName : 'All India Overview'}
                </div>
              </CardContent>
            </Card>

            {/* Demand Index Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">Demand Index</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-foreground">
                    {currentStateData ? currentStateData.demandIndex : (aiSummary?.summary?.demandIndex ?? avgDemand)}/100
                  </div>
                  <Badge className={`
                    ${(currentStateData ? currentStateData.demandIndex : (aiSummary?.summary?.demandIndex ?? avgDemand)) >= 85 ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                      (currentStateData ? currentStateData.demandIndex : (aiSummary?.summary?.demandIndex ?? avgDemand)) >= 70 ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                      'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'}
                  `}>
                    {getDemandLabel(currentStateData ? currentStateData.demandIndex : (aiSummary?.summary?.demandIndex ?? avgDemand))}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Growth Rate Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">Growth Rate</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ↑ {currentStateData ? currentStateData.growthRate : (aiSummary?.summary?.growthRatePct ?? avgGrowth)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">YoY</div>
              </CardContent>
            </Card>

            {/* Market Size Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">Market Size</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentStateData ? currentStateData.marketSize : `₹${(aiSummary?.summary?.marketSizeCr ?? totalMarketSize).toFixed(1)} Cr`}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Complexity Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">Compliance Complexity</span>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {currentStateData ? currentStateData.complianceComplexity : (aiSummary?.summary?.complianceComplexity ?? 'Mixed')}
                </div>
              </CardContent>
            </Card>

            {/* Top City/State Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold">
                    {currentStateData ? 'Top City' : 'Top State'}
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {currentStateData ? currentStateData.topCities[0] : topState.stateName}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Card className="bg-card border-border border-red-500/50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                <FileText className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Error: {error}</p>
                  {error.includes('OPENAI_API_KEY') && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Please add your OpenAI API key to backend/.env file
                    </p>
                  )}
                  {error.includes('connect') && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Make sure the backend server is running on http://localhost:5000
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading Screen */}
        {isLoading && (
          <Card className="bg-card border-border">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-semibold text-foreground">{t('market.loadingData')}</p>
                <p className="text-sm text-muted-foreground">Analyzing market data for {selectedProduct}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prompt Screen Before Search */}
        {!hasSearched && !isLoading && (
          <Card className="bg-card border-border">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <MapPin className="w-20 h-20 text-teal-600 dark:text-teal-400 opacity-50" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Explore Market Insights?</h3>
                  <p className="text-muted-foreground">Type a product name above and press <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm">Enter</kbd> to view detailed market data</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Real-time Data</Badge>
                  <Badge variant="outline">State-wise Analysis</Badge>
                  <Badge variant="outline">Multiple Metrics</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map Section - Show after search */}
        {hasSearched && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border h-full">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center justify-between">
                    <span>{t('market.indiaMap')} - {selectedProduct}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative w-full" style={{ position: 'relative', aspectRatio: '16/10', minHeight: '500px' }}>
                    <IndiaMap
                      selectedMetric={selectedMetric}
                      hoveredState={hoveredState}
                      onStateHover={setHoveredState}
                      onStateClick={handleStateClick}
                      searchQuery={searchQuery}
                    />

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-slate-900/90 dark:bg-slate-800/90 rounded-lg p-4 backdrop-blur-sm border border-border">
                    <div className="text-sm text-slate-200 mb-2">{getMetricLabel(selectedMetric)}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 rounded" style={{ backgroundColor: '#065F46' }} />
                        <span className="text-xs text-slate-200">{t('market.legend.veryHigh')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 rounded" style={{ backgroundColor: '#059669' }} />
                        <span className="text-xs text-slate-200">{t('market.legend.high')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 rounded" style={{ backgroundColor: '#34D399' }} />
                        <span className="text-xs text-slate-200">{t('market.legend.moderate')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 rounded" style={{ backgroundColor: '#6EE7B7' }} />
                        <span className="text-xs text-slate-200">{t('market.legend.low')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 rounded" style={{ backgroundColor: '#A7F3D0' }} />
                        <span className="text-xs text-slate-200">{t('market.legend.veryLow')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Tooltip - Hidden since it's now part of the map component */}
                  {false && hoveredState && stateMarketData[hoveredState] && (
                    <div className="absolute top-4 left-4 bg-slate-900/95 rounded-lg p-4 backdrop-blur-sm border border-teal-500/30 shadow-xl max-w-xs">
                      <div className="text-teal-400 mb-1">{stateMarketData[hoveredState].stateName}</div>
                      <div className="text-white text-sm">
                        {getMetricLabel(selectedMetric)}: <span className="text-teal-300">{getMetricValue(stateMarketData[hoveredState], selectedMetric).toFixed(1)}</span>
                      </div>
                      <div className="text-slate-300 text-xs mt-1">Click for detailed insights</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-6">
              <CardHeader>
                <CardTitle className="text-foreground">{t('market.quickStats')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hoveredState && stateMarketData[hoveredState] ? (
                  <>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-muted-foreground text-sm">{t('market.state')}</span>
                      </div>
                      <div className="text-foreground">{stateMarketData[hoveredState].stateName}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-muted-foreground text-sm">{t('market.demandIndex')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-foreground text-2xl">{stateMarketData[hoveredState].demandIndex}</div>
                        <Badge variant="outline" className={`${
                          stateMarketData[hoveredState].demandIndex >= 85 ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                          stateMarketData[hoveredState].demandIndex >= 70 ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                          'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {getDemandLabel(stateMarketData[hoveredState].demandIndex)}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-muted-foreground text-sm">{t('market.marketSize')}</span>
                      </div>
                      <div className="text-foreground">{stateMarketData[hoveredState].marketSize}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-muted-foreground text-sm">{t('market.growthRate')}</span>
                      </div>
                      <div className="text-foreground">↑ {stateMarketData[hoveredState].growthRate}% {t('market.yoy')}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-muted-foreground text-sm">{t('market.topCities')}</span>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {stateMarketData[hoveredState].topCities.join(', ')}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={() => handleStateClick(hoveredState)}
                    >
                      {t('market.viewDetails')} <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{t('market.hoverPrompt')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {/* Data Source Footer */}
        {hasSearched && !isLoading && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-border">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {t('market.dataSource')}
            </span>
          </div>
        </div>
        )}
      </div>

      {/* Detailed Popup */}
      {showDetailPopup && selectedState && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-white text-2xl mb-1">{t('market.marketOverview')} - {selectedState.stateName}</h2>
                <p className="text-teal-100 text-sm">{t('market.detailedInsights')} {selectedProduct}</p>
              </div>
              <button
                onClick={() => setShowDetailPopup(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="text-muted-foreground text-sm mb-1">{t('market.demandIndex')}</div>
                  <div className="text-foreground text-2xl">{selectedState.demandIndex}/100</div>
                  <Badge className="mt-2 bg-green-500/20 text-green-600 dark:text-green-400">
                    {getDemandLabel(selectedState.demandIndex)}
                  </Badge>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="text-muted-foreground text-sm mb-1">{t('market.marketSize')}</div>
                  <div className="text-foreground text-2xl">{selectedState.marketSize}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="text-muted-foreground text-sm mb-1">{t('market.growthRate')}</div>
                  <div className="text-foreground text-2xl">↑ {selectedState.growthRate}%</div>
                  <div className="text-teal-600 dark:text-teal-400 text-xs mt-1">{t('market.yoy')}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="text-muted-foreground text-sm mb-1">{t('market.compliance')}</div>
                  <div className="text-foreground text-xl">{selectedState.complianceComplexity}</div>
                  <div className="text-muted-foreground text-xs mt-1">{t('market.complexityScore')}</div>
                </div>
              </div>

              {/* Trend Chart */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h3 className="text-foreground mb-4">{t('market.trendChart')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={selectedState.monthlyTrend}>
                    <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
                    <YAxis stroke="currentColor" className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="demand" radius={[8, 8, 0, 0]}>
                      {selectedState.monthlyTrend.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getDemandColor(entry.demand)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Cities */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h3 className="text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  {t('market.topCities')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedState.topCities.map((city, index) => (
                    <Badge key={city} variant="outline" className="bg-teal-500/20 text-teal-600 dark:text-teal-400">
                      {index + 1}. {city}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    setShowDetailPopup(false);
                    onNavigateToCompliance();
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t('market.viewCompliance')}
                </Button>
                <Button variant="outline" className="border-border">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {t('market.compareStates')}
                </Button>
                <Button variant="outline" className="border-border">
                  <Download className="w-4 h-4 mr-2" />
                  {t('market.downloadReport')}
                </Button>
              </div>

              {/* Last Updated */}
              <div className="text-muted-foreground text-sm text-center pt-4 border-t border-border">
                {t('market.lastUpdated')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
