// Import necessary components
import Header from './views/hamburgerView';
import GameView from './views/gameView';

// Hard-coded data
const testData = {
  title: 'Song Title',
  lyrics: 'These are the lyrics of the song with some missing words.'
};

// App component
const App = () => {
  return (
    <div>
      {/* GameView component with hard-coded data */}
      <GameView title={testData.title} lyrics={testData.lyrics} />
    </div>
  );
};

export default App;
