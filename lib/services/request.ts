import { FormValues } from "@/types";

export async function submitServiceRequest(data: FormValues) {
  try {
    console.log("Submitting service request:", data);
    
    const response = await fetch("/api/service-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit service request");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting service request:", error);
    throw error;
  }
} 