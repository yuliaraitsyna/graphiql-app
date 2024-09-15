import {History} from '~/components/History';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

export default function HistoryRoute() {
  return (
    <ProtectedRoute redirectPath="/">
      <History />
    </ProtectedRoute>
  );
}
