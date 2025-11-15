import { Routes, Route } from 'react-router-dom';
import TemplateSelection from './pages/TemplateSelection';
import EditorPage from './pages/EditorPage';
import PublishPage from './pages/PublishPage';
import GuestView from './pages/GuestView';
import OrganizerPanel from './pages/OrganizerPanel';

const InvitationsRouter = () => {
  return (
    <Routes>
      <Route index element={<TemplateSelection />} />
      <Route path="editor/:templateId" element={<EditorPage />} />
      <Route path="publish/:invitationId" element={<PublishPage />} />
      <Route path="view/:invitationId" element={<GuestView />} />
      <Route path="organizer/:invitationId" element={<OrganizerPanel />} />
    </Routes>
  );
};

export default InvitationsRouter;
