interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  'aria-live': 'off' | 'polite' | 'assertive';
  'aria-atomic': 'true' | 'false';
  role: 'status' | 'alert';
  as?: 'span' | 'output' | 'div';
}

const VisuallyHidden = ({
  children,
  'aria-live': ariaLive,
  'aria-atomic': ariaAtomic,
  role: role,
  as: Component = 'output',
}: VisuallyHiddenProps) => {
  return (
    <Component
      className="sr-only"
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      role={role}
    >
      {children}
    </Component>
  );
};

export default VisuallyHidden;
