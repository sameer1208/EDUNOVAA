import type { Customer } from "../data/mockdata";

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerModal = ({
  customer,
  onClose,
}: CustomerModalProps) => {
  if (!customer) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="customer-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <h2>Customer Details</h2>

            <p>
              View customer information
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="customer-profile">
          <div className="large-avatar">
            {customer.name.charAt(0)}
          </div>

          <div>
            <h3>{customer.name}</h3>

            <span
              className={`status ${customer.status.toLowerCase()}`}
            >
              {customer.status}
            </span>
          </div>
        </div>

        <div className="customer-details">
          <div className="detail-item">
            <label>Email</label>
            <p>{customer.email}</p>
          </div>

          <div className="detail-item">
            <label>Phone</label>
            <p>{customer.phone}</p>
          </div>

          <div className="detail-item">
            <label>Service</label>
            <p>{customer.service}</p>
          </div>

          <div className="detail-item">
            <label>Joined Date</label>
            <p>{customer.joinedDate}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="secondary-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;