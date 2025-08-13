"use client"; // ← add this at the very top

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function PaymentStatusPage() {

  const saveForm = async () => {
    try {
      const a = await client.mutations.saveForm({
        acceptanceFile: { key: "", versionId: "" },
        membershipInformationFile: { key: "", versionId: "" },
        reEmploymentHistory: { key: "", versionId: "" },
      });
      console.log(a);
      console.log("✅ Form saved successfully");
    } catch (error) {
      console.error("❌ Error saving form:", error);
    }
  };

  return (
    <div className="flex justify-start p-4">
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={saveForm} // now works because this is a Client Component
      >
        Save Form
      </button>
    </div>
  );
}
