import { Barem, Body, Color, Product, ProductVariant } from "@/types/Product";
import { FC, useState, useEffect } from "react";
import cn from "clsx";
import toast from "react-hot-toast";

type ProductSectionProps = {
  productData: Product;
  products: ProductVariant[];
  setProducts: (products: ProductVariant[]) => void;
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
};

const ProductSection: FC<ProductSectionProps> = ({
  productData,
  setProducts,
  selectedColor,
  setSelectedColor,
}) => {
  const [selectedBody, setSelectedBody] = useState<Body>("M");

  const [selectedBarem, setSelectedBarem] = useState<Barem>({
    minimumQuantity: 0,
    maximumQuantity: 0,
    price: 0,
  });
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const filteredProduct = productData.productVariants.filter((item) =>
      item.attributes.find((attr) => attr.value === selectedColor)
    );
    setProducts(filteredProduct);
  }, [selectedBody, selectedColor, productData.productVariants, setProducts]);

  useEffect(() => {
    const updatedBarem = productData.baremList.find(
      (barem) =>
        quantity >= barem.minimumQuantity && quantity <= barem.maximumQuantity
    );

    if (updatedBarem) {
      setSelectedBarem(updatedBarem);
    }
  }, [quantity, productData.baremList]);

  useEffect(() => {
    setSelectedBody(undefined as any);
  }, [selectedColor]);

  const limitText = (
    limitField: React.ChangeEvent<HTMLInputElement>,
    limitNumber: number
  ) => {
    if (limitField.target.value.length > limitNumber) {
      limitField.target.value = limitField.target.value.slice(0, limitNumber);
    }
  };

  const calculatePrice = (): string => {
    const price = selectedBarem.price * quantity;
    return price.toFixed(2);
  };

  const hasStock = (value: string) =>
    !productData.productVariants.find(
      (item) =>
        item.attributes.find(
          (attr) => attr.name === "Beden" && attr.value === value
        ) &&
        item.attributes.find(
          (attr) => attr.name === "Renk" && attr.value === selectedColor
        )
    );

  const addBasket = () => {
    if (!selectedBody) return toast.error("Lütfen beden seçiniz");

    if (!selectedColor) return toast.error("Lütfen renk seçiniz");

    const boughtProduct = {
      Title: productData.productTitle,
      Color: selectedColor,
      Body: selectedBody,
      Quantity: quantity,
      TotalPrice: calculatePrice() + " TL",
    };

    toast.success(JSON.stringify(boughtProduct, null, 2));
    console.log("boughtProduct", boughtProduct);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-bold">{productData.productTitle}</h1>
        </div>
        <div>
          <h3 className="text-lg font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            molestias fuga nisi dolorem sapiente facere id? Recusandae id
            reiciendis facilis placeat accusantium rerum inventore fuga? Quo
            velit perspiciatis cum beatae?
          </h3>
        </div>
        <div className="flex gap-10 items-center">
          <h4 className="text-lg font-bold mr-3">Renk</h4>
          <div>
            {productData.selectableAttributes
              .filter((item) => item.name === "Renk")
              .map((m) =>
                m.values.map((value, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "bg-gray-200 w-28 h-10 rounded-md px-2 py-1 mx-1 text-[#040D12] bg-opacity-30 ",
                      {
                        "bg-[#040D12] text-white border":
                          selectedColor === value,
                      }
                    )}
                    onClick={() => setSelectedColor(value as Color)}
                  >
                    {value}
                  </button>
                ))
              )}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <h4 className="text-lg font-bold">Beden</h4>
          <div>
            {productData.selectableAttributes
              .filter((item) => item.name === "Beden")
              .map((m) =>
                m.values.map((value, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "bg-gray-200 w-28 h-10 rounded-md px-2 py-1 mx-1 text-[#040D12] bg-opacity-30 ",
                      {
                        "bg-[#040D12] text-white border":
                          selectedBody === value,
                      },
                      {
                        "cursor-not-allowed opacity-30": hasStock(value),
                      }
                    )}
                    onClick={() => setSelectedBody(value as Body)}
                    disabled={hasStock(value)}
                  >
                    {value}
                  </button>
                ))
              )}
          </div>
        </div>
        <div className="flex bg-slate-300 h-28 bg-opacity-20 items-center p-2 rounded-md">
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold mr-2">Toptan Fiyat</h4>
            <h6>(Adet)</h6>
          </div>
          <div className="flex gap-5">
            {productData.baremList.map((barem, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col items-center justify-center w-32 h-4 px-6 py-8  text-[#040D12] rounded-sm cursor-pointer select-none bg-gray-200 bg-opacity-30",
                  {
                    "bg-[#5C8374] text-white border":
                      quantity >= barem.minimumQuantity &&
                      quantity <= barem.maximumQuantity,
                  }
                )}
                onClick={
                  quantity >= barem.minimumQuantity &&
                  quantity <= barem.maximumQuantity
                    ? () => setSelectedBarem(barem)
                    : () => {}
                }
              >
                <span>
                  {barem.minimumQuantity} - {barem.maximumQuantity}
                </span>
                <b>{barem.price} TL</b>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <h4 className="text-lg font-bold mr-5">Adet</h4>
          <div className="flex w-full items-center justify-between">
            <div>
              <input
                className="w-28 h-10 rounded-md px-2 py-1"
                type="number"
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                }}
                min={0}
                max={999}
                value={quantity}
                maxLength={3}
                onKeyDown={(e: any) => limitText(e, 3)}
                onKeyUp={(e: any) => limitText(e, 3)}
              />
              <span> / Minimum adet 120</span>
            </div>
            <span className="text-green-500">Stok Adedi: 999</span>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-14 justify-between">
        <div className="flex items-center">
          <h4 className="text-2xl font-bold mr-5">Toplam :</h4>
          <h1 className="text-4xl font-bold">
            {quantity > 0 ? `${calculatePrice()} TL` : "0.00 TL"}
          </h1>
        </div>
        <div>
          <button
            className={cn(
              "bg-[#040D12] w-40 h-12 text-white rounded-md px-4 py-2 ",
              {
                "cursor-not-allowed opacity-30":
                  quantity >= 120 ? false : true || !selectedBody,
              }
            )}
            disabled={quantity >= 120 ? false : true || !selectedBody}
            onClick={addBasket}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
