"use client";

import { useEffect, useState } from "react";

interface Lead {
  name: string;
  mobile: string;
  vehicle: string;
  insurance: string;
  date: string;
  status?: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [editingLead, setEditingLead] =
    useState<Lead | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    mobile: "",
    vehicle: "",
    insurance: "",
  });

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
    const updateStatus = (index: number) => {
    const updated = [...leads];

    updated[index].status =
      updated[index].status === "Done"
        ? "Pending"
        : "Done";

    setLeads(updated);
  };

  const saveEdit = () => {
    if (!editingLead) return;

    const updated = leads.map((lead) =>
      lead.mobile === editingLead.mobile
        ? {
            ...lead,
            name: editForm.name,
            mobile: editForm.mobile,
            vehicle: editForm.vehicle,
            insurance: editForm.insurance,
          }
        : lead
    );

    setLeads(updated);
    setEditingLead(null);
  };

  const deleteLead = (index: number) => {
    if (!confirm("Delete this lead?")) return;

    setLeads(leads.filter((_, i) => i !== index));
  };

  const today = new Date().toISOString().slice(0, 10);

  const todayLeads = leads.filter((lead) =>
    lead.date?.startsWith(today)
  ).length;

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase();

    return (
      lead.name.toLowerCase().includes(q) ||
      lead.mobile.includes(q) ||
      lead.vehicle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

  <h1 className="text-5xl font-bold mb-10">
    Shiv Consultancy CRM Dashboard
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

    <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
      <p>Total Leads</p>
      <h2 className="text-5xl font-bold mt-3">
        {leads.length}
      </h2>
    </div>

    <div className="bg-green-600 text-white rounded-xl p-6 shadow">
      <p>Today's Leads</p>
      <h2 className="text-5xl font-bold mt-3">
        {todayLeads}
      </h2>
    </div>

    <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
      <p>Pending</p>
      <h2 className="text-5xl font-bold mt-3">
        {leads.filter((l) => l.status !== "Done").length}
      </h2>
    </div>

    <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
      <p>Policy Done</p>
      <h2 className="text-5xl font-bold mt-3">
        {leads.filter((l) => l.status === "Done").length}
      </h2>
    </div>

  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">

    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

      <h2 className="text-3xl font-bold">
        Recent Leads
      </h2>

      <input
        type="text"
        placeholder="Search Name / Mobile / Vehicle..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-3 w-full md:w-80"
      />

    </div>

    {loading ? (

      <div className="text-center py-10">
        Loading...
      </div>

    ) : (

      <table className="w-full border-collapse">

        <thead className="bg-blue-700 text-white">

          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Vehicle</th>
            <th className="p-3">Insurance</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>

        </thead>

        <tbody>
          {filteredLeads.map((lead, index) => (
  <tr
    key={index}
    className="border-b hover:bg-gray-50 text-center"
  >
    <td className="p-3">{lead.name}</td>

    <td className="p-3">
      <a
        href={`tel:${lead.mobile}`}
        className="text-blue-600 hover:underline"
      >
        {lead.mobile}
      </a>
    </td>

    <td className="p-3">{lead.vehicle}</td>

    <td className="p-3">{lead.insurance}</td>

    <td className="p-3">
      <button
        onClick={() => updateStatus(index)}
        className={
          lead.status === "Done"
            ? "bg-green-600 text-white px-3 py-1 rounded-full"
            : "bg-yellow-500 text-white px-3 py-1 rounded-full"
        }
      >
        {lead.status || "Pending"}
      </button>
    </td>

    <td className="p-3">
      <div className="flex flex-wrap justify-center gap-2">

        <button
          onClick={() => setSelectedLead(lead)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          Details
        </button>

        <button
          onClick={() => {
            setEditingLead(lead);
            setEditForm({
              name: lead.name,
              mobile: lead.mobile,
              vehicle: lead.vehicle,
              insurance: lead.insurance,
            });
          }}
          className="bg-indigo-600 text-white px-3 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => deleteLead(index)}
          className="bg-red-600 text-white px-3 py-2 rounded-lg"
        >
          Delete
        </button>

        <a
          href={`https://wa.me/91${lead.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-3 py-2 rounded-lg"
        >
          WhatsApp
        </a>

        <a
          href={`tel:${lead.mobile}`}
          className="bg-orange-500 text-white px-3 py-2 rounded-lg"
        >
          Call
        </a>

      </div>
    </td>
  </tr>
))}

        </tbody>
      </table>
    )}
  </div>
  {selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-6">
        Lead Details
      </h2>

      <div className="space-y-4">
        <p><strong>Name:</strong> {selectedLead.name}</p>
        <p><strong>Mobile:</strong> {selectedLead.mobile}</p>
        <p><strong>Vehicle:</strong> {selectedLead.vehicle}</p>
        <p><strong>Insurance:</strong> {selectedLead.insurance}</p>
        <p><strong>Date:</strong> {new Date(selectedLead.date).toLocaleString()}</p>
        <p><strong>Status:</strong> {selectedLead.status || "Pending"}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <a
          href={`tel:${selectedLead.mobile}`}
          className="bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          📞 Call
        </a>

        <a
          href={`https://wa.me/91${selectedLead.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white text-center py-3 rounded-lg"
        >
          💬 WhatsApp
        </a>
      </div>

      <button
        onClick={() => setSelectedLead(null)}
        className="w-full mt-5 bg-red-600 text-white py-3 rounded-lg"
      >
        Close
      </button>

    </div>
  </div>
)}

{editingLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-6">
        Edit Lead
      </h2>

      <input
        className="border rounded-lg p-3 w-full mb-3"
        value={editForm.name}
        onChange={(e) =>
          setEditForm({ ...editForm, name: e.target.value })
        }
        placeholder="Customer Name"
      />

      <input
        className="border rounded-lg p-3 w-full mb-3"
        value={editForm.mobile}
        onChange={(e) =>
          setEditForm({ ...editForm, mobile: e.target.value })
        }
        placeholder="Mobile Number"
      />

      <input
        className="border rounded-lg p-3 w-full mb-3"
        value={editForm.vehicle}
        onChange={(e) =>
          setEditForm({ ...editForm, vehicle: e.target.value })
        }
        placeholder="Vehicle Number"
      />

      <input
        className="border rounded-lg p-3 w-full mb-6"
        value={editForm.insurance}
        onChange={(e) =>
          setEditForm({ ...editForm, insurance: e.target.value })
        }
        placeholder="Insurance Type"
      />

      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={saveEdit}
          className="bg-green-600 text-white py-3 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={() => setEditingLead(null)}
          className="bg-gray-500 text-white py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}

</div>
  );
}