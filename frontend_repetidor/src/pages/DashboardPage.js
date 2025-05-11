import RepeaterList from '../components/RepeaterList';
import MapView     from '../components/MapView';

export default function DashboardPage() {
  return (
    <div>
      <h1>Painel de Repetidores</h1>
      <RepeaterList />
      <MapView />
    </div>
  );
}
