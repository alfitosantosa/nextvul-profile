"use client";

import { DockDemo } from "@/components/dock-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProducts } from "@/features/marketplace/products/api/use-get-products";
import TypescriptIcon from "@/public/typescript.png";

import { useCartStore } from "@/store/cart-store";
import DropdownCart from "@/components/molecules/dropdownCart";
import Link from "next/link";
import { toast } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import React from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

function MarketplaceContent() {
  const { data = [], isLoading } = useGetProducts();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: Product, index: number) => {
      addToCart({ ...product, id: index, quantity: 1 });
      toast.success(`${product.name} added to cart`);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-20 py-10 font-[family-name:var(--font-geist-sans)] p-4">
      <div className="flex w-full px-5 max-w-6xl mt-10">
        <div className="justify-items-start">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <p className="text-gray-500 mb-10">Welcome to Marketplace page</p>
        </div>
        <div className="justify-items-end ml-auto">
          <DropdownCart />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
        {data.map((product, index) => (
          <Card key={index} className="p-4 flex flex-col gap-2">
            <Link href={`/marketplace/${product.id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl || TypescriptIcon.src} className="m-auto" alt="photo product" />
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">{product.name}</h2>
              </div>
            </Link>
            <p>{product.description}</p>
            <p>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>

            <Button className="mt-2 w-full" onClick={() => handleAddToCart(product, index)}>
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Marketplace() {
  return (
    <QueryClientProvider client={queryClient}>
      <DockDemo />
      <MarketplaceContent />
    </QueryClientProvider>
  );
}
