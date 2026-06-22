import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowRight, CheckCircle2, Sparkles, Calendar as CalendarIcon, Clock, Bell, Mail, Repeat, CheckSquare, FileText, Zap, Droplet, Receipt, Building2, Star, Phone, Globe, Users, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { complianceData } from '../data/complianceData';
import { deadlinesData, ComplianceDeadline } from '../data/deadlinesData';
import { getProvidersByState } from '../data/marketplaceData';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import { sendEmailNotification } from "../components/notifications"; // ⬅️ add this line


type State = 'Andhra Pradesh' | 'Assam' | 'Bihar' | 'Chhattisgarh' | 'Delhi' | 'Goa' | 'Gujarat' | 
  'Haryana' | 'Himachal Pradesh' | 'Jharkhand' | 'Karnataka' | 'Kerala' | 'Madhya Pradesh' | 
  'Maharashtra' | 'Odisha' | 'Punjab' | 'Rajasthan' | 'Tamil Nadu' | 'Telangana' | 
  'Uttar Pradesh' | 'Uttarakhand' | 'West Bengal';
type BusinessType = 'Pvt Ltd' | 'LLP' | 'Sole Proprietorship';

export function ComplyNavigator() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<State | ''>('');
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | ''>('');
  const [checklist, setChecklist] = useState<string[]>([]);
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
  const [showChecklist, setShowChecklist] = useState(false);
  const [allDeadlines, setAllDeadlines] = useState<ComplianceDeadline[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [notificationsSent, setNotificationsSent] = useState<Set<string>>(new Set());
  const [setupComplete, setSetupComplete] = useState(false);
  
  // Load saved progress from localStorage
  useEffect(() => {
    if (selectedState && selectedBusinessType) {
      const storageKey = `complypilot_progress_${selectedState}_${selectedBusinessType}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { completedItems: savedCompleted, setupComplete: savedSetupComplete } = JSON.parse(saved);
        setCompletedItems(new Set(savedCompleted));
        setSetupComplete(savedSetupComplete);
      }
    }
  }, [selectedState, selectedBusinessType]);
  
  // Save progress to localStorage
  useEffect(() => {
    if (selectedState && selectedBusinessType && showChecklist) {
      const storageKey = `complypilot_progress_${selectedState}_${selectedBusinessType}`;
      localStorage.setItem(storageKey, JSON.stringify({
        completedItems: Array.from(completedItems),
        setupComplete
      }));
    }
  }, [completedItems, setupComplete, selectedState, selectedBusinessType, showChecklist]);
  
  // Get active deadlines based on setup status
  const getActiveDeadlines = (): ComplianceDeadline[] => {
    if (!setupComplete) {
      // Show only setup (one-time) tasks
      return allDeadlines.filter(d => d.recurring === 'once');
    } else {
      // Show only recurring tasks after setup is complete
      return allDeadlines.filter(d => d.recurring !== 'once');
    }
  };
  
  const activeDeadlines = getActiveDeadlines();
  
  // Check for upcoming deadlines and send notifications
  useEffect(() => { 
    if (activeDeadlines.length > 0) {
      const userEmail = JSON.parse(localStorage.getItem('complypilot_current_user') || '{}').email;
      
      activeDeadlines.forEach((deadline) => {
        const daysUntil = getDaysUntilDeadline(deadline.deadline);
        const notificationKey = `${deadline.task}-${deadline.deadline.toISOString()}`;
        
        // Send notification if deadline is within 7 days and not already sent
        if (daysUntil <= 7 && daysUntil >= 0 && !notificationsSent.has(notificationKey)) {
          // Simulate email notification
          (async () => {
            try {
              await sendEmailNotification(
                userEmail,
                `Reminder: ${deadline.task} due soon`,
                `Your compliance task "${deadline.task}" is due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}. Please complete it before ${deadline.deadline.toDateString()}.`
              );
          
              toast.success(
                <div>
                  <p className="font-semibold">📧 Email sent to {userEmail}</p>
                  <p className="text-sm mt-1">Task: {deadline.task}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Due in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                  </p>
                </div>,
                { duration: 5000 }
              );
          
              setNotificationsSent(prev => new Set(prev).add(notificationKey));
            } catch (err) {
              console.error("Email send failed:", err);
              toast.error("❌ Failed to send reminder email");
            }
          })();   
          
        }
      });
    }
  }, [activeDeadlines]);
  
  const handleGenerate = () => {
    if (selectedState && selectedBusinessType) {
      const items = complianceData[selectedState][selectedBusinessType];
      const taskDeadlines = deadlinesData[selectedState][selectedBusinessType];
      
      setChecklist(items);
      setAllDeadlines(taskDeadlines);
      setShowChecklist(true);
      
      // Check for urgent deadlines immediately (only active ones)
      const setupDeadlines = taskDeadlines.filter(d => d.recurring === 'once');
      const urgentCount = setupDeadlines.filter(d => {
        const days = getDaysUntilDeadline(d.deadline);
        return days >= 0 && days <= 3;
      }).length;
      
      if (urgentCount > 0 && !setupComplete) {
        toast.error(`⚠️ You have ${urgentCount} urgent setup deadline${urgentCount !== 1 ? 's' : ''} within 3 days!`);
      }
    }
  };
  
  const toggleItem = (index: number) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedItems(newCompleted);
    
    // Check if all setup items are completed
    const setupTasksCount = allDeadlines.filter(d => d.recurring === 'once').length;
    const setupTasksCompleted = Array.from(newCompleted).filter(idx => {
      const task = checklist[idx];
      const deadline = allDeadlines.find(d => d.task === task);
      return deadline && deadline.recurring === 'once';
    }).length;
    
    if (setupTasksCompleted === setupTasksCount && setupTasksCount > 0 && !setupComplete) {
      setSetupComplete(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#0ea5e9', '#22c55e']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#14b8a6', '#0ea5e9', '#22c55e']
        });
      }, 250);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#14b8a6', '#0ea5e9', '#22c55e']
        });
      }, 400);
      
      toast.success(
        <div>
          <p className="font-semibold">🎉 Setup Complete!</p>
          <p className="text-sm mt-1">Now showing your ongoing compliance deadlines</p>
        </div>,
        { duration: 6000 }
      );
    }
    
    // Check if all items are completed (setup + recurring)
    if (newCompleted.size === checklist.length) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#0ea5e9', '#22c55e', '#f59e0b']
      });
    }
  };
  
  const getDaysUntilDeadline = (deadline: Date): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const getUrgencyColor = (deadline: Date): string => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return 'text-gray-400'; // Passed
    if (days <= 3) return 'text-red-600'; // Urgent (Red)
    if (days <= 14) return 'text-yellow-600'; // Warning (Yellow)
    return 'text-green-600'; // Good (Green)
  };
  
  const getUrgencyBadge = (deadline: Date): { variant: any; label: string } => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return { variant: 'secondary', label: 'Passed' };
    if (days <= 3) return { variant: 'destructive', label: 'Urgent' };
    if (days <= 14) return { variant: 'default', label: 'Soon' };
    return { variant: 'secondary', label: 'On Track' };
  };
  
  const getTaskIcon = (taskName: string) => {
    if (taskName.includes('GSTR') || taskName.includes('GST')) {
      return <FileText className="w-4 h-4 text-blue-600" />;
    }
    if (taskName.includes('ITR') || taskName.includes('tax')) {
      return <Receipt className="w-4 h-4 text-purple-600" />;
    }
    if (taskName.includes('Electricity')) {
      return <Zap className="w-4 h-4 text-yellow-600" />;
    }
    if (taskName.includes('Water')) {
      return <Droplet className="w-4 h-4 text-blue-500" />;
    }
    if (taskName.includes('quarterly') || taskName.includes('annual') || taskName.includes('monthly')) {
      return <Repeat className="w-4 h-4 text-teal-600" />;
    }
    return <CheckSquare className="w-4 h-4 text-gray-600" />;
  };
  
  const getTaskCategory = (taskName: string): string => {
    if (taskName.includes('GSTR') || taskName.includes('GST')) return 'GST Filing';
    if (taskName.includes('ITR') || taskName.includes('tax')) return 'Tax Filing';
    if (taskName.includes('Electricity') || taskName.includes('Water')) return 'Utility Bills';
    return 'Compliance';
  };
  
  const getDeadlinesForDate = (date: Date): ComplianceDeadline[] => {
    return activeDeadlines.filter(d => {
      const deadlineDate = new Date(d.deadline);
      return (
        deadlineDate.getDate() === date.getDate() &&
        deadlineDate.getMonth() === date.getMonth() &&
        deadlineDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const hasDeadlineOnDate = (date: Date): boolean => {
    return getDeadlinesForDate(date).length > 0;
  };
  
  const setupTasksCount = allDeadlines.filter(d => d.recurring === 'once').length;
  const setupTasksCompleted = Array.from(completedItems).filter(idx => {
    const task = checklist[idx];
    const deadline = allDeadlines.find(d => d.task === task);
    return deadline && deadline.recurring === 'once';
  }).length;
  
  const recurringTasksCount = allDeadlines.filter(d => d.recurring !== 'once').length;
  const recurringTasksCompleted = Array.from(completedItems).filter(idx => {
    const task = checklist[idx];
    const deadline = allDeadlines.find(d => d.task === task);
    return deadline && deadline.recurring !== 'once';
  }).length;
  
  const currentProgress = setupComplete 
    ? (recurringTasksCompleted / recurringTasksCount) * 100 
    : (setupTasksCompleted / setupTasksCount) * 100;
  
  const isAllComplete = completedItems.size === checklist.length;
  
  const selectedDateDeadlines = selectedDate ? getDeadlinesForDate(selectedDate) : [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Comply Navigator</h1>
          <p className="text-xl text-gray-600">
            Get your personalized legal compliance checklist with deadline tracking
          </p>
        </div>
        
        {/* Form */}
        <Card className="p-8 mb-8 shadow-lg border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="state" className="mb-2 block">Select Your State</Label>
              <Select value={selectedState} onValueChange={(value) => setSelectedState(value as State)}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Choose state..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Assam">Assam</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="business-type" className="mb-2 block">Select Business Type</Label>
              <Select value={selectedBusinessType} onValueChange={(value) => setSelectedBusinessType(value as BusinessType)}>
                <SelectTrigger id="business-type">
                  <SelectValue placeholder="Choose business type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pvt Ltd">Private Limited (Pvt Ltd)</SelectItem>
                  <SelectItem value="LLP">Limited Liability Partnership (LLP)</SelectItem>
                  <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={!selectedState || !selectedBusinessType}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-6"
          >
            Generate My Checklist & Deadlines
          </Button>
        </Card>
        
        {/* Status Banner */}
        {showChecklist && (
          <Card className="p-6 mb-8 shadow-lg border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {!setupComplete ? (
                  <>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <CheckSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900">Setup Phase</h3>
                      <p className="text-sm text-gray-600">
                        Complete {setupTasksCount} initial setup tasks to unlock ongoing compliance tracking
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Repeat className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900">Ongoing Compliance</h3>
                      <p className="text-sm text-gray-600">
                        Tracking {recurringTasksCount} recurring deadlines (monthly, quarterly, annually)
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl text-gray-900">
                  {setupComplete ? `${recurringTasksCompleted}/${recurringTasksCount}` : `${setupTasksCompleted}/${setupTasksCount}`}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Checklist and Calendar */}
        {showChecklist && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Checklist with Tabs */}
            <Card className="p-8 shadow-lg border-gray-200">
              <Tabs defaultValue={setupComplete ? "recurring" : "setup"} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="setup" className="relative">
                    Setup Tasks
                    {setupComplete && (
                      <CheckCircle2 className="w-4 h-4 ml-1 text-green-600" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="recurring" disabled={!setupComplete}>
                    Recurring Tasks
                    {!setupComplete && (
                      <span className="ml-1 text-xs">(Locked)</span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                {/* Setup Tasks Tab */}
                <TabsContent value="setup" className="mt-0">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-2xl text-gray-900">Initial Setup</h2>
                      <span className="text-gray-600">
                        {setupTasksCompleted} / {setupTasksCount}
                      </span>
                    </div>
                    <Progress value={(setupTasksCompleted / setupTasksCount) * 100} className="h-3" />
                  </div>
                  
                  {setupComplete && (
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-200 rounded-xl p-6 mb-6 flex items-center gap-4">
                      <CheckCircle2 className="w-12 h-12 text-teal-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">Setup Complete! 🎉</h3>
                        <p className="text-gray-600">
                          All initial tasks done. Check the "Recurring Tasks" tab for ongoing compliance.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {checklist.map((item, index) => {
                      const deadline = allDeadlines.find(d => d.task === item);
                      if (!deadline || deadline.recurring !== 'once') return null;
                      
                      const daysUntil = getDaysUntilDeadline(deadline.deadline);
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                            completedItems.has(index)
                              ? 'bg-teal-50 border-teal-200'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Checkbox
                            id={`item-${index}`}
                            checked={completedItems.has(index)}
                            onCheckedChange={() => toggleItem(index)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`item-${index}`}
                              className={`cursor-pointer block mb-1 ${
                                completedItems.has(index) ? 'line-through text-gray-500' : 'text-gray-900'
                              }`}
                            >
                              {item}
                            </Label>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className={`w-4 h-4 ${getUrgencyColor(deadline.deadline)}`} />
                              <span className={`text-sm ${getUrgencyColor(deadline.deadline)}`}>
                                {daysUntil >= 0
                                  ? `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                                  : 'Deadline passed'}
                              </span>
                              <Badge {...getUrgencyBadge(deadline.deadline)}>
                                {getUrgencyBadge(deadline.deadline).label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Recurring Tasks Tab */}
                <TabsContent value="recurring" className="mt-0">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-2xl text-gray-900">Ongoing Compliance</h2>
                      <span className="text-gray-600">
                        {recurringTasksCompleted} / {recurringTasksCount}
                      </span>
                    </div>
                    <Progress value={(recurringTasksCompleted / recurringTasksCount) * 100} className="h-3" />
                    
                    {/* Task Categories Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700">GST Filing</span>
                        </div>
                        <p className="text-sm text-blue-900">Quarterly</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Receipt className="w-4 h-4 text-purple-600" />
                          <span className="text-xs text-purple-700">Tax Filing</span>
                        </div>
                        <p className="text-sm text-purple-900">Quarterly/Annual</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-yellow-600" />
                          <span className="text-xs text-yellow-700">Electricity</span>
                        </div>
                        <p className="text-sm text-yellow-900">Monthly</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplet className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-blue-700">Water Bill</span>
                        </div>
                        <p className="text-sm text-blue-900">Monthly</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {checklist.map((item, index) => {
                      const deadline = allDeadlines.find(d => d.task === item);
                      if (!deadline || deadline.recurring === 'once') return null;
                      
                      const daysUntil = getDaysUntilDeadline(deadline.deadline);
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                            completedItems.has(index)
                              ? 'bg-teal-50 border-teal-200'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Checkbox
                            id={`item-${index}`}
                            checked={completedItems.has(index)}
                            onCheckedChange={() => toggleItem(index)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-1">
                              {getTaskIcon(item)}
                              <Label
                                htmlFor={`item-${index}`}
                                className={`cursor-pointer flex-1 ${
                                  completedItems.has(index) ? 'line-through text-gray-500' : 'text-gray-900'
                                }`}
                              >
                                {item}
                              </Label>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                {getTaskCategory(item)}
                              </Badge>
                              <Clock className={`w-4 h-4 ${getUrgencyColor(deadline.deadline)}`} />
                              <span className={`text-sm ${getUrgencyColor(deadline.deadline)}`}>
                                {daysUntil >= 0
                                  ? `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                                  : 'Deadline passed'}
                              </span>
                              <Badge {...getUrgencyBadge(deadline.deadline)}>
                                {getUrgencyBadge(deadline.deadline).label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {deadline.recurring}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">{deadline.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
              
              {isAllComplete && (
                <Button 
                  onClick={() => navigate('/performance')}
                  className="w-full mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-6"
                >
                  Go to Performance Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </Card>
            
            {/* Calendar */}
            <Card className="p-8 shadow-lg border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-900 mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-teal-600" />
                  {setupComplete ? 'Recurring Deadlines Calendar' : 'Setup Deadlines Calendar'}
                </h2>
                <p className="text-sm text-gray-600">
                  {setupComplete 
                    ? 'Track your monthly, quarterly, and annual compliance deadlines'
                    : 'Complete setup tasks to unlock recurring deadline tracking'}
                </p>
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Urgent (≤3 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span className="text-sm text-gray-700">Soon (≤14 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">On Track ({'>'}14 days)</span>
                </div>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
                modifiers={{
                  urgent: (date) => {
                    const deadlinesOnDate = getDeadlinesForDate(date);
                    if (deadlinesOnDate.length === 0) return false;
                    const days = getDaysUntilDeadline(deadlinesOnDate[0].deadline);
                    return days >= 0 && days <= 3;
                  },
                  soon: (date) => {
                    const deadlinesOnDate = getDeadlinesForDate(date);
                    if (deadlinesOnDate.length === 0) return false;
                    const days = getDaysUntilDeadline(deadlinesOnDate[0].deadline);
                    return days > 3 && days <= 14;
                  },
                  onTrack: (date) => {
                    const deadlinesOnDate = getDeadlinesForDate(date);
                    if (deadlinesOnDate.length === 0) return false;
                    const days = getDaysUntilDeadline(deadlinesOnDate[0].deadline);
                    return days > 14;
                  },
                }}
                modifiersClassNames={{
                  urgent: 'bg-red-500 text-white hover:bg-red-600 font-bold',
                  soon: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold',
                  onTrack: 'bg-green-500 text-white hover:bg-green-600 font-bold',
                }}
              />
              
              {/* Selected Date Deadlines */}
              {selectedDate && selectedDateDeadlines.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg text-gray-900">
                    Deadlines on {selectedDate.toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h3>
                  {selectedDateDeadlines.map((deadline, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-teal-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900">{deadline.task}</h4>
                        <Badge {...getUrgencyBadge(deadline.deadline)}>
                          {getUrgencyBadge(deadline.deadline).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Bell className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">
                          Recurring: {deadline.recurring}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedDate && selectedDateDeadlines.length === 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-gray-600">
                  No deadlines on this date
                </div>
              )}
            </Card>
          </div>
        )}
        
        {/* Compliance Marketplace */}
        {showChecklist && setupComplete && selectedState && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-3">Compliance Service Marketplace</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Top compliance providers serving <span className="font-semibold text-teal-700">{selectedState}</span> businesses
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {getProvidersByState(selectedState).length} verified partners available in your state
              </p>
            </div>
            
            {getProvidersByState(selectedState).length === 0 ? (
              <Card className="p-8 text-center bg-gradient-to-r from-gray-50 to-blue-50">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No Providers Available Yet</h3>
                <p className="text-gray-600 mb-4">
                  We're working on adding compliance service providers for {selectedState}.
                  In the meantime, you can explore national providers or contact us for recommendations.
                </p>
                <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
                  Request Provider Recommendations
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProvidersByState(selectedState).map((provider) => (
                <Card key={provider.id} className="p-6 shadow-lg border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-4xl">{provider.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl text-gray-900">{provider.name}</h3>
                          {provider.headquarterState === selectedState && (
                            <Badge className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              Local
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-900">{provider.rating}</span>
                          <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-2 flex-grow">{provider.description}</p>
                  
                  {/* Location Badge */}
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-600">
                    <Building2 className="w-3 h-3" />
                    <span>Headquartered in {provider.headquarterState}</span>
                    {provider.headquarterState !== selectedState && (
                      <Badge variant="outline" className="text-xs">
                        Serves {selectedState}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal-600" />
                      <div>
                        <p className="text-xs text-gray-600">Experience</p>
                        <p className="text-sm text-gray-900">{provider.yearsInBusiness} years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Clients</p>
                        <p className="text-sm text-gray-900">{provider.clientsServed.toLocaleString()}+</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Services</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white">
                          {service}
                        </Badge>
                      ))}
                      {provider.services.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-white">
                          +{provider.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Specializations */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.specializations.map((spec, idx) => (
                        <Badge key={idx} className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700 mb-1">Starting from</p>
                    <p className="text-lg text-green-900">{provider.pricing}</p>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-teal-600" />
                      <a href={`mailto:${provider.contactEmail}`} className="hover:text-teal-600 transition-colors">
                        {provider.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <a href={`tel:${provider.contactPhone}`} className="hover:text-blue-600 transition-colors">
                        {provider.contactPhone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                        {provider.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        window.location.href = `mailto:${provider.contactEmail}?subject=Compliance Inquiry from ComplyPilot&body=Hi ${provider.name},%0D%0A%0D%0AI'm interested in learning more about your compliance services.%0D%0A%0D%0ABusiness Type: ${selectedBusinessType}%0D%0AState: ${selectedState}%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!`;
                      }}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
                      onClick={() => {
                        toast.success(
                          <div>
                            <p className="font-semibold">Contact Information Copied!</p>
                            <p className="text-sm mt-1">You can now reach out to {provider.name}</p>
                          </div>
                        );
                        navigator.clipboard.writeText(`${provider.name}\nEmail: ${provider.contactEmail}\nPhone: ${provider.contactPhone}\nWebsite: ${provider.website}`);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
              </div>
            )}
            
            {/* Marketplace Info Banner */}
            {getProvidersByState(selectedState).length > 0 && (
              <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-2">Why Use Our Marketplace?</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Pre-vetted Providers:</strong> All partners are verified compliance experts with proven track records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Transparent Pricing:</strong> Know the costs upfront with no hidden fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Specialized Expertise:</strong> Find providers that match your specific business type and state requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Seamless Integration:</strong> These providers understand your compliance checklist and can help you stay on track</span>
                    </li>
                  </ul>
                </div>
              </div>
              </Card>
            )}
          </div>
        )}
        
        {showChecklist && (
          <Card className="p-6 shadow-lg border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-gray-900 mb-2">📧 Email Notifications Enabled</h3>
                <p className="text-gray-700 text-sm">
                  We'll send you email reminders when deadlines are approaching. 
                  Check your inbox at <span className="font-semibold">
                    {JSON.parse(localStorage.getItem('complypilot_current_user') || '{}').email}
                  </span> for important compliance alerts.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
