"use client";
import "./globals.css";
import { ConfigProvider, App as AntApp } from "antd";
import { theme } from "../../theme/themeConfig";
import { Provider } from "react-redux";
import { store } from "../store";
import { Inter, Open_Sans } from "next/font/google";
import "react-phone-input-2/lib/style.css";
import StripeProvider from "@/components/general/StripeProvider";


// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// ✅ Metadata export (Next.js will automatically add <title> and <meta>)
// export const metadata = {
//   title: "Safe Harbour",
//   description: "Secure and efficient community management platform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const [loading, setLoading] = useState(false);

  // // stop loading when the path changes (page finished)
  // useEffect(() => {
  //   setLoading(false);
  // }, [pathname]);
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        <title>Safe Harbour</title>
        <meta name="description" content="Secure and efficient community management platform" />
      </head>
      <body className="font-sans antialiased">
         {/* {loading && <LoadingOverlay />} */}
        <StripeProvider>
          <Provider store={store}>
            <ConfigProvider theme={theme}>
              <AntApp>{children}</AntApp>
            </ConfigProvider>
          </Provider>
        </StripeProvider>
      </body>
    </html>
  );
}
