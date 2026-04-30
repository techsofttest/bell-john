import "./globals.css";
// Import your fonts here

export const metadata = {
  title: "Bell & John",
  description: "Global Procurement Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* NO Header or Footer here anymore! */}
        {children}
      </body>
    </html>
  );
}