import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src={logo} alt="VerityAI Logo" className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              VerityAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Analyze
            </Link>
            <Link 
              to="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/admin" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Model Stats
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/docs">
                <FileText className="h-4 w-4 mr-2" />
                Docs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
