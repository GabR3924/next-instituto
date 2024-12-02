import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "@/Context/DataContext";
import { PlanProvider } from "@/Context/PlanContex";
import { FormDataProvider } from "@/Context/FormDataContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Vivir Seguros",
  description: "Polizas AP",
};

export default function RootLayout({ children }) {
  return (
    <DataProvider>
      <PlanProvider>
        <FormDataProvider>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              {children}
            </body>
          </html>
        </FormDataProvider>
      </PlanProvider>
    </DataProvider>
  );
}
