/* eslint-disable @typescript-eslint/no-explicit-any */
const TextInput = ({
  label,
  placeholder,
  type,
  register,
  name,
  error,
}: {
  label: string;
  placeholder: string;
  type: string;
  register: any;
  name: string;
  error: any;
}) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="text-md font-medium">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full h-12 border-2 border-[var(--input-border-color)] rounded-xl p-4 mt-1 bg-transparent max-sm:border-[var(--border-color)]"
      />
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};
export default TextInput;
