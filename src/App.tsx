import React from 'react';
import ChatContainer from './components/ChatContainer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden">
          <ChatContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;