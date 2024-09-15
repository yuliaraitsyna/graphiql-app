import {History} from '~/components/History';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';

export default function HistoryRoute() {
  return (
    <ProtectedRoute redirectPath="/sign-in">
      <History />
    </ProtectedRoute>
  );
}
