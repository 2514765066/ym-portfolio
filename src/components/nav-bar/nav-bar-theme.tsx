'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const NavBarTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((t) => (t == 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme}>
      {mounted && theme == 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};
