export interface Products {
  currentPage: number;
  data: Product;
  perPage: number;
  total: number;
}

export interface ProductImages {
  id: number;
  url: string | null;
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
  category: number | null;
  sale: number | null;

  // Tình trạng xe
  condition: string;           // "new" | "used"
  manufacturingYear: number | null;
  mileage: number;

  // Thông số kỹ thuật
  brand: string;
  vehicleType: string;
  engineType: string;
  displacement: number | null;
  maxPower: string;
  maxTorque: string;
  transmission: string;
  fuelSystem: string;
  fuelCapacity: number | null;
  fuelConsumption: string;
  dimensions: string;
  weight: number | null;
  seatHeight: number | null;
  groundClearance: number | null;
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
