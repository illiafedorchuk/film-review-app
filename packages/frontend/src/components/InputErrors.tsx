/* eslint-disable @typescript-eslint/no-unused-vars */
export default function InputError({
  messages,
}: {
  messages?: string | string[];
  className?: string;
}) {
  return (
    <>
      {messages && (
        <>
          {Array.isArray(messages) ? (
            messages.map((message, index) => (
              <p
                className={"${className} text-sm text-red-600 mb-0"}
                key={index}
              >
                {message}
              </p>
            ))
          ) : (
            <p className={"${className} text-sm text-red-600 mb-0"}>
              {messages}
            </p>
          )}
        </>
      )}
    </>
  );
}
