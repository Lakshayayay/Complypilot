import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plane, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: (email: string, name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('complypilot_users') || '[]');
      const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword);
      
      if (user) {
        onLogin(user.email, user.name);
        toast.success(`Welcome back, ${user.name}!`);
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('complypilot_users') || '[]');
      
      if (users.find((u: any) => u.email === signupEmail)) {
        toast.error('Email already registered');
        setIsLoading(false);
        return;
      }
      
      const newUser = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      };
      
      users.push(newUser);
      localStorage.setItem('complypilot_users', JSON.stringify(users));
      
      onLogin(newUser.email, newUser.name);
      toast.success('Account created successfully!');
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-teal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-4 rounded-2xl">
              <Plane className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-foreground mb-2">{t('login.title')}</h1>
          <p className="text-muted-foreground">{t('login.subtitle')}</p>
        </div>
        
        <Card className="p-8 shadow-xl border-border bg-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">{t('login.signIn')}</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">{t('login.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? `${t('common.loading')}...` : t('login.signIn')}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  {t('login.demoNote')}
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">{t('login.name')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={t('login.namePlaceholder')}
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="signup-email">{t('login.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? `${t('common.loading')}...` : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
