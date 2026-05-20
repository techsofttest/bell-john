import { WishlistProvider } from "@/app/context/WishlistContext";
import { CartProvider } from "@/app/context/CartContext";
import { RegionProvider } from "@/app/context/RegionContext";
import { AuthProvider } from "@/app/context/AuthContext";
import CartSlideOver from "@/app/components/cart/CartSlideOver";
import RegionSelectorModal from "@/app/components/global/RegionSelectorModal";
import "./globals.css";

export const metadata = {
  title: "Bell & John",
  description: "Global Procurement Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RegionProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <CartSlideOver />
                <RegionSelectorModal />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </RegionProvider>
      </body>
    </html>
  );
}