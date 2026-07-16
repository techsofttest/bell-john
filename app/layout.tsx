import { WishlistProvider } from "@/app/context/WishlistContext";
import { CartProvider } from "@/app/context/CartContext";
import { RegionProvider } from "@/app/context/RegionContext";
import { AuthProvider } from "@/app/context/AuthContext";
import CartSlideOver from "@/app/components/cart/CartSlideOver";
import RegionSelectorModal from "@/app/components/global/RegionSelectorModal";
import "./globals.css";
import Script from "next/script";



export const metadata = {
  title: "Bell & John",
  description: "Global Procurement Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
	<head>
	<script 
      type="text/javascript"
      src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
      id="aisensy-wa-widget"
      widget-id="aab3zm">
    </script>
	</head>
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