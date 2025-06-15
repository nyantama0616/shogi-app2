"use client";

type UnexpectedErrorProps = {
  error: Error;
  reset?: () => void;
};

export const UnExpectedError = ({ reset }: UnexpectedErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-1">
      <p>予期せぬエラーが発生しました。</p>
      <button onClick={reset} className="bg-blue-500 text-white px-4 py-2 rounded">再読み込み</button>
    </div>
  );
};
