interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <h1>Private Layout</h1>
      {children}
    </div>
  );
}