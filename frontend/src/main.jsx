
import { createRoot } from 'react-dom/client'
import './index.css'
import TestHarness from './TestHarness.jsx'
import ChatPanel from './components/chatPanel/ChatPanel.jsx'

createRoot(document.getElementById('root')).render(
<div className='dashboard'>


    <main className="main">
    <section className='testharness'>
      <TestHarness />
    </section>
     <section className='chatPanel'>
      <ChatPanel />
      </section>
      </main>
      </div>
    
  
  
)
