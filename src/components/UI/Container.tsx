const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`container mx-auto max-w-7xl ${className} px-6`}>
      {children}
    </div>
  );
};

export default Container;
