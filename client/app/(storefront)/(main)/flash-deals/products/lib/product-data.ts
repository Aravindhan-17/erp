import { Product1, Product2, Product3, Product4 } from "@/assets/images";

export const products = [
  {
    id: 1,

    name: "Apple AirPods Pro 2",

    category: "Earbuds",

    image: Product1,

    images: [Product1, Product2, Product3, Product4],

    shortDescription: "Premium wireless earbuds with active noise cancellation.",

    description:
      "AirPods Pro delivers immersive sound with adaptive audio and premium noise cancellation technology.",

    brand: "Apple",

    model: "AirPods Pro 2",

    originalPrice: 24900,

    // current selling price
    flashPrice: 18990,

    // for compatibility with components
    discountPrice: 18990,

    discount: 24,

    saveAmount: 5910,

    rating: 4.8,

    reviews: 1200,

    sold: 2500,

    stock: 100,

    maxQty: 5,

    inStock: true,

    storage: "",

    display: "",

    rearCamera: "",

    frontCamera: "",

    features: ["Active Noise Cancellation", "Spatial Audio", "USB-C Charging", "Sweat Resistant"],

    registrationFee: 1,

    minimumOrderValue: 5000,

    minimumProducts: 2,

    cartReservation: 10,

    warranty: "1 Year Warranty",

    delivery: "Delivery by Tomorrow",
  },

  {
    id: 2,

    name: "Sony WH-1000XM5",

    category: "Headphones",

    image: Product2,

    images: [Product2, Product1, Product3, Product4],

    shortDescription: "Industry leading noise cancellation headphones.",

    description:
      "Premium wireless headphones with high resolution audio and advanced noise cancellation.",

    brand: "Sony",

    model: "WH-1000XM5",

    originalPrice: 29900,

    flashPrice: 22990,

    discountPrice: 22990,

    discount: 23,

    saveAmount: 6910,

    rating: 4.7,

    reviews: 800,

    sold: 1500,

    stock: 80,

    maxQty: 5,

    inStock: true,

    storage: "",

    display: "",

    rearCamera: "",

    frontCamera: "",

    features: ["Noise Cancellation", "30 Hours Battery", "Bluetooth 5.2", "High Resolution Audio"],

    registrationFee: 1,

    minimumOrderValue: 5000,

    minimumProducts: 2,

    cartReservation: 10,

    warranty: "1 Year Warranty",

    delivery: "Delivery by 2 days",
  },

  {
    id: 3,

    name: "Dell XPS 13 Laptop",

    category: "Laptops",

    image: Product3,

    images: [Product3, Product1, Product2],

    shortDescription: "Powerful premium laptop for work and productivity.",

    description:
      "Dell XPS 13 offers high performance with premium design and excellent battery life.",

    brand: "Dell",

    model: "XPS 13",

    originalPrice: 119000,

    flashPrice: 89990,

    discountPrice: 89990,

    discount: 25,

    saveAmount: 29010,

    rating: 4.6,

    reviews: 500,

    sold: 900,

    stock: 50,

    maxQty: 5,

    inStock: true,

    storage: "512GB SSD",

    display: "13.4 inch FHD",

    rearCamera: "",

    frontCamera: "",

    features: ["Intel Processor", "512GB SSD", "16GB RAM", "Premium Display"],

    registrationFee: 1,

    minimumOrderValue: 5000,

    minimumProducts: 2,

    cartReservation: 10,

    warranty: "1 Year Warranty",

    delivery: "Delivery by 3 days",
  },

  {
    id: 4,

    name: "iPhone 15 (128GB)",

    category: "Smartphones",

    image: Product4,

    images: [Product4, Product1, Product2],

    shortDescription: "Latest iPhone with powerful performance.",

    description: "iPhone 15 features advanced camera system and powerful A16 chip.",

    brand: "Apple",

    model: "iPhone 15",

    originalPrice: 79900,

    flashPrice: 62990,

    discountPrice: 62990,

    discount: 21,

    saveAmount: 16910,

    rating: 4.9,

    reviews: 2500,

    sold: 5000,

    stock: 100,

    maxQty: 5,

    inStock: true,

    storage: "128GB",

    display: "6.1 inch OLED",

    rearCamera: "48MP",

    frontCamera: "12MP",

    features: ["A16 Bionic Chip", "48MP Camera", "OLED Display", "USB-C Charging"],

    registrationFee: 1,

    minimumOrderValue: 5000,

    minimumProducts: 2,

    cartReservation: 10,

    warranty: "1 Year Warranty",

    delivery: "Delivery by Tomorrow",
  },
];

export type Product = (typeof products)[0];
