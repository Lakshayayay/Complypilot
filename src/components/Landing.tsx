import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { CheckCircle2, Shield, TrendingUp, Zap } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span>Your AI-Powered Business Co-Pilot</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl text-gray-900 mb-6 max-w-4xl mx-auto">
            Your Business.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Compliant. Confident. Clear.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Navigate legal compliance and track financial performance with ease. 
            ComplyPilot helps entrepreneurs focus on growth, not paperwork.
          </p>
          
          <Button 
            onClick={() => navigate('/comply')}
            className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start My Journey →
          </Button>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-teal-600" />
            </div>
            <h3 className="text-2xl text-gray-900 mb-3">Comply Navigator</h3>
            <p className="text-gray-600 mb-4">
              Get personalized legal checklists based on your state and business type. 
              Never miss a compliance deadline again.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>State-specific requirements</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>Business type customization</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span>Progress tracking with reminders</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl text-gray-900 mb-3">Performance Pilot</h3>
            <p className="text-gray-600 mb-4">
              Compare budget vs. actuals with visual insights. Make data-driven 
              decisions to optimize your business performance.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Variance analysis dashboard</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Interactive charts & graphs</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>AI-powered insights</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl text-teal-600 mb-2">50+</div>
            <div className="text-gray-600">Compliance Tasks</div>
          </div>
          <div>
            <div className="text-4xl text-teal-600 mb-2">3</div>
            <div className="text-gray-600">States Covered</div>
          </div>
          <div>
            <div className="text-4xl text-teal-600 mb-2">100%</div>
            <div className="text-gray-600">Peace of Mind</div>
          </div>
        </div>
      </div>
    </div>
  );
}
