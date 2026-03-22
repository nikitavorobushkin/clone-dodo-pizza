import { formatSize } from '@/lib/format-size';
import { ProductItem } from '@prisma/client';

interface ReturnProps {
  textDetails: string;
  totalPrice: number;
}

export const getProductDetails = (
  selectedItem: ProductItem,
): ReturnProps => {
  const textDetails = ` ${formatSize(
    selectedItem.value,
    selectedItem.unit,
  )}, ${selectedItem.weight} г`;

  const totalPrice = selectedItem.price;

  return {
    textDetails,
    totalPrice,
  };
};
