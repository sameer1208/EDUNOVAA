import {
  useMemo,
  useState,
} from "react";

import CustomerModal from "../components/CustomerMoal";

import {
  customers as initialCustomers,
  type Customer,
} from "../data/mockdata";

interface NewCustomer {
  name: string;
  email: string;
  phone: string;
  service: string;
}

const Customers = () => {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] =
    useState<string>("");

  const [statusFilter, setStatusFilter] =
    useState<string>("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [showAddModal, setShowAddModal] =
    useState<boolean>(false);

  const [newCustomer, setNewCustomer] =
    useState<NewCustomer>({
      name: "",
      email: "",
      phone: "",
      service: "",
    });

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(searchValue) ||
        customer.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [customers, search, statusFilter]);

  const handleAddCustomer = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.phone.trim() ||
      !newCustomer.service.trim()
    ) {
      return;
    }

    const customer: Customer = {
      id: Date.now(),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      service: newCustomer.service,
      status: "Active",
      joinedDate: new Date()
        .toISOString()
        .split("T")[0],
    };

    setCustomers((previous) => [
      customer,
      ...previous,
    ]);

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      service: "",
    });

    setShowAddModal(false);
  };

  const handleNewCustomerChange = (
    field: keyof NewCustomer,
    value: string
  ) => {
    setNewCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="page-content">
      <div className="section-card">
        <div className="customer-toolbar">
          <div>
            <h2>Customers</h2>

            <p>
              Manage all your customers
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            + Add Customer
          </button>
        </div>

        <div className="filters">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(
              event: React.ChangeEvent<HTMLSelectElement>
            ) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

            <option value="Pending">
              Pending
            </option>
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(
                  (customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="table-customer">
                          <div className="small-avatar">
                            {customer.name.charAt(
                              0
                            )}
                          </div>

                          <span>
                            {customer.name}
                          </span>
                        </div>
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {customer.phone}
                      </td>

                      <td>
                        {customer.service}
                      </td>

                      <td>
                        <span
                          className={`status ${customer.status.toLowerCase()}`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="details-btn"
                          onClick={() =>
                            setSelectedCustomer(
                              customer
                            )
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="empty-state"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerModal
        customer={selectedCustomer}
        onClose={() =>
          setSelectedCustomer(null)
        }
      />

      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >
          <div
            className="customer-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>Add Customer</h2>

                <p>
                  Create a new customer
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleAddCustomer}
            >
              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  placeholder="Customer name"
                  value={newCustomer.name}
                  onChange={(event) =>
                    handleNewCustomerChange(
                      "name",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="Customer email"
                  value={newCustomer.email}
                  onChange={(event) =>
                    handleNewCustomerChange(
                      "email",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="text"
                  placeholder="Phone number"
                  value={newCustomer.phone}
                  onChange={(event) =>
                    handleNewCustomerChange(
                      "phone",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Service</label>

                <input
                  type="text"
                  placeholder="Service"
                  value={newCustomer.service}
                  onChange={(event) =>
                    handleNewCustomerChange(
                      "service",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;