// app/notes/filter/layout.tsx

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: '250px',
          padding: '1rem',
          borderRight: '1px solid #444',
        }}
      >
        {sidebar}
      </aside>
      <div style={{ flex: 1, padding: '1rem' }}>{children}</div>
    </section>
  );
};

export default NotesLayout;
