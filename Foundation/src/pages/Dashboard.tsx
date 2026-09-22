import SummaryCard from "../components/SummaryCard";
import {
  dashboardStats,
  serviceRequests,
} from "../data/mockdata";

const Dashboard = () => {
  return (
    <div className="page-content">
      <div className="summary-grid">
        <SummaryCard
          title="Total Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          icon="👥"
          description="+12% from last month"
        />

        <SummaryCard
          title="Active Services"
          value={dashboardStats.activeServices}
          icon="⚡"
          description="+8% from last month"
        />

        <SummaryCard
          title="Pending Requests"
          value={dashboardStats.pendingRequests}
          icon="⏳"
          description="5 new today"
        />

        <SummaryCard
          title="Revenue"
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          icon="💰"
          description="+15% from last month"
        />
      </div>

      <div className="section-card">
        <div className="section-header">
          <div>
            <h2>Recent Service Requests</h2>

            <p>
              Latest service requests from customers
            </p>
          </div>

          <button className="view-all-btn">
            View All
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="table-customer">
                      <div className="small-avatar">
                        {request.customer.charAt(0)}
                      </div>

                      <span>
                        {request.customer}
                      </span>
                    </div>
                  </td>

                  <td>{request.service}</td>

                  <td>{request.date}</td>

                  <td>
                    <span
                      className={`status ${request.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;