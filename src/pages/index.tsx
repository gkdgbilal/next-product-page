import { useState } from "react";
import { ImageCarousel } from "@/components/ImageCarousel";
import ProductSection from "@/components/ProductSection";
import productData from "@/data/product-data.json";
import { Body, Color, ProductVariant } from "@/types/Product";

export default function Home() {
  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color>("Siyah");

  return (
    <div className="flex">
      <ImageCarousel products={products} selectedColor={selectedColor} />
      <ProductSection
        productData={productData}
        setProducts={setProducts}
        products={products}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
}
