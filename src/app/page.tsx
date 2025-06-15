export default async function TopPage() {
  return (
    <div className="flex justify-center p-8">
      <ShogiBoard />
    </div>
  );
}

const ShogiBoard = () => {
  return (
    <div className="border-2 border-black bg-yellow-100">
      {Array.from({ length: 9 }, (_, row) => (
        <ShogiRow key={row} rowIndex={row} />
      ))}
    </div>
  );
};

const ShogiRow = ({ rowIndex }: { rowIndex: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 9 }, (_, col) => (
        <ShogiCell key={col} rowIndex={rowIndex} colIndex={col} />
      ))}
    </div>
  );
};

const ShogiCell = ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
  return (
    <div className="w-12 h-12 border border-black flex items-center justify-center text-xs hover:bg-blue-200 cursor-pointer transition-colors">
      {rowIndex + 1}-{colIndex + 1}
    </div>
  );
};
