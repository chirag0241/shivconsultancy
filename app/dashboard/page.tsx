"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import Sidebar from "../components/Sidebar";

interface Lead {
  id: string;
  name: string;
  mobile: string;
  vehicle: string;
  insurance: string;
  date: string;
  status?: string;
  notes?: string | null;

  followup_date?: string | null;
  followup_time?: string | null;
  followup_note?: string | null;
}

interface LeadForm {
  name: string;
  mobile: string;
  vehicle: string;
  insurance: string;
  status: string;
  notes: string;

  followup_date: string;
  followup_time: string;
  followup_note: string;
}

const emptyForm: LeadForm = {
  name: "",
  mobile: "",
  vehicle: "",
  insurance: "",
  status: "Pending",
  notes: "",

  followup_date: "",
  followup_time: "",
  followup_note: "",
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

const [userName, setUserName] = useState("Nikita Bhavsar");
const [userEmail, setUserEmail] = useState("");
const [userMobile, setUserMobile] = useState("");
const [userRole, setUserRole] = useState("Admin");

const [profileLoading, setProfileLoading] = useState(true);
const [profileSaving, setProfileSaving] = useState(false);
const [showProfileModal, setShowProfileModal] = useState(false);
const [loggingOut, setLoggingOut] = useState(false);

const [profileForm, setProfileForm] = useState({
  full_name: "",
  mobile: "",
});

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [editingLead, setEditingLead] =
    useState<Lead | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [addForm, setAddForm] =
    useState<LeadForm>(emptyForm);

  const [editForm, setEditForm] =
    useState<LeadForm>(emptyForm);

  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/leads", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load leads."
        );
      }

      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load leads."
      );
    } finally {
      setLoading(false);
    }
  }, []);

const loadUserProfile = useCallback(async () => {
  try {
    setProfileLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      window.location.replace("/login");
      return;
    }

    const email = user.email || "";
    setUserEmail(email);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, mobile, role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile load error:", profileError.message);
    }

    const isOwner = email === "admin@shivconsultancy.com";

    const defaultName = isOwner
      ? "Nikita Bhavsar"
      : user.user_metadata?.full_name ||
        email.split("@")[0] ||
        "Employee";

    const defaultRole = isOwner ? "Admin" : "Employee";

    const finalName = profile?.full_name || defaultName;
    const finalMobile = profile?.mobile || "";
    const finalRole = isOwner
      ? "Admin"
      : profile?.role || defaultRole;

    setUserName(finalName);
    setUserMobile(finalMobile);
    setUserRole(finalRole);

    setProfileForm({
      full_name: finalName,
      mobile: finalMobile,
    });
  } catch (error) {
    console.error("User profile error:", error);

    setUserName("Nikita Bhavsar");
    setUserRole("Admin");
  } finally {
    setProfileLoading(false);
  }
}, []);

const openProfileModal = () => {
  setProfileForm({
    full_name: userName,
    mobile: userMobile,
  });

  setMessage("");
  setShowProfileModal(true);
};

const saveProfile = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const cleanName = profileForm.full_name.trim();
  const cleanMobile = profileForm.mobile.trim();

  if (!cleanName) {
    setMessage("Please enter your full name.");
    return;
  }

  if (cleanMobile && cleanMobile.length !== 10) {
    setMessage("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    setProfileSaving(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      window.location.replace("/login");
      return;
    }

    const role =
      user.email === "admin@shivconsultancy.com"
        ? "Admin"
        : "Employee";

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: cleanName,
        mobile: cleanMobile,
        role,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    );

    if (error) {
      throw error;
    }

    setUserName(cleanName);
    setUserMobile(cleanMobile);
    setUserRole(role);

    setShowProfileModal(false);
    setMessage("Profile updated successfully.");
  } catch (error) {
    console.error("Profile update error:", error);

    setMessage(
      error instanceof Error
        ? error.message
        : "Profile update failed. Please try again."
    );
  } finally {
    setProfileSaving(false);
  }
};

