import Product from '@models/Product';

export interface IProps {
  product: Product;
  isSelected: boolean;
  onClick(): void;
}
