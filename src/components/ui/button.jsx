export const Button = ({ children, ...props }) => (
  <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition' {...props}>
    {children}
  </button>
);