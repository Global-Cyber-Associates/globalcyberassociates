import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './breadcrumbs.css';

// Renders the same trail already emitted as BreadcrumbList JSON-LD on the
// page, so schema-eligible rich results are backed by a real, visible nav —
// not schema-only markup search engines discount.
const Breadcrumbs = ({ items }) => (
  <nav className="site-breadcrumb" aria-label="Breadcrumb">
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <span key={item.label} style={{ display: 'contents' }}>
          {isLast ? (
            <span>{item.label}</span>
          ) : (
            <Link to={item.href}>{item.label}</Link>
          )}
          {!isLast && <ChevronRight size={13} />}
        </span>
      );
    })}
  </nav>
);

export default Breadcrumbs;
