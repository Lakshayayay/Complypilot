import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('complypilot_language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('complypilot_language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      comply: 'Comply',
      performance: 'Performance',
      market: 'Market',
      logout: 'Logout'
    },
    landing: {
      tagline: 'Your Business. Compliant. Confident. Clear.',
      subtitle: 'Navigate legal compliance and track financial performance with ease',
      getStarted: 'Get Started',
      features: {
        title: 'Everything You Need to Stay Compliant',
        comply: {
          title: 'Comply Navigator',
          desc: 'Personalized legal checklists based on your state and business type'
        },
        performance: {
          title: 'Performance Pilot',
          desc: 'Track budget vs actuals with visual insights and variance analysis'
        },
        bot: {
          title: 'ComplyBot Assistant',
          desc: 'Get instant answers to your compliance and finance questions'
        },
        market: {
          title: 'Market Insights',
          desc: 'Visualize demand and opportunities across India with interactive maps'
        }
      }
    },
    login: {
      title: 'Welcome to ComplyPilot',
      subtitle: 'Your smart assistant for business compliance and performance',
      email: 'Email Address',
      emailPlaceholder: 'you@company.com',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      signIn: 'Sign In',
      demoNote: 'Demo mode: Any email and name will work'
    },
    comply: {
      title: 'Compliance Navigator',
      subtitle: 'Your personalized legal compliance roadmap',
      state: 'Select Your State',
      businessType: 'Select Business Type',
      businessTypes: {
        manufacturing: 'Manufacturing',
        retail: 'Retail',
        services: 'Services',
        technology: 'Technology',
        food: 'Food & Beverage'
      },
      generateChecklist: 'Generate Compliance Checklist',
      progress: 'Compliance Progress',
      recommendations: 'State Marketplace Recommendations',
      viewDetails: 'View Details',
      markComplete: 'Mark Complete',
      undo: 'Undo',
      congratulations: 'Congratulations!',
      allComplete: 'You\'ve completed all compliance tasks!',
      visitMarketplace: 'Visit Marketplace'
    },
    performance: {
      title: 'Performance Pilot',
      subtitle: 'Track your financial performance with visual insights',
      overview: 'Financial Overview',
      budget: 'Budget',
      actual: 'Actual',
      variance: 'Variance',
      budgetVsActual: 'Budget vs Actual Comparison',
      categoryBreakdown: 'Expense Category Breakdown',
      addExpense: 'Add Custom Expense',
      categoryName: 'Category Name',
      budgetAmount: 'Budget Amount',
      actualAmount: 'Actual Amount',
      addCategory: 'Add Category',
      cancel: 'Cancel',
      totalBudget: 'Total Budget',
      totalActual: 'Total Actual',
      totalVariance: 'Total Variance'
    },
    market: {
      title: 'Market Insights',
      subtitle: 'Visualize product demand and market opportunities across India',
      selectProduct: 'Select Product',
      selectMetric: 'Select Metric',
      searchState: 'Search State',
      searchPlaceholder: 'Type state name...',
      metrics: {
        demand: 'Demand Index',
        growth: 'Growth %',
        revenue: 'Revenue Potential'
      },
      indiaMap: 'India Market Map',
      loadingData: 'Loading data...',
      legend: {
        veryHigh: 'Very High',
        high: 'High',
        moderate: 'Moderate',
        low: 'Low',
        veryLow: 'Very Low'
      },
      quickStats: 'Quick Stats',
      state: 'State',
      demandIndex: 'Demand Index',
      marketSize: 'Market Size',
      growthRate: 'Growth Rate',
      topCities: 'Top Cities',
      viewDetails: 'View Details',
      hoverPrompt: 'Hover over a state to see details',
      dataSource: 'Data simulated for demonstration – Real data integration coming soon. Last updated: Oct 2025',
      marketOverview: 'Market Overview',
      detailedInsights: 'Detailed insights for',
      keyMetrics: 'Key Metrics',
      compliance: 'Compliance',
      complexityScore: 'Complexity Score',
      yoy: 'Year over Year',
      trendChart: '6-Month Demand Trend',
      viewCompliance: 'View Compliance Requirements',
      compareStates: 'Compare with Other States',
      downloadReport: 'Download State Report (PDF)',
      lastUpdated: 'Last updated: Oct 2025',
      clickDetails: 'Click for detailed insights'
    },
    bot: {
      title: 'ComplyBot',
      askQuestion: 'Ask me anything about compliance or finances...',
      placeholder: 'Type your question here...',
      send: 'Send',
      greeting: 'Hello! I\'m ComplyBot, your compliance and finance assistant. How can I help you today?'
    },
    subscription: {
      title: 'Unlock Premium Benefits',
      subtitle: 'Get expert CA assistance and financial support',
      price: '₹2,999/month',
      features: {
        ca: '24/7 CA Support',
        caDesc: 'Direct access to certified accountants',
        financial: 'Financial Planning',
        financialDesc: 'Personalized budget & tax planning',
        priority: 'Priority Support',
        priorityDesc: 'Get answers within 1 hour',
        reports: 'Advanced Reports',
        reportsDesc: 'Detailed compliance & finance reports'
      },
      notInterested: 'Not Interested',
      subscribeNow: 'Subscribe Now',
      reminderTitle: 'Get Subscription Reminders',
      reminderSubtitle: 'We\'ll send you details and reminders',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      whatsapp: 'WhatsApp Number',
      whatsappPlaceholder: '+91 XXXXX XXXXX',
      invalidEmail: 'Please enter a valid email address',
      invalidWhatsapp: 'Please enter a valid 10-digit WhatsApp number',
      sendReminders: 'Send Me Reminders',
      back: 'Back',
      successTitle: 'Reminders Set!',
      successMessage: 'We\'ll send reminders to both your email and WhatsApp. Our CA team will contact you within 24 hours.',
      close: 'Close'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      apply: 'Apply'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      comply: 'अनुपालन',
      performance: 'प्रदर्शन',
      market: 'बाज़ार',
      logout: 'लॉगआउट'
    },
    landing: {
      tagline: 'आपका व्यवसाय। अनुपालक। आत्मविश्वासी। स्पष्ट।',
      subtitle: 'कानूनी अनुपालन को नेविगेट करें और आसानी से वित्तीय प्रदर्शन को ट्रैक करें',
      getStarted: 'शुरू करें',
      features: {
        title: 'अनुपालन बनाए रखने के लिए आवश्यक सब कुछ',
        comply: {
          title: 'अनुपालन नेविगेटर',
          desc: 'आपके राज्य और व्यवसाय प्रकार के आधार पर वैयक्तिकृत कानूनी चेकलिस्ट'
        },
        performance: {
          title: 'प्रदर्शन पायलट',
          desc: 'दृश्य अंतर्दृष्टि और विचरण विश्लेषण के साथ बजट बनाम वास्तविक को ट्रैक करें'
        },
        bot: {
          title: 'ComplyBot सहायक',
          desc: 'अपने अनुपालन और वित्त प्रश्नों के तत्काल उत्तर प्राप्त करें'
        },
        market: {
          title: 'बाजार अंतर्दृष्टि',
          desc: 'इंटरैक्टिव मानचित्रों के साथ भारत भर में मांग और अवसरों की कल्पना करें'
        }
      }
    },
    login: {
      title: 'ComplyPilot में आपका स्वागत है',
      subtitle: 'व्यवसाय अनुपालन और प्रदर्शन के लिए आपका स्मार्ट सहायक',
      email: 'ईमेल पता',
      emailPlaceholder: 'you@company.com',
      name: 'पूरा नाम',
      namePlaceholder: 'आपका नाम',
      signIn: 'साइन इन करें',
      demoNote: 'डेमो मोड: कोई भी ईमेल और नाम काम करेगा'
    },
    comply: {
      title: 'अनुपालन नेविगेटर',
      subtitle: 'आपका वैयक्तिकृत कानूनी अनुपालन रोडमैप',
      state: 'अपना राज्य चुनें',
      businessType: 'व्यवसाय प्रकार चुनें',
      businessTypes: {
        manufacturing: 'विनिर्माण',
        retail: 'खुदरा',
        services: 'सेवाएं',
        technology: 'प्रौद्योगिकी',
        food: 'खाद्य और पेय'
      },
      generateChecklist: 'अनुपालन चेकलिस्ट जेनरेट करें',
      progress: 'अनुपालन प्रगति',
      recommendations: 'राज्य बाज़ार सिफारिशें',
      viewDetails: 'विवरण देखें',
      markComplete: 'पूर्ण चिह्नित करें',
      undo: 'पूर्ववत करें',
      congratulations: 'बधाई हो!',
      allComplete: 'आपने सभी अनुपालन कार्य पूरे कर लिए हैं!',
      visitMarketplace: 'बाज़ार पर जाएं'
    },
    performance: {
      title: 'प्रदर्शन पायलट',
      subtitle: 'दृश्य अंतर्दृष्टि के साथ अपने वित्तीय प्रदर्शन को ट्रैक करें',
      overview: 'वित्तीय अवलोकन',
      budget: 'बजट',
      actual: 'वास्तविक',
      variance: 'विचरण',
      budgetVsActual: 'बजट बनाम वास्तविक तुलना',
      categoryBreakdown: 'व्यय श्रेणी विश्लेषण',
      addExpense: 'कस्टम व्यय जोड़ें',
      categoryName: 'श्रेणी का नाम',
      budgetAmount: 'बजट राशि',
      actualAmount: 'वास्तविक राशि',
      addCategory: 'श्रेणी जोड़ें',
      cancel: 'रद्द करें',
      totalBudget: 'कुल बजट',
      totalActual: 'कुल वास्तविक',
      totalVariance: 'कुल विचरण'
    },
    market: {
      title: 'बाजार अंतर्दृष्टि',
      subtitle: 'भारत भर में उत्पाद मांग और बाजार के अवसरों की कल्पना करें',
      selectProduct: 'उत्पाद चुनें',
      selectMetric: 'मीट्रिक चुनें',
      searchState: 'राज्य खोजें',
      searchPlaceholder: 'राज्य का नाम टाइप करें...',
      metrics: {
        demand: 'मांग सूचकांक',
        growth: 'वृद्धि %',
        revenue: 'राजस्व क्षमता'
      },
      indiaMap: 'भारत बाजार मानचित्र',
      loadingData: 'डेटा लोड हो रहा है...',
      legend: {
        veryHigh: 'बहुत उच्च',
        high: 'उच्च',
        moderate: 'मध्यम',
        low: 'कम',
        veryLow: 'बहुत कम'
      },
      quickStats: 'त्वरित आंकड़े',
      state: 'राज्य',
      demandIndex: 'मांग सूचकांक',
      marketSize: 'बाजार का आकार',
      growthRate: 'विकास दर',
      topCities: 'शीर्ष शहर',
      viewDetails: 'विवरण देखें',
      hoverPrompt: 'विवरण देखने के लिए राज्य पर होवर करें',
      dataSource: 'प्रदर्शन के लिए डेटा अनुकरण किया गया – वास्तविक डेटा एकीकरण जल्द ही आ रहा है। अंतिम अपडेट: अक्टूबर 2025',
      marketOverview: 'बाजार अवलोकन',
      detailedInsights: 'के लिए विस्तृत जानकारी',
      keyMetrics: 'मुख्य मेट्रिक्स',
      compliance: 'अनुपालन',
      complexityScore: 'जटिलता स्कोर',
      yoy: 'साल दर साल',
      trendChart: '6-माह मांग प्रवृत्ति',
      viewCompliance: 'अनुपालन आवश्यकताएं देखें',
      compareStates: 'अन्य राज्यों के साथ तुलना करें',
      downloadReport: 'राज्य रिपोर्ट डाउनलोड करें (PDF)',
      lastUpdated: 'अंतिम अपडेट: अक्टूबर 2025',
      clickDetails: 'विस्तृत जानकारी के लिए क्लिक करें'
    },
    bot: {
      title: 'ComplyBot',
      askQuestion: 'अनुपालन या वित्त के बारे में मुझसे कुछ भी पूछें...',
      placeholder: 'अपना प्रश्न यहां टाइप करें...',
      send: 'भेजें',
      greeting: 'नमस्ते! मैं ComplyBot हूं, आपका अनुपालन और वित्त सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?'
    },
    subscription: {
      title: 'प्रीमियम लाभ अनलॉक करें',
      subtitle: 'विशेषज्ञ CA सहायता और वित्तीय सहायता प्राप्त करें',
      price: '₹2,999/माह',
      features: {
        ca: '24/7 CA सहायता',
        caDesc: 'प्रमाणित लेखाकारों तक सीधी पहुंच',
        financial: 'वित्तीय योजना',
        financialDesc: 'व्यक्तिगत बजट और कर योजना',
        priority: 'प्राथमिकता सहायता',
        priorityDesc: '1 घंटे के भीतर उत्तर प्राप्त करें',
        reports: 'उन्नत रिपोर्ट',
        reportsDesc: 'विस्तृत अनुपालन और वित्त रिपोर्ट'
      },
      notInterested: 'रुचि नहीं है',
      subscribeNow: 'अभी सदस्यता लें',
      reminderTitle: 'सदस्यता अनुस्मारक प्राप्त करें',
      reminderSubtitle: 'हम आपको विवरण और अनुस्मारक भेजेंगे',
      email: 'ईमेल पता',
      emailPlaceholder: 'your@email.com',
      whatsapp: 'WhatsApp नंबर',
      whatsappPlaceholder: '+91 XXXXX XXXXX',
      invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      invalidWhatsapp: 'कृपया एक मान्य 10-अंकीय WhatsApp नंबर दर्ज करें',
      sendReminders: 'मुझे अनुस्मारक भेजें',
      back: 'वापस',
      successTitle: 'अनुस्मारक सेट हो गए!',
      successMessage: 'हम आपके ईमेल और WhatsApp दोनों पर अनुस्मारक भेजेंगे। हमारी CA टीम 24 घंटे के भीतर आपसे संपर्क करेगी।',
      close: 'बंद करें'
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      clear: 'साफ़ करें',
      apply: 'लागू करें'
    }
  }
};
