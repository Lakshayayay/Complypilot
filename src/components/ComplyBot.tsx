import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatbotData } from '../data/chatbotData';

export function ComplyBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; text: string }>>([
    { type: 'bot', text: 'Hi! I\'m ComplyBot. Ask me any legal or compliance question!' }
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  
  const handleQuestionClick = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    
    const faq = chatbotData.faqs.find(f => f.question === question);
    if (faq) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: faq.answer }]);
      }, 500);
    }
    
    setSelectedQuestion('');
  };
  
  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="text-lg">ComplyBot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Questions */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="space-y-2">
              {chatbotData.faqs.slice(0, 3).map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq.question)}
                  className="w-full text-left text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
