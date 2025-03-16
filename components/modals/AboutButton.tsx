export function AboutButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) {
    return (
        <button
       
        className="p-0  px-4  rounded  transition-colors  cursor-pointer hover:font-semibold" {...props}
      >
        About Us
      </button>
    );
  }
  