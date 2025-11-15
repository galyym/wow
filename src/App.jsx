import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvitationsRouter from './modules/invitations/InvitationsRouter';
import RestaurantsRouter from './modules/restaurants/RestaurantsRouter';
import HostsRouter from './modules/hosts/HostsRouter';
import ArtistsRouter from './modules/artists/ArtistsRouter';
import RentRouter from './modules/rent/RentRouter';
import ServicesRouter from './modules/services/ServicesRouter';
import AdminRouter from './modules/admin/AdminRouter';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitations/*" element={<InvitationsRouter />} />
        <Route path="/restaurants/*" element={<RestaurantsRouter />} />
        <Route path="/hosts/*" element={<HostsRouter />} />
        <Route path="/artists/*" element={<ArtistsRouter />} />
        <Route path="/rent/*" element={<RentRouter />} />
        <Route path="/services/*" element={<ServicesRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </div>
  );
}

export default App;
