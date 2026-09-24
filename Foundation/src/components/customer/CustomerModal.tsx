import { useEffect } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";

import type { Customer } from "../../data/mockdata";
import "./CustomerModal.css";

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerModal = ({ customer, onClose }: CustomerModalProps) => {
  useEffect(() => {
    if (!customer) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [customer, onClose]);

  if (!customer) return null;

  const firstLetter = customer.name.charAt(0).toUpperCase();

  return (
    <div className="modal-overlay customer-details-overlay" onClick={onClose}>
      <div
        className="customer-modal customer-details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="details-modal-header">
          <div className="details-title">
            <div className="details-title-icon">
              <FiUser />
            </div>
            <div className="details-title-text">
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

        <div className="customer-details-section">
          <div className="details-section-title">
            <span>Customer Information</span>
          </div>

          <div className="customer-information-list">
            <div className="customer-information-row">
              <div className="customer-information-label">
                <FiUser size={17} />
                <span>Name</span>
              </div>
              <div className="customer-information-value customer-name-value">
                {customer.name}
              </div>
            </div>

            <div className="customer-information-row">
              <div className="customer-information-label">
                <FiMail size={17} />
                <span>Email</span>
              </div>
              <div className="customer-information-value">{customer.email}</div>
            </div>

            <div className="customer-information-row">
              <div className="customer-information-label">
                <FiPhone size={17} />
                <span>Phone</span>
              </div>
              <div className="customer-information-value">{customer.phone}</div>
            </div>

            <div className="customer-information-row">
              <div className="customer-information-label">
                <FiBriefcase size={17} />
                <span>Service</span>
              </div>
              <div className="customer-information-value">
                {customer.service}
              </div>
            </div>

            <div className="customer-information-row">
              <div className="customer-information-label">
                <FiCalendar size={17} />
                <span>Joined Date</span>
              </div>
              <div className="customer-information-value">
                {customer.joinedDate}
              </div>
            </div>

            <div className="customer-information-row customer-information-row-last">
              <div className="customer-information-label">
                <FiUser size={17} />
                <span>Status</span>
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

        <div className="details-modal-footer">
          <button type="button" className="secondary-btn" onClick={onClose}>
            <FiX />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
