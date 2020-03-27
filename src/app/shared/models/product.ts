
export class Product {
  $key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string[] = [''];
  description: string;
  brand: string;
  hasDiscount: boolean;
  timesBought: number = 0;
  discount: number;
  property: any[] = [];
  tags: any[] = [];
  mainCategory: string;
  inStock: boolean;
  rating = 0;
}