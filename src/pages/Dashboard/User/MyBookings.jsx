import React from "react";

const MyBookings = () => {
  // Example dummy data
  const bookings = [
    {
      id: "BK001",
      service: "Wedding Decoration",
      date: "2025-12-20",
      status: "Planning",
      amount: 50000,
    },
    {
      id: "BK002",
      service: "Home Party Decoration",
      date: "2025-12-25",
      status: "Assigned",
      amount: 15000,
    },
  ];

  return (
    <div className="p-6 ">
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
                <th>Amount (BDT)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.service}</td>
                  <td>{booking.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        booking.status === "Completed"
                          ? "bg-green-500"
                          : booking.status === "Assigned"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>{booking.amount}</td>
                  <td>
                    <button className="btn btn-sm btn-primary mr-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-error">Cancel</button>
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
