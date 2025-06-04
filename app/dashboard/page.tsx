import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import rawData from "./data.json";

export default function Page() {
  const processedData = Object.entries(rawData).reduce(
    (acc, [category, metrics]) => {
      acc[category] = Object.entries(metrics).map(([metric, value]) => ({
        metric,
        value: String(value),
      }));
      return acc;
    },
    {} as Record<string, { metric: string; value: string }[]>
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {Object.entries(processedData).map(([category, metrics]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 px-4 lg:px-6">{category}</h2>
                  <DataTable data={metrics} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
