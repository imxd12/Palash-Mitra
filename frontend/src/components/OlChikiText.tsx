import React from 'react';

export interface VernacularTextProps {
  text: string;
  latin?: string;
  phonetic?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLatin?: boolean;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VernacularText: React.FC<VernacularTextProps> = ({
  text = '',
  latin,
  phonetic,
  size = 'md',
  showLatin = true,
  color,
  className = '',
  style = {}
}) => {
  const fontSizes = {
    xs: '0.85rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.75rem',
    xl: '2.4rem'
  };

  // Detect whether text actually contains Ol Chiki Unicode characters (\u1C50 - \u1C7F)
  const hasOlChiki = /[\u1C50-\u1C7F]/.test(text);

  // Detect Warang Chiti characters (U+118A0 - U+118FF in UTF-16 surrogate pairs)
  const hasWarangChiti = /[\uD806][\uDCA0-\uDCFF]/.test(text);

  const scriptClass = hasOlChiki 
    ? 'font-ol-chiki' 
    : hasWarangChiti 
    ? 'font-warang-chiti' 
    : '';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', ...style }} className={className}>
      <span
        className={scriptClass}
        style={{
          fontSize: fontSizes[size],
          fontWeight: 600,
          color: color || 'var(--color-primary)',
          lineHeight: 1.35,
          letterSpacing: hasOlChiki ? '0.02em' : 'normal'
        }}
      >
        {text}
      </span>
      {showLatin && latin && latin.trim().toLowerCase() !== text.trim().toLowerCase() && (
        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
          {latin} {phonetic && <span style={{ opacity: 0.8 }}>({phonetic})</span>}
        </span>
      )}
    </div>
  );
};

// Backwards-compatible alias so all existing imports of OlChikiText work seamlessly
export const OlChikiText = VernacularText;
