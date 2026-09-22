import { useEffect } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";

import type { Customer } from "../data/mockdata";
import "./Customers.css";

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerModal = ({ customer, onClose }: CustomerModalProps) => {
  useEffect(() => {
    if (!customer) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [customer, onClose]);

  if (!customer) {
    return null;
  }

  const firstLetter = customer.name.charAt(0).toUpperCase();

  return (
    <div className="modal-overlay customer-details-overlay" onClick={onClose}>
      <div
        className="customer-modal customer-details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="details-modal-header">
          <div className="details-title">
            <div className="details-title-icon">
              <FiUser />
            </div>

            <div>
              <h2>Customer Details</h2>

              <p>Complete customer information</p>
            </div>
          </div>

          <button
            type="button"
            className="details-close-btn"
            onClick={onClose}
            aria-label="Close customer details"
          >
            <FiX />
          </button>
        </div>
        {/* ================= PROFILE ================= */}
        <div className="customer-profile-card">
          <div className="large-avatar">{firstLetter}</div>

          <div className="customer-profile-info">
            <h3>{customer.name}</h3>

            <div className="profile-meta">
              <span>
                <FiUser />
                Customer
              </span>

              <span>
                <FiCalendar />
                Joined {customer.joinedDate}
              </span>
            </div>
          </div>

          <span className={`details-status ${customer.status.toLowerCase()}`}>
            <span className="details-status-dot" />
            {customer.status}
          </span>
        </div>
        {/* ================= DETAILS ================= */}
        <div className="customer-details-section">
          <div className="details-section-title">
            <span>Customer Information</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {/* Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiUser size={17} />
                Name
              </div>

              <div
                style={{
                  color: "#111827",
                  fontSize: "14px",
                  fontWeight: 600,
                  wordBreak: "break-word",
                }}
              >
                {customer.name}
              </div>
            </div>

            {/* Email */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiMail size={17} />
                Email
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  wordBreak: "break-word",
                }}
              >
                {customer.email}
              </div>
            </div>

            {/* Phone */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiPhone size={17} />
                Phone
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: "14px",
                }}
              >
                {customer.phone}
              </div>
            </div>

            {/* Service */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiBriefcase size={17} />
                Service
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  wordBreak: "break-word",
                }}
              >
                {customer.service}
              </div>
            </div>

            {/* Joined Date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiCalendar size={17} />
                Joined Date
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: "14px",
                }}
              >
                {customer.joinedDate}
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "58px",
                padding: "0 18px",
              }}
            >
              <div
                style={{
                  width: "180px",
                  minWidth: "180px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <FiUser size={17} />
                Status
              </div>

              <span
                className={`details-status ${customer.status.toLowerCase()}`}
              >
                <span className="details-status-dot" />
                {customer.status}
              </span>
            </div>
          </div>
        </div>
        {/* ================= FOOTER ================= */}
        <div className="details-modal-footer">
          <button type="button" className="secondary-btn" onClick={onClose}>
            <FiX />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
