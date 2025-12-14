export default function PriceCard() {
  return (
    <div className=" w-[177px] h-28 p-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm">
      <p className="text-gray-500 text-[13px]">10 Dec, We</p>

      <div className="mt-2 flex items-start gap-1">
        <span className="text-3xl font-semibold text-gray-900">369</span>
        <span className="text-sm font-semibold text-gray-900 mt-1">.77</span>

        <span className="text-xl font-medium text-gray-700 -ml-1">ሠ</span>
      </div>

      <p className="text-gray-400 text-sm mt-2 ">for 1 passenger</p>
    </div>
  );
}
