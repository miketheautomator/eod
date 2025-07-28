import { FC } from 'react';

interface SectionBackgroundProps {
  variant?: 'hero' | 'primary' | 'secondary' | 'tertiary';
}

export const SectionBackground: FC<SectionBackgroundProps> = ({ 
  variant = 'primary' 
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl';
      case 'primary':
        return 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl';
      case 'tertiary':
        return 'bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-3xl blur-3xl';
      default:
        return 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl';
    }
  };

  return (
    <div className={`absolute inset-0 ${getBackgroundClass()}`} />
  );
};