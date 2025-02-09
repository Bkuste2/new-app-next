interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <h1>Public Layout</h1>
      {children}
    </div>
  );
}