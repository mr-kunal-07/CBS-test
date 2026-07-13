"use client";

import { useRouter } from "next/navigation";
import AddPigmyDepositModal from "@/components/futuremodels/AddPigmyDepositModal";


export default function PigmyDepositDetailsPage() {
  const router = useRouter();

  return <AddPigmyDepositModal open onClose={() => router.back()} />;
  
}
