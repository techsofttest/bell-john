import { WishlistProvider } from "@/app/context/WishlistContext";
import { CartProvider } from "@/app/context/CartContext";
import CartSlideOver from "@/app/components/cart/CartSlideOver";
import "./globals.css";

export const metadata = {
  title: "Bell & John",
  description: "Global Procurement Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartSlideOver />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}