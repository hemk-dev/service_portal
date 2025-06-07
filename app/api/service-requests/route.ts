import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FormValues, ServiceRequest } from '@/types';

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/d8bdfb91-b5e9-4ee1-8b3c-4d917778beae';

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormValues = await request.json();
    const timestamp = new Date();
    
    // Map form values to service request structure
    const serviceRequest: Partial<ServiceRequest> = {
      id: timestamp.getTime().toString(),
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      type: formData.serviceType,
      description: formData.description,
      budget: formData.budget ? parseFloat(formData.budget.replace(/[^0-9.-]+/g, '')) : undefined,
      deadline: formData.deadline,
      status: 'New',
      createdAt: timestamp,
      updatedAt: timestamp,
      notes: formData.additionalNotes ? [formData.additionalNotes] : undefined,
      attachments: formData.attachments,
    };

    // Trigger n8n workflow
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestId: serviceRequest.id,
          submittedAt: timestamp.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }
    } catch (webhookError) {
      console.error('Error triggering n8n webhook:', webhookError);
      // Continue even if webhook fails
    }

    // Add CORS headers to the response
    return NextResponse.json(serviceRequest, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error processing service request:', error);
    return NextResponse.json(
      { error: 'Failed to process service request' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
} 