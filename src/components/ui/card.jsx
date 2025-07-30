export const Card = ({ children, ...props }) => (
  <div className='border rounded shadow bg-white' {...props}>
    {children}
  </div>
);
export const CardContent = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);