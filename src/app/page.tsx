// import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import WorkOrder from "@/components/WorkOrder";
// import "../styles/globals.css";

export default function Home() {
  return (
    <Layout activeMenuItemName="Work Orders">
      <WorkOrder />
    </Layout>
  );
}
