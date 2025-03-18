export function LoginButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="cursor-pointer bg-yellow-500 text-zinc-700 rounded-full px-4 py-2"
      {...props}
    >
      Log In
    </button>
  );
}
