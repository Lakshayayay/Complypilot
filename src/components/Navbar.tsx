import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileCheck, TrendingUp, Plane, LogOut, User, Map, Moon, Sun, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logoImage from 'figma:asset/0f424105229da2bd124b4bc442c5ce29a660493b.png';

interface NavbarProps {
  user: { email: string; name: string } | null;
  onLogout: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="ComplyPilot" 
              className="h-10 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            
            <Link
              to="/comply"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/comply') 
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{t('nav.comply')}</span>
            </Link>
            
            <Link
              to="/performance"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/performance') 
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('nav.performance')}</span>
            </Link>
            
            <Link
              to="/market-insights"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/market-insights') 
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>{t('nav.market')}</span>
            </Link>
            
            {user && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
                {/* Theme Toggle */}
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>

                {/* Language Toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Languages className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('hi')} className={language === 'hi' ? 'bg-accent' : ''}>
                      हिन्दी (Hindi)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="hover:text-red-600 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {t('nav.logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
