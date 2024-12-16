export type TBike = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string | null;
  quantity: number;
  inStock: true | false;
};

export type ValidationErrorDetails = {
  message: string;
  name: string;
  kind: string;
  path: string;
  value: unknown;
  properties?: Record<string, unknown>;
};
