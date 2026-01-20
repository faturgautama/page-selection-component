import PageSelectionComponent from './components/PageSelectionComponent';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

/**
 * Main App component with error boundary
 * Ensures the component remains functional even if CSS or rendering errors occur
 */
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <PageSelectionComponent />
      </ErrorBoundary>
    </div>
  );
}

export default App;
