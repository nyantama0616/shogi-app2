import { healthCheck } from "@/api/health-check";

export default async function TopPage() {
  await healthCheck();

  return (
    <div>
      Top Page
    </div>
  );
}
