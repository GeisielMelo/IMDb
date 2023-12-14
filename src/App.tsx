function App() {
  return (
    <section className="h-screen flex flex-col">
      <nav className="bg-zinc-800 border-t border-zinc-700 px-4 py-2">Navigation</nav>

      <div className="flex flex-1">
        <aside className="w-72 bg-zinc-950">Menu</aside>
        <main className="flex-1">Content</main>
      </div>

      <footer className="bg-zinc-800 border-t border-zinc-700 p-6">Footer</footer>
    </section>
  );
}

export default App;
