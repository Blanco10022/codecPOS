import { EscrowDashboardComponent } from "@/components/escrow-dashboard";
import DashboardRootLayout from "@/app/_maindashboard";

export default function EscrowDashboardPage() {
  return (
    <DashboardRootLayout>
      <EscrowDashboardComponent />
    </DashboardRootLayout>
  );
}
