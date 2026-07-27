export type LeadInput = {
  id?: string;

  name?: string;
  customer_name?: string;

  mobile?: string;
  mobile_number?: string;

  vehicle?: string;
  vehicle_number?: string;

  insurance?: string;
  insurance_type?: string;

  status?: string;
  assigned_to?: string | null;

  followup_date?: string | null;
  followUpDate?: string | null;

  notes?: string | null;
};

export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function cleanMobile(value: unknown): string {
  return cleanText(value).replace(/\D/g, "");
}

export function cleanVehicle(value: unknown): string | null {
  const vehicle = cleanText(value)
    .replace(/\s+/g, "")
    .toUpperCase();

  return vehicle || null;
}

export function formatLead(lead: Record<string, unknown>) {
  return {
    id: lead.id,

    name: lead.customer_name,
    customer_name: lead.customer_name,

    mobile: lead.mobile_number,
    mobile_number: lead.mobile_number,

    vehicle: lead.vehicle_number,
    vehicle_number: lead.vehicle_number,

    insurance: lead.insurance_type,
    insurance_type: lead.insurance_type,

    status: lead.status,
    assigned_to: lead.assigned_to,
    followup_date: lead.followup_date,
    notes: lead.notes,

    deleted: lead.deleted,

    date: lead.created_at,
    created_at: lead.created_at,
    updated_at: lead.updated_at,
  };
}

export function isDuplicateError(error: {
  code?: string;
  message?: string;
}): boolean {
  return (
    error.code === "23505" ||
    error.message?.toLowerCase().includes("duplicate") === true
  );
}