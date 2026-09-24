import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
} from "react-icons/fi";

import CustomerModal from "../../components/customer/CustomerModal";

import {
  customers as initialCustomers,
  type Customer,
} from "../../data/mockdata";

import "./Customers.css";

interface NewCustomer {
  name: string;
  email: string;
  phone: string;
  service: string;
}

type FormErrors = Partial<Record<keyof NewCustomer, string>>;

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All");

  type CustomerSortField =
    | "name"
    | "email"
    | "phone"
    | "service"
    | "joinedDate"
    | "status";

  const [sortField, setSortField] = useState<CustomerSortField>("joinedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [submitted, setSubmitted] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLInputElement>(null);

  const filteredCustomers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    const result = customers.filter((customer) => {
      const matchesSearch =
        !searchValue ||
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue) ||
        customer.service.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      const comparison = String(a[sortField]).localeCompare(
        String(b[sortField]),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        },
      );

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [customers, search, statusFilter, sortField, sortDirection]);

  const handleSort = (field: CustomerSortField) => {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection(field === "joinedDate" ? "desc" : "asc");
  };

  const sortIcon = (field: CustomerSortField) => {
    if (sortField !== field) {
      return null;
    }

    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const validateField = (field: keyof NewCustomer, value: string): string => {
    const trimmedValue = value.trim();

    switch (field) {
      case "name":
        if (!trimmedValue) {
          return "Customer name is required";
        }

        if (trimmedValue.length < 2) {
          return "Name must contain at least 2 characters";
        }

        if (!/^[a-zA-Z\s.'-]+$/.test(trimmedValue)) {
          return "Please enter a valid name";
        }

        return "";

      case "email":
        if (!trimmedValue) {
          return "Email address is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
          return "Please enter a valid email address";
        }

        return "";

      case "phone":
        if (!trimmedValue) {
          return "Phone number is required";
        }

        if (!/^\d+$/.test(trimmedValue)) {
          return "Phone number must contain digits only";
        }

        if (trimmedValue.length !== 10) {
          return "Phone number must be exactly 10 digits";
        }

        return "";

      case "service":
        if (!trimmedValue) {
          return "Service is required";
        }

        if (trimmedValue.length < 2) {
          return "Service name is too short";
        }

        return "";

      default:
        return "";
    }
  };

  const validateForm = (): FormErrors => {
    const formErrors: FormErrors = {};

    (Object.keys(newCustomer) as Array<keyof NewCustomer>).forEach((field) => {
      const error = validateField(field, newCustomer[field]);

      if (error) {
        formErrors[field] = error;
      }
    });

    return formErrors;
  };

  const focusFirstError = (formErrors: FormErrors) => {
    if (formErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (formErrors.email) {
      emailRef.current?.focus();
      return;
    }

    if (formErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (formErrors.service) {
      serviceRef.current?.focus();
    }
  };

  const handleAddCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    const formErrors = validateForm();

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setTimeout(() => {
        focusFirstError(formErrors);
      }, 0);

      return;
    }

    const customer: Customer = {
      id: Date.now(),
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim(),
      service: newCustomer.service.trim(),
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setCustomers((previous) => [customer, ...previous]);

    resetCustomerForm();

    setShowAddModal(false);
  };

  const handleNewCustomerChange = (field: keyof NewCustomer, value: string) => {
    let updatedValue = value;

    if (field === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setNewCustomer((previous) => ({
      ...previous,
      [field]: updatedValue,
    }));

    if (submitted || errors[field]) {
      const error = validateField(field, updatedValue);

      setErrors((previous) => {
        const updatedErrors = {
          ...previous,
        };

        if (error) {
          updatedErrors[field] = error;
        } else {
          delete updatedErrors[field];
        }

        return updatedErrors;
      });
    }
  };

  const resetCustomerForm = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      service: "",
    });

    setErrors({});
    setSubmitted(false);
  };

  const openAddModal = () => {
    resetCustomerForm();
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    resetCustomerForm();
    setShowAddModal(false);
  };

  useEffect(() => {
    if (showAddModal) {
      const timer = setTimeout(() => {
        nameRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showAddModal]);

  useEffect(() => {
    if (!showAddModal) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAddModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAddModal]);

  return (
    <div className="page-content customers-page">
      {/* ======================================
          MAIN CARD
      ======================================= */}

      <div className="section-card">
        {/* HEADER */}
        <div className="customer-toolbar">
          <div className="page-heading">
            <div className="page-heading-icon">
              <FiUsers />
            </div>

            <div>
              <h2>Customers</h2>

              <p>Manage and view all your customers</p>
            </div>
          </div>

          <button
            type="button"
            className="primary-btn add-customer-btn"
            onClick={openAddModal}
          >
            <FiPlus />
            <span>Add Customer</span>
          </button>
        </div>

        {/* ====================================
            FILTERS
        ===================================== */}

        <div className="filters">
          {/* SEARCH */}
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search by name, email, phone or service..."
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* STATUS FILTER */}
          <div className="filter-select-wrapper">
            <FiFilter />

            <select
              value={statusFilter}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>

              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* ====================================
            RESULTS
        ===================================== */}

        <div className="customer-results">
          <span>
            Showing <strong>{filteredCustomers.length}</strong> of{" "}
            <strong>{customers.length}</strong> customers
          </span>
        </div>

        {/* ====================================
            TABLE
        ===================================== */}
        <div className="table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                {[
                  ["name", "Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["service", "Service"],
                  ["joinedDate", "Joined Date"],
                  ["status", "Status"],
                ].map(([field, label]) => (
                  <th key={field}>
                    <button
                      type="button"
                      onClick={() => handleSort(field as CustomerSortField)}
                      style={{
                        border: 0,
                        background: "transparent",
                        padding: 0,
                        font: "inherit",
                        color: "inherit",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                      {sortIcon(field as CustomerSortField)}
                    </button>
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    {/* NAME */}
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          minWidth: "160px",
                        }}
                      >
                        <div className="small-avatar">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>

                        <span
                          style={{
                            fontWeight: 600,
                            color: "#111827",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {customer.name}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>
                      <div className="table-contact">
                        <FiMail />
                        <span>{customer.email}</span>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td>
                      <div className="table-contact">
                        <FiPhone />
                        <span>{customer.phone}</span>
                      </div>
                    </td>

                    {/* SERVICE */}
                    <td>
                      <div className="table-contact">
                        <FiBriefcase />
                        <span>{customer.service}</span>
                      </div>
                    </td>

                    {/* JOINED DATE */}
                    <td>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {customer.joinedDate}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status ${customer.status.toLowerCase()}`}
                      >
                        <span className="status-dot" />
                        {customer.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      <button
                        type="button"
                        className="details-btn"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <FiEye />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-state">
                    <div className="empty-state-content">
                      <div className="empty-state-icon">
                        <FiUsers />
                      </div>

                      <h3>No customers found</h3>

                      <p>Try changing your search or filter.</p>

                      {(search || statusFilter !== "All") && (
                        <button
                          type="button"
                          className="clear-filter-btn"
                          onClick={() => {
                            setSearch("");
                            setStatusFilter("All");
                          }}
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================
          CUSTOMER DETAILS MODAL
      ======================================= */}

      <CustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

      {/* ======================================
          ADD CUSTOMER MODAL
      ======================================= */}

      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div
            className="customer-modal add-customer-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <div className="modal-icon">
                  <FiUser />
                </div>

                <div>
                  <h2>Add Customer</h2>
                  <p>Add a new customer to your database</p>
                </div>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={closeAddModal}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleAddCustomer} noValidate>
              <div className="modal-form">
                {/* NAME */}
                <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="customer-name">
                    Customer Name <span>*</span>
                  </label>

                  <div>
                    <div className="input-wrapper">
                      <FiUser />

                      <input
                        ref={nameRef}
                        id="customer-name"
                        type="text"
                        placeholder="Enter customer name"
                        value={newCustomer.name}
                        onChange={(event) =>
                          handleNewCustomerChange("name", event.target.value)
                        }
                        aria-invalid={!!errors.name}
                      />
                    </div>

                    {errors.name && (
                      <div className="field-error">
                        <FiAlertCircle />
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div
                  className={`form-group ${errors.email ? "has-error" : ""}`}
                >
                  <label htmlFor="customer-email">
                    Email Address <span>*</span>
                  </label>

                  <div>
                    <div className="input-wrapper">
                      <FiMail />

                      <input
                        ref={emailRef}
                        id="customer-email"
                        type="email"
                        placeholder="Enter email address"
                        value={newCustomer.email}
                        onChange={(event) =>
                          handleNewCustomerChange("email", event.target.value)
                        }
                        aria-invalid={!!errors.email}
                      />
                    </div>

                    {errors.email && (
                      <div className="field-error">
                        <FiAlertCircle />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* PHONE */}
                <div
                  className={`form-group ${errors.phone ? "has-error" : ""}`}
                >
                  <label htmlFor="customer-phone">
                    Phone Number <span>*</span>
                  </label>

                  <div>
                    <div className="input-wrapper">
                      <FiPhone />

                      <input
                        ref={phoneRef}
                        id="customer-phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="Enter 10-digit phone number"
                        value={newCustomer.phone}
                        onChange={(event) =>
                          handleNewCustomerChange("phone", event.target.value)
                        }
                        maxLength={10}
                        aria-invalid={!!errors.phone}
                      />
                    </div>

                    <div className="input-hint">Enter exactly 10 digits</div>

                    {errors.phone && (
                      <div className="field-error">
                        <FiAlertCircle />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* SERVICE */}
                <div
                  className={`form-group ${errors.service ? "has-error" : ""}`}
                >
                  <label htmlFor="customer-service">
                    Service <span>*</span>
                  </label>

                  <div>
                    <div className="input-wrapper">
                      <FiBriefcase />

                      <input
                        ref={serviceRef}
                        id="customer-service"
                        type="text"
                        placeholder="Enter service"
                        value={newCustomer.service}
                        onChange={(event) =>
                          handleNewCustomerChange("service", event.target.value)
                        }
                        aria-invalid={!!errors.service}
                      />
                    </div>

                    {errors.service && (
                      <div className="field-error">
                        <FiAlertCircle />
                        {errors.service}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeAddModal}
                >
                  <FiX />
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  <FiCheckCircle />
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
