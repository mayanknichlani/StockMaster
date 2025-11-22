import { getStatusColor } from '../../utils/formatters';

export const Badge = ({ status, children }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {children || status}
    </span>
  );
};