useEffect(() => {
  loadLeads();
  loadUserProfile();
}, [loadLeads, loadUserProfile]);

  const logout = async () => {
    try {
      setLoggingOut(true);
      setMessage("");

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      window.location.replace("/login");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );

      setLoggingOut(false);
    }
  };

  const addLead = async (event: FormEvent) => {
    event.preventDefault();

    if (addForm.mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setActionLoading(true);
      setMessage("");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Lead add failed."
        );
      }

      setAddForm(emptyForm);
      setShowAddModal(false);

      await loadLeads();

      setMessage("Lead added successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Lead add failed."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const saveEdit = async (event: FormEvent) => {
    event.preventDefault();

    if (!editingLead) return;

    if (editForm.mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setActionLoading(true);
      setMessage("");

      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingLead.id,
          ...editForm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Lead update failed."
        );
      }

      setEditingLead(null);

      await loadLeads();

      setMessage("Lead updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Lead update failed."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const updateStatus = async (lead: Lead) => {
    const newStatus =
      lead.status === "Done" ? "Pending" : "Done";

    try {
      setActionLoading(true);
      setMessage("");

      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Status update failed."
        );
      }

      setLeads((currentLeads) =>
        currentLeads.map((item) =>
          item.id === lead.id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      setSelectedLead((currentLead) =>
        currentLead?.id === lead.id
          ? {
              ...currentLead,
              status: newStatus,
            }
          : currentLead
      );

      setMessage(`Status changed to ${newStatus}.`);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Status update failed."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const deleteLead = async (lead: Lead) => {
    const confirmed = window.confirm(
      `${lead.name} ની Lead Trash માં મોકલવી છે?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setMessage("");

      const response = await fetch("/api/leads", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          reason: "Deleted by Boss from CRM Dashboard",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Lead delete failed."
        );
      }

      setLeads((currentLeads) =>
        currentLeads.filter(
          (item) => item.id !== lead.id
        )
      );

      setSelectedLead(null);
      setEditingLead(null);

      setMessage(
        "Lead moved to Trash successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Lead delete failed."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);

setEditForm({
  name: lead.name || "",
  mobile: lead.mobile || "",
  vehicle: lead.vehicle || "",
  insurance: lead.insurance || "",
  status: lead.status || "Pending",
  notes: lead.notes || "",

  followup_date: lead.followup_date || "",
  followup_time: lead.followup_time || "",
  followup_note: lead.followup_note || "",
});

    setMessage("");
  };

  const openAddModal = () => {
    setAddForm(emptyForm);
    setShowAddModal(true);
    setMessage("");
  };

  const today = new Date().toLocaleDateString("en-CA");

  const todayLeads = leads.filter((lead) => {
    if (!lead.date) return false;

    const leadDate = new Date(
      lead.date
    ).toLocaleDateString("en-CA");

    return leadDate === today;
  }).length;

  const pendingLeads = leads.filter(
    (lead) => lead.status !== "Done"
  ).length;

  const completedLeads = leads.filter(
    (lead) => lead.status === "Done"
  ).length;

  const filteredLeads = leads.filter((lead) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      lead.name?.toLowerCase().includes(query) ||
      lead.mobile?.includes(query) ||
      lead.vehicle?.toLowerCase().includes(query) ||
      lead.insurance?.toLowerCase().includes(query) ||
      lead.status?.toLowerCase().includes(query)
    );
  });

  const profileInitial =
    userName.trim().charAt(0).toUpperCase() || "B";

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <main className="min-w-0 flex-1 p-4 md:p-8">
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Shiv Consultancy
            </p>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              CRM Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage insurance leads, follow-ups and policy
              status
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                {profileLoading ? "..." : profileInitial}
              </div>

<div className="min-w-0">
  <div className="flex items-center gap-2">
    <p className="max-w-52 truncate font-bold text-slate-900">
      {profileLoading
        ? "Loading profile..."
        : userName}
    </p>

    {!profileLoading && (
      <button
        type="button"
        onClick={openProfileModal}
        className="text-sm text-blue-600 transition hover:text-blue-800"
        title="Edit Name"
        aria-label="Edit profile"
      >
        ✏️
      </button>
    )}
  </div>

  <p className="text-xs font-semibold capitalize text-blue-700">
    {userRole}
  </p>
</div>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              + Add New Lead
            </button>

            <button
              type="button"
              onClick={loadLeads}
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>  
        </div>
      </div>

      {message && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-800">
          <p>{message}</p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="font-bold"
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Leads"
          value={leads.length}
          className="bg-blue-600"
        />

        <DashboardCard
          title="Today's Leads"
          value={todayLeads}
          className="bg-green-600"
        />

        <DashboardCard
          title="Pending"
          value={pendingLeads}
          className="bg-yellow-500"
        />

        <DashboardCard
          title="Policy Done"
          value={completedLeads}
          className="bg-purple-600"
        />
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg md:p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Recent Leads
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredLeads.length} of{" "}
              {leads.length} leads
            </p>
          </div>

          <input
            type="text"
            placeholder="Search Name / Mobile / Vehicle..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 md:w-80"
          />
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No leads found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first lead using the Add New Lead
              button.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[1250px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-slate-50 text-left">
                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    No.
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Mobile
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Vehicle
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Insurance Type
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Added Date
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredLeads.map((lead, index) => (
                  <tr
                    key={lead.id}
                    className="transition hover:bg-blue-50/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {lead.name?.charAt(0).toUpperCase() || "C"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-48 truncate font-bold text-slate-900">
                            {lead.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            Customer Lead
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <a
                        href={`tel:${lead.mobile}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {lead.mobile}
                      </a>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium uppercase text-slate-700">
                      {lead.vehicle || "-"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                      {lead.insurance || "-"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                      {lead.date
                        ? new Date(lead.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => updateStatus(lead)}
                        className={
                          lead.status === "Done"
                            ? "rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition hover:bg-green-200 disabled:opacity-60"
                            : lead.status === "Follow-up"
                              ? "rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-200 disabled:opacity-60"
                              : lead.status === "No Response"
                                ? "rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-700 transition hover:bg-orange-200 disabled:opacity-60"
                                : lead.status === "Not Interested"
                                  ? "rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-200 disabled:opacity-60"
                                  : "rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-700 transition hover:bg-yellow-200 disabled:opacity-60"
                        }
                      >
                        {lead.status === "Done"
                          ? "Policy Done"
                          : lead.status || "Pending"}
                      </button>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                        >
                          Details
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(lead)}
                          className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => deleteLead(lead)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          Delete
                        </button>

                        <a
                          href={`https://wa.me/91${lead.mobile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100"
                        >
                          WhatsApp
                        </a>

                        <a
                          href={`tel:${lead.mobile}`}
                          className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700 transition hover:bg-orange-100"
                        >
                          Call
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <LeadModal
          title="Add New Lead"
          form={addForm}
          setForm={setAddForm}
          onSubmit={addLead}
          onClose={() => setShowAddModal(false)}
          loading={actionLoading}
          submitText="Save Lead"
        />
      )}

      {editingLead && (
        <LeadModal
          title="Edit Lead"
          form={editForm}
          setForm={setEditForm}
          onSubmit={saveEdit}
          onClose={() => setEditingLead(null)}
          loading={actionLoading}
          submitText="Save Changes"
        />
      )}

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Lead Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-2xl text-gray-500 hover:text-red-600"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 rounded-xl bg-gray-50 p-4">
              <DetailRow
                label="Name"
                value={selectedLead.name}
              />

              <DetailRow
                label="Mobile"
                value={selectedLead.mobile}
              />

              <DetailRow
                label="Vehicle"
                value={selectedLead.vehicle || "-"}
              />

              <DetailRow
                label="Insurance"
                value={selectedLead.insurance || "-"}
              />

              <DetailRow
                label="Date"
                value={
                  selectedLead.date
                    ? new Date(
                        selectedLead.date
                      ).toLocaleString()
                    : "-"
                }
              />

              <DetailRow
                label="Status"
                value={selectedLead.status || "Pending"}
              />

              <DetailRow
                label="Notes"
                value={selectedLead.notes || "-"}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={`tel:${selectedLead.mobile}`}
                className="rounded-lg bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Call
              </a>

              <a
                href={`https://wa.me/91${selectedLead.mobile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="mt-4 w-full rounded-lg bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className: string;
}) {
  return (
    <div
      className={`${className} rounded-xl p-6 text-white shadow`}
    >
      <p className="text-lg">{title}</p>

      <h2 className="mt-3 text-5xl font-bold">
        {value}
      </h2>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}

function LeadModal({
  title,
  form,
  setForm,
  onSubmit,
  onClose,
  loading,
  submitText,
}: {
  title: string;
  form: LeadForm;
  setForm: Dispatch<SetStateAction<LeadForm>>;
  onSubmit: (event: FormEvent) => void;
  onClose: () => void;
  loading: boolean;
  submitText: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <form
        onSubmit={onSubmit}
        className="my-8 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl md:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-600 disabled:opacity-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <input
            required
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="Customer Name"
          />

          <input
            required
            inputMode="numeric"
            minLength={10}
            maxLength={10}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={form.mobile}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                mobile: event.target.value.replace(
                  /\D/g,
                  ""
                ),
              }))
            }
            placeholder="10-digit Mobile Number"
          />

          <input
            className="w-full rounded-lg border border-gray-300 p-3 uppercase outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={form.vehicle}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vehicle:
                  event.target.value.toUpperCase(),
              }))
            }
            placeholder="Vehicle Number"
          />

          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={form.insurance}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                insurance: event.target.value,
              }))
            }
          >
            <option value="">
              Select Insurance Type
            </option>

            <option value="Bike Insurance">
              Bike Insurance
            </option>

            <option value="Car Insurance">
              Car Insurance
            </option>

            <option value="Health Insurance">
              Health Insurance
            </option>

            <option value="Life Insurance">
              Life Insurance
            </option>

            <option value="Commercial Insurance">
              Commercial Insurance
            </option>
          </select>

          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value,
              }))
            }
          >
            <option value="Pending">Pending</option>
            <option value="Done">Policy Done</option>
            <option value="Follow-up">Follow-up</option>
            <option value="No Response">
              No Response
            </option>
            <option value="Not Interested">
              Not Interested
            </option>
          </select>

