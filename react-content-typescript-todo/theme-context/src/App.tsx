import * as React from 'react';
import ThemeProvider from './context/themeContext';
import ThemeWrapper from './components/ThemeWrapper';
export default function App() {
  return (
    <ThemeProvider>
        <ThemeWrapper>
          <main className="App">
            <h1>My Todos</h1>
          </main>
        </ThemeWrapper>
    </ThemeProvider>
  );
}
