import DestinationSelector from "./DestinationSelector"
import NodeSelector from "./NodeSelector"
import PrioritySelector from "./PrioritySelector";
function ChatPanel () {
    return(
        <div>
            <h3 className="chat-panel-title">Send Message</h3>
            <main className="node-selection">
                <section className="nodeselector"><NodeSelector /></section>
                <section className="destinationselector"><DestinationSelector /></section>
            </main>
        
        
       
        <PrioritySelector />
        </div>
        
    
       

    )
}
export default ChatPanel;

