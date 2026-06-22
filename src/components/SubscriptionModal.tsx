import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Crown, Users, TrendingUp, Shield, Clock, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

const POPUP_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export function SubscriptionModal() {
  const [showModal, setShowModal] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [step, setStep] = useState<'offer' | 'contact'>('offer');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Show first popup after 5 minutes
    const initialTimer = setTimeout(() => {
      setShowModal(true);
      setHasShownInitial(true);
    }, POPUP_INTERVAL);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    // After initial show, keep showing every 5 minutes
    if (!hasShownInitial) return;

    const recurringTimer = setInterval(() => {
      setShowModal(true);
    }, POPUP_INTERVAL);

    return () => clearInterval(recurringTimer);
  }, [hasShownInitial]);

  const handleClose = () => {
    setShowModal(false);
    setStep('offer');
    setEmail('');
    setWhatsappNumber('');
  };

  const handleGetStarted = () => {
    setStep('contact');
  };

  const handleSubmitContact = async () => {
    if (!email || !whatsappNumber) {
      toast.error('Please fill in both email and WhatsApp number');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate WhatsApp number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(whatsappNumber)) {
      toast.error('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store contact info in localStorage
    const contactInfo = {
      email,
      whatsappNumber,
      timestamp: new Date().toISOString(),
      subscriptionInterest: true
    };
    localStorage.setItem('complypilot_subscription_contact', JSON.stringify(contactInfo));

    setIsSubmitting(false);
    
    toast.success('Success! 🎉', {
      description: `We'll send reminders to ${email} and WhatsApp +91 ${whatsappNumber}. Our CA team will contact you within 24 hours!`,
      duration: 6000,
    });

    setShowModal(false);
    setStep('offer');
    setEmail('');
    setWhatsappNumber('');
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 text-white p-8 pb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-white text-orange-600 hover:bg-white/90">
                Limited Time Offer
              </Badge>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-3xl text-white mb-2">
                {step === 'offer' ? 'Need More Financial Assistance?' : 'Get Started with Premium'}
              </DialogTitle>
              <DialogDescription className="text-white/90 text-lg">
                {step === 'offer' 
                  ? 'Upgrade to our Premium Plan and get connected with expert Chartered Accountants'
                  : 'Enter your details to receive reminders via Email & WhatsApp'
                }
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 pt-6">
          {step === 'offer' ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  What You'll Get with Premium
                </h3>
                
                <div className="grid gap-3 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">Direct CA Connection</p>
                      <p className="text-sm text-gray-600">Get matched with experienced Chartered Accountants who understand your business</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">Personalized Financial Advice</p>
                      <p className="text-sm text-gray-600">One-on-one consultations for tax planning, budgeting, and financial strategy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">Priority Compliance Support</p>
                      <p className="text-sm text-gray-600">Fast-track your filings and stay ahead of deadlines with expert guidance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-orange-50">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">Advanced Analytics & Reports</p>
                      <p className="text-sm text-gray-600">Deep financial insights, forecasting, and custom reports for your business</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-teal-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl text-gray-900">Premium Plan</h4>
                    <p className="text-sm text-gray-600">Everything you need to stay compliant and financially healthy</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl text-gray-900">₹2,999</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-xs text-teal-600">Save 20% with annual billing</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <Users className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Dedicated CA</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Full Compliance</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">24/7 Support</p>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleGetStarted}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white h-12"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-6 h-12"
                >
                  Maybe Later
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                🎉 Join 5,000+ businesses already using ComplyPilot Premium
              </p>
            </>
          ) : (
            <>
              {/* Contact Form */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-6 border border-teal-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="text-gray-900">Get reminders on Email & WhatsApp</p>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll send you timely reminders about compliance deadlines, financial insights, and exclusive premium offers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* WhatsApp Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      WhatsApp Number
                    </Label>
                    <div className="flex gap-2">
                      <div className="flex items-center bg-gray-100 px-3 rounded-md border border-gray-200">
                        <span className="text-gray-700">+91</span>
                      </div>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="9876543210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="h-11 flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Enter 10-digit mobile number</p>
                  </div>
                </div>
              </div>

              {/* Privacy Note */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                <p className="text-sm text-gray-700">
                  🔒 Your information is secure. We'll only use it to send you compliance reminders and connect you with our CA team.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitContact}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white h-12"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Enable Reminders
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setStep('offer')}
                  variant="outline"
                  className="px-6 h-12"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
