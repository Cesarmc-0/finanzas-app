import '../css/app.css';
import './bootstrap';

import { createRoot } from 'react-dom/client';
import App from './Pages/App';

const root = createRoot(document.getElementById('app'));
root.render(<App />);
