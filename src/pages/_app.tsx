import type { AppProps } from "next/app"
import { SnackbarProvider } from "notistack"
import "../styles/globals.css"
import { AppDataProvider } from './../contexts/initialDataContext';
import AuthRoute from "../components/AuthRoute";
import Layout from "@components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppDataProvider>
      <AuthRoute>
        <SnackbarProvider maxSnack={2}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </AuthRoute>
    </AppDataProvider>
  );
}