const Error = ({ message }: { message?: string }) => {
  return (
    <main className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <div>
        <h1 className="text-pry">{message ? message : "An Error Occured"}</h1>
      </div>
    </main>
  );
};

export default Error;
