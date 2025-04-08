
export type User = {
  id: string;
  email: string;
  name: string;
};

export type SignatureData = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  company?: string;
  website?: string;
  address?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  customImage?: string;
  template: SignatureTemplate;
  color: string;
};

export type SignatureTemplate = 'professional' | 'modern' | 'creative' | 'minimalist' | 'classic';

export const defaultSignatureData: SignatureData = {
  id: '',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '(123) 456-7890',
  title: 'Marketing Manager',
  company: 'Example Corp',
  website: 'www.example.com',
  linkedin: '',
  twitter: '',
  instagram: '',
  facebook: '',
  template: 'professional',
  color: '#1A365D',
};
