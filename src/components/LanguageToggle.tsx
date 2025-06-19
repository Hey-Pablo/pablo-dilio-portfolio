
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export type Language = 'pt' | 'en';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'pt' ? 'en' : 'pt')}
      className="flex items-center gap-2 hover:scale-105 transition-transform"
    >
      <Globe size={16} />
      <span className="font-mono text-xs">
        {currentLanguage === 'pt' ? 'EN' : 'PT'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
