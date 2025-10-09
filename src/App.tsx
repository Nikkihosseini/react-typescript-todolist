import ToDoApp from './pages/ToDoApp';
import { store } from './component/store/store';
import { Provider } from 'react-redux';
import './index.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <ToDoApp />
      </Provider>
    </>
  );
}

export default App;
