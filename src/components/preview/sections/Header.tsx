import React from 'react';
import { useResumeStore } from '../../../store/useResumeStore';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface HeaderProps {
  isInverted?: boolean;
}

export function Header({ isInverted = false }: HeaderProps) {
  const { resumeData } = useResumeStore();
  const { theme } = useTheme();
  const contact = resumeData.sections.contact.content;

  if (!contact) return null;

  const textColor = isInverted ? '#FFFFFF' : theme.colors.text;
  const primaryColor = isInverted ? '#FFFFFF' : theme.colors.primary;
  const secondaryColor = isInverted ? 'rgba(255, 255, 255, 0.9)' : theme.colors.secondary;

  const ContactItem = ({ 
    icon: Icon, 
    href, 
    children 
  }: { 
    icon: typeof Mail; 
    href?: string; 
    children: React.ReactNode;
  }) => {
    const content = (
      <div className="inline-flex items-center whitespace-nowrap">
        <span className="flex-shrink-0 w-5 flex justify-center">
          <Icon 
            size={16}
            style={{ color: primaryColor }}
          />
        </span>
        <span 
          className="ml-2 text-[14px]"
          style={{ color: href ? primaryColor : secondaryColor }}
        >
          {children}
        </span>
      </div>
    );

    if (href) {
      return (
        <a 
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="hover:underline"
        >
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <header className="text-center space-y-6">
      {/* Name */}
      <h1 
        className="text-[32px] font-bold tracking-tight"
        style={{ color: primaryColor }}
      >
        {contact.fullName}
      </h1>
      
      {/* Contact Information */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {contact.location && (
          <ContactItem icon={MapPin}>
            {contact.location}
          </ContactItem>
        )}
        
        {contact.email && (
          <ContactItem 
            icon={Mail}
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </ContactItem>
        )}
        
        {contact.phone && (
          <ContactItem 
            icon={Phone}
            href={`tel:${contact.phone}`}
          >
            {contact.phone}
          </ContactItem>
        )}
      </div>

      {/* Social Links */}
      <div className="flex justify-center items-center gap-8">
        {contact.linkedin && (
          <ContactItem 
            icon={Linkedin}
            href={contact.linkedin}
          >
            LinkedIn
          </ContactItem>
        )}
        
        {contact.github && (
          <ContactItem 
            icon={Github}
            href={contact.github}
          >
            GitHub
          </ContactItem>
        )}
      </div>
    </header>
  );
}