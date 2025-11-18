"use client";

import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, ArrowUpDown, Filter, Loader2, ExternalLink } from "lucide-react";

interface HansardRecord {
  id: number;
  date: string;
  emoji: string;
  subject: string;
  subjecturl: string;
  type: string;
  summary: string;
  house: string;
}

export default function SpeechesPage() {
  const [records, setRecords] = useState<HansardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof HansardRecord>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Fetch Hansard records from API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.jaxius.net/bw/hansard", {
          headers: {
            "x-api-key": "tillyisasexybitch",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Hansard records");
        }

        const data = await response.json();
        console.log(`Fetched ${data.length} Hansard records from API`);
        setRecords(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Get unique types for filter
  const uniqueTypes = useMemo(() => {
    const types = new Set(records.map((r) => r.type));
    return Array.from(types).sort();
  }, [records]);

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let filtered = records;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((record) => record.type === typeFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Convert dates to timestamps for comparison
      if (sortField === "date") {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [records, searchTerm, typeFilter, sortField, sortDirection]);

  // Toggle sort
  const handleSort = (field: keyof HansardRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Parliamentary Speeches
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse and search Hansard records from the WA Legislative Council
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-6 mb-8 border border-[#00653b]/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by subject or summary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#00653b]/20 focus:outline-none focus:ring-2 focus:ring-[#6cc24a] bg-white"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-xl border border-[#00653b]/20 focus:outline-none focus:ring-2 focus:ring-[#6cc24a] bg-white appearance-none cursor-pointer min-w-[200px]"
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredRecords.length} of {records.length} records
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#00653b]" />
              <span className="ml-3 text-xl text-gray-600">Loading Hansard records...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-800 font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#00653b]/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white">
                    <tr>
                      <th
                        className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center gap-2">
                          Date
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center">📄</th>
                      <th
                        className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleSort("subject")}
                      >
                        <div className="flex items-center gap-2">
                          Subject
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleSort("type")}
                      >
                        <div className="flex items-center gap-2">
                          Type
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-[#00653b]/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 py-4 text-center text-2xl">
                          {record.emoji}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={record.subjecturl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00653b] hover:text-[#6cc24a] font-semibold flex items-center gap-2 transition-colors"
                          >
                            {record.subject}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {record.summary}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#6cc24a]/10 text-[#00653b] border border-[#6cc24a]/20">
                            {record.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No Results */}
              {filteredRecords.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No records found matching your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
