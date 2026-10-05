export type GenerationStatus = 'idle' | 'thinking' | 'streaming' | 'ready';

export type DeployStatus = 'none' | 'packaging' | 'uploading' | 'booting' | 'live';

export type PaymentStatus = 'none' | 'pending' | 'processing' | 'paid' | 'failed';

export type SiteKind = 'landing' | 'portfolio' | 'shop' | 'event';

export interface Suggestion {
  label: string;
  prompt: string;
  kind: SiteKind;
}

export interface Deployment {
  status: DeployStatus;
  spaceName: string;
  url: string;
}

export interface Payment {
  status: PaymentStatus;
  transactionId?: string;
  amount: number; // en centimes FCFA (500000 = 5000 FCFA)
  currency: 'XOF';
  paymentUrl?: string;
}