<textarea
  className="min-h-24 w-full resize-y rounded-lg border border-gray-300 p-3"
  value={form.notes}
  onChange={(event) =>
    setForm((current) => ({
      ...current,
      notes: event.target.value,
    }))
  }
  placeholder="Notes"
/>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Follow-up Date
    </label>

    <input
      type="date"
      className="w-full rounded-lg border border-gray-300 p-3"
      value={form.followup_date}
      onChange={(event) =>
        setForm((current) => ({
          ...current,
          followup_date: event.target.value,
        }))
      }
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Follow-up Time
    </label>

    <input
      type="time"
      className="w-full rounded-lg border border-gray-300 p-3"
      value={form.followup_time}
      onChange={(event) =>
        setForm((current) => ({
          ...current,
          followup_time: event.target.value,
        }))
      }
    />
  </div>
</div>

<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Follow-up Note
  </label>

  <textarea
  className="min-h-20 w-full rounded-lg border border-gray-300 p-3"
  value={form.followup_note}
  onChange={(event) =>
    setForm((current) => ({
      ...current,
      followup_note: event.target.value,
    }))
  }
  placeholder="Customer requested callback..."
/>
</div>

</div>

<div className="mt-6 grid grid-cols-2 gap-3">
  <button
    type="submit"
    disabled={loading}
    className="rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? "Saving..." : submitText}
  </button>

  <button
    type="button"
    disabled={loading}
    onClick={onClose}
    className="rounded-lg bg-gray-500 py-3 font-semibold text-white hover:bg-gray-600 disabled:opacity-60"
  >
    Cancel
  </button>
</div>
</form>
</div>
);
}