export interface Products {
  currentPage: number;
  data: Product;
  perPage: number;
  total: number;
}

export interface ProductImages {
  id: number;
  url: string;
}

export interface Variant {
  id: number;
  name: string;
  colorName: string;
  colorCode: string;
  stock: number;
  sold: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  visited: number;
  price: number;
  salePrice: number;
  modifiedDate: string;
  createdDate: string;
  status: number;
  author: number;
  category: number;
  sale: number;

  // Tình trạng xe
  condition: string;          // "new" | "used"
  manufacturingYear: number;
  mileage: number;

  // Thông số kỹ thuật
  brand: string;
  vehicleType: string;
  engineType: string;
  displacement: number;
  maxPower: string;
  maxTorque: string;
  transmission: string;
  fuelSystem: string;
  fuelCapacity: number;
  fuelConsumption: string;
  dimensions: string;
  weight: number;
  seatHeight: number;
  groundClearance: number;
  warrantyInfo: string;
  origin: string;
  isNew: boolean;

  // Trả góp
  installmentSupported: boolean;
  installmentMonths: number;
  downPaymentPercent: number;

  variants: Variant[];
  images: ProductImages[];
}
