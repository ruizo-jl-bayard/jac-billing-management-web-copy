"use client"; // ← add this at the very top

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";

const client = generateClient<Schema>();

type File = {
  key: string;
  versionId: string;
  isLatest: boolean;
};

export default function PaymentStatusPage() {
  const [list, setList] = useState<File[]>([]);

  const saveForm = async () => {
    try {
      // const a = await client.mutations.saveForm({
      //   acceptanceFile: { key: "", versionId: "" },
      //   membershipInformationFile: { key: "", versionId: "" },
      //   reEmploymentHistory: { key: "", versionId: "" },
      // });
      await client.mutations.triggerCamunda({
        acceptanceFile: list.find((a) => a.isLatest),
        membershipInformationFile: list.find((a) => a.isLatest),
        reEmploymentHistory: list.find((a) => a.isLatest),
      });

      console.log("Form saved successfully");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const getList = async () => {
    const response = await client.queries.getS3Objects() as { data: unknown };
    const data = response.data as File[];
    setList(data);
  };

  return (
    <div className="flex flex-col justify-start p-4 space-y-6">
      {/* File List */}
      <div>
        <ul className="space-y-2">
          {list.map((item, index) => (
            <li key={index}>
              Key: {item.key}, Version: {item.versionId}, Latest: {item.isLatest ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={getList}
        >
          Get List
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={saveForm}
        >
          Start Camunda
        </button>
      </div>
    </div>
  );
}
