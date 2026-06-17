import "../styles/layout.css";

function Layout({ children }) {
    return (
        <div className="app-layout">
            <main className="app-content">
                {children}
            </main>
        </div>
    );
}

export default Layout;