import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type LeadInput = {
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

  followup_time?: string | null;
  followUpTime?: string | null;

  followup_note?: string | null;
  followUpNote?: string | null;

  notes?: string | null;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatLead(lead: Record<string, unknown>) {
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
    followUpDate: lead.followup_date,

    followup_time: lead.followup_time,
    followUpTime: lead.followup_time,

    followup_note: lead.followup_note,
    followUpNote: lead.followup_note,

    notes: lead.notes,

    deleted: lead.deleted,

    date: lead.created_at,
    created_at: lead.created_at,
    updated_at: lead.updated_at,
  };
}

async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
    error,
  };
}

/* =========================================
   GET LEADS
========================================= */

export async function GET() {
  try {
    const { supabase, user, error: authError } =
      await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    const leads = (data ?? []).map((lead) =>
      formatLead(lead as Record<string, unknown>)
    );

    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET leads error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load leads.",
      },
      { status: 500 }
    );
  }
}

/* =========================================
   ADD LEAD
========================================= */

export async function POST(request: Request) {
  try {
    const { supabase, user, error: authError } =
      await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as LeadInput;

    const customerName = cleanText(
      body.customer_name ?? body.name
    );

    const mobileNumber = cleanText(
      body.mobile_number ?? body.mobile
    ).replace(/\D/g, "");

    const vehicleNumber =
      cleanText(body.vehicle_number ?? body.vehicle)
        .replace(/\s+/g, "")
        .toUpperCase() || null;

    const insuranceType =
      cleanText(body.insurance_type ?? body.insurance) ||
      null;

    const followupDate =
      body.followup_date ?? body.followUpDate ?? null;

    const followupTime =
      body.followup_time ?? body.followUpTime ?? null;

    const followupNote =
      cleanText(
        body.followup_note ?? body.followUpNote
      ) || null;

    if (!customerName) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer name is required.",
        },
        { status: 400 }
      );
    }

    if (mobileNumber.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A valid 10-digit mobile number is required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        customer_name: customerName,
        mobile_number: mobileNumber,
        vehicle_number: vehicleNumber,
        insurance_type: insuranceType,
        status: cleanText(body.status) || "Pending",
        assigned_to: body.assigned_to || null,
        followup_date: followupDate || null,
        followup_time: followupTime || null,
        followup_note: followupNote,
        notes: cleanText(body.notes) || null,
        deleted: false,
      })
      .select()
      .single();

    if (error) {
      const duplicate =
        error.code === "23505" ||
        error.message
          .toLowerCase()
          .includes("duplicate");

      return NextResponse.json(
        {
          success: false,
          message: duplicate
            ? "A lead with the same mobile number and vehicle already exists."
            : error.message,
        },
        { status: duplicate ? 409 : 500 }
      );
    }

    await supabase.from("lead_activities").insert({
      lead_id: data.id,
      user_id: user.id,
      action: "LEAD_CREATED",
      remarks: `Lead created for ${customerName}`,
    });

    if (followupDate) {
      await supabase.from("lead_activities").insert({
        lead_id: data.id,
        user_id: user.id,
        action: "FOLLOWUP_SCHEDULED",
        remarks: `Follow-up scheduled for ${followupDate}${
          followupTime ? ` at ${followupTime}` : ""
        }`,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead added successfully.",
        lead: formatLead(
          data as Record<string, unknown>
        ),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST lead error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add lead.",
      },
      { status: 500 }
    );
  }
}

/* =========================================
   EDIT / STATUS / ASSIGN / FOLLOW-UP / NOTES
========================================= */

