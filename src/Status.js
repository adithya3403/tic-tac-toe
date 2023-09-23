import './App.css';

export default function Status({ title, isX }) {
        return (
            <div className="status-container">
                <h1 id={isX ? "status-1" : "status-2"} class={isX ? 'x' : 'o'} style={{ left: '50%' }}>{title}</h1>
            </div>
        );
    }