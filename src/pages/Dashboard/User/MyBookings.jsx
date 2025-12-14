import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        toast.error("You must be logged in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.get(
          `http://localhost:3000/bookings/${encodeURIComponent(user.email)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error?.response || error);
        toast.error("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const token = localStorage.getItem("access-token");
      await axios.delete(`http://localhost:3000/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success("Booking deleted successfully.");
    } catch (error) {
      console.error("Error deleting booking:", error?.response || error);
      toast.error("Failed to delete booking.");
    }
  };

  // Update booking status
  const handleUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("access-token");
      const res = await axios.patch(
        `http://localhost:3000/bookings/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: res.data.status } : b))
      );
      toast.success("Booking updated successfully.");
    } catch (error) {
      console.error("Error updating booking:", error?.response || error);
      toast.error("Failed to update booking.");
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount (USD)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.serviceTitle || booking.service}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        booking.status === "Paid"
                          ? "bg-green-500"
                          : booking.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>{booking.amount || booking.price}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(booking._id, "Paid")}
                      className="btn btn-sm btn-success"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
