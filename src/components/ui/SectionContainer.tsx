import { FC, PropsWithChildren } from 'react';

interface SectionContainerProps extends PropsWithChildren {
  className?: string;
  background?: 'hero' | 'primary' | 'secondary' | 'tertiary';
}

export const SectionContainer: FC<SectionContainerProps> = ({ 
  children, 
  className = '',
  background = 'primary' 
}) => {
  const getBackgroundClass = () => {
    switch (background) {
      case 'hero':
        return 'bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-3xl blur-3xl';
      case 'primary':
        return 'bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-3xl blur-3xl';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-700/20 to-gray-800/20 rounded-3xl blur-3xl';
      case 'tertiary':
        return 'bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-3xl blur-3xl';
      default:
        return 'bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-3xl blur-3xl';
    }
  };

  return (
    <div className={`relative text-center text-white ${className}`}>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${getBackgroundClass()}`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};