export async function PUT(request: Request) {
  try {
    const { supabase, user, error: authError } =
      await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as LeadInput;

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required.",
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (
      body.customer_name !== undefined ||
      body.name !== undefined
    ) {
      const customerName = cleanText(
        body.customer_name ?? body.name
      );

      if (!customerName) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Customer name cannot be empty.",
          },
          { status: 400 }
        );
      }

      updateData.customer_name = customerName;
    }

    if (
      body.mobile_number !== undefined ||
      body.mobile !== undefined
    ) {
      const mobileNumber = cleanText(
        body.mobile_number ?? body.mobile
      ).replace(/\D/g, "");

      if (mobileNumber.length !== 10) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A valid 10-digit mobile number is required.",
          },
          { status: 400 }
        );
      }

      updateData.mobile_number = mobileNumber;
    }

    if (
      body.vehicle_number !== undefined ||
      body.vehicle !== undefined
    ) {
      updateData.vehicle_number =
        cleanText(
          body.vehicle_number ?? body.vehicle
        )
          .replace(/\s+/g, "")
          .toUpperCase() || null;
    }

    if (
      body.insurance_type !== undefined ||
      body.insurance !== undefined
    ) {
      updateData.insurance_type =
        cleanText(
          body.insurance_type ?? body.insurance
        ) || null;
    }

    if (body.status !== undefined) {
      updateData.status =
        cleanText(body.status) || "Pending";
    }

    if (body.assigned_to !== undefined) {
      updateData.assigned_to =
        body.assigned_to || null;
    }

    if (
      body.followup_date !== undefined ||
      body.followUpDate !== undefined
    ) {
      updateData.followup_date =
        body.followup_date ??
        body.followUpDate ??
        null;
    }

    if (
      body.followup_time !== undefined ||
      body.followUpTime !== undefined
    ) {
      updateData.followup_time =
        body.followup_time ??
        body.followUpTime ??
        null;
    }

    if (
      body.followup_note !== undefined ||
      body.followUpNote !== undefined
    ) {
      updateData.followup_note =
        cleanText(
          body.followup_note ??
            body.followUpNote
        ) || null;
    }

    if (body.notes !== undefined) {
      updateData.notes =
        cleanText(body.notes) || null;
    }

    const { data, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", body.id)
      .eq("deleted", false)
      .select()
      .single();

    if (error) {
      const duplicate =
        error.code === "23505" ||
        error.message
          .toLowerCase()
          .includes("duplicate");

      return NextResponse.json(
        {
          success: false,
          message: duplicate
            ? "A lead with the same mobile number and vehicle already exists."
            : error.message,
        },
        { status: duplicate ? 409 : 500 }
      );
    }

    let activityAction = "LEAD_UPDATED";
    let activityRemarks =
      "Lead details or status updated";

    const followupChanged =
      body.followup_date !== undefined ||
      body.followUpDate !== undefined ||
      body.followup_time !== undefined ||
      body.followUpTime !== undefined ||
      body.followup_note !== undefined ||
      body.followUpNote !== undefined;

    if (followupChanged) {
      const updatedFollowupDate =
        body.followup_date ??
        body.followUpDate ??
        data.followup_date;

      const updatedFollowupTime =
        body.followup_time ??
        body.followUpTime ??
        data.followup_time;

      activityAction = "FOLLOWUP_UPDATED";

      activityRemarks = updatedFollowupDate
        ? `Follow-up updated for ${updatedFollowupDate}${
            updatedFollowupTime
              ? ` at ${updatedFollowupTime}`
              : ""
          }`
        : "Follow-up details updated";
    }

    await supabase.from("lead_activities").insert({
      lead_id: body.id,
      user_id: user.id,
      action: activityAction,
      remarks: activityRemarks,
    });

    return NextResponse.json({
      success: true,
      message: followupChanged
        ? "Follow-up updated successfully."
        : "Lead updated successfully.",
      lead: formatLead(
        data as Record<string, unknown>
      ),
    });
  } catch (error) {
    console.error("PUT lead error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update lead.",
      },
      { status: 500 }
    );
  }
}

/* =========================================
   SOFT DELETE
========================================= */

export async function DELETE(request: Request) {
  try {
    const { supabase, user, error: authError } =
      await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      id?: string;
      reason?: string;
    };

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .update({
        deleted: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .eq("deleted", false)
      .select("id, customer_name")
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    await supabase.from("lead_activities").insert({
      lead_id: body.id,
      user_id: user.id,
      action: "LEAD_DELETED",
      remarks:
        cleanText(body.reason) ||
        `Lead moved to trash: ${data.customer_name}`,
    });

    return NextResponse.json({
      success: true,
      message:
        "Lead moved to Trash successfully.",
      id: data.id,
    });
  } catch (error) {
    console.error("DELETE lead error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete lead.",
      },
      { status: 500 }
    );
  }
}