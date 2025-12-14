import { Info, Plane, Search } from "lucide-react";
import FlightRoadCard from "../../Components/FlightRoadCard";
import PriceCard from "../../Components/FlightPriceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const BookingMenu = () => {
  return (
    <div className="max-w-[1160px] mx-auto w-full">
      <div className="w-full rounded-r-xl overflow-hidden rounded-b-xl bg-transparent py-6">
        <div className="  rounded-xl overflow-hidden  bg-white">
          <div className=" border border-gray-400 flex items-center rounded-xl">
            <div className="px-6 py-4 flex items-center rounded-l-full bg-transparent w-full border-r border-gray-400 relative">
              <span className="text-pink-600 font-medium">From</span>
              <div className=" z-10 bg-white w-8 h-8 rounded-full border border-gray-200 px-1 absolute  right-[-17px] flex items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="9.49 6.4 11.02 13.2"
                  className="_root_2bNiL_rETN6 _size_16_2bNiL_rETN6 w-4 h-4 "
                >
                  <g
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="m17.727 7 2.182 2.182-2.182 2.182"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M10.09 12.454v-1.09a2.182 2.182 0 0 1 2.183-2.182h7.636"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M12.273 19 10.09 16.82l2.182-2.182"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M19.909 13.545v1.09a2.182 2.182 0 0 1-2.182 2.183h-7.636"
                      stroke="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="px-6 py-4  flex items-center w-full border-r border-gray-400">
              <span className="text-gray-600">To</span>
            </div>

            <div className="px-6 py-4  flex items-center justify-between gap-2 w-full border-r border-gray-400">
              <span className="text-gray-600">Flight date</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="3 3 18 18"
                className="text-[#6E7583] w-5 h-5 _root_2bNiL_rETN6 _icon_68FXl_rETN6 _size_20_2bNiL_rETN6"
              >
                <path
                  d="M6.25 3C4.46403 3 3 4.46403 3 6.25V17.75C3 19.536 4.46403 21 6.25 21H17.75C19.536 21 21 19.536 21 17.75V6.25C21 4.46403 19.536 3 17.75 3H6.25ZM6.25 4.5H17.75C18.725 4.5 19.5 5.27497 19.5 6.25V7H4.5V6.25C4.5 5.27497 5.27497 4.5 6.25 4.5ZM4.5 8.5H19.5V17.75C19.5 18.725 18.725 19.5 17.75 19.5H6.25C5.27497 19.5 4.5 18.725 4.5 17.75V8.5ZM7.75 10.5C7.41848 10.5 7.10054 10.6317 6.86612 10.8661C6.6317 11.1005 6.5 11.4185 6.5 11.75C6.5 12.0815 6.6317 12.3995 6.86612 12.6339C7.10054 12.8683 7.41848 13 7.75 13C8.08152 13 8.39946 12.8683 8.63388 12.6339C8.8683 12.3995 9 12.0815 9 11.75C9 11.4185 8.8683 11.1005 8.63388 10.8661C8.39946 10.6317 8.08152 10.5 7.75 10.5ZM12 10.5C11.6685 10.5 11.3505 10.6317 11.1161 10.8661C10.8817 11.1005 10.75 11.4185 10.75 11.75C10.75 12.0815 10.8817 12.3995 11.1161 12.6339C11.3505 12.8683 11.6685 13 12 13C12.3315 13 12.6495 12.8683 12.8839 12.6339C13.1183 12.3995 13.25 12.0815 13.25 11.75C13.25 11.4185 13.1183 11.1005 12.8839 10.8661C12.6495 10.6317 12.3315 10.5 12 10.5ZM16.25 10.5C15.9185 10.5 15.6005 10.6317 15.3661 10.8661C15.1317 11.1005 15 11.4185 15 11.75C15 12.0815 15.1317 12.3995 15.3661 12.6339C15.6005 12.8683 15.9185 13 16.25 13C16.5815 13 16.8995 12.8683 17.1339 12.6339C17.3683 12.3995 17.5 12.0815 17.5 11.75C17.5 11.4185 17.3683 11.1005 17.1339 10.8661C16.8995 10.6317 16.5815 10.5 16.25 10.5ZM7.75 15C7.41848 15 7.10054 15.1317 6.86612 15.3661C6.6317 15.6005 6.5 15.9185 6.5 16.25C6.5 16.5815 6.6317 16.8995 6.86612 17.1339C7.10054 17.3683 7.41848 17.5 7.75 17.5C8.08152 17.5 8.39946 17.3683 8.63388 17.1339C8.8683 16.8995 9 16.5815 9 16.25C9 15.9185 8.8683 15.6005 8.63388 15.3661C8.39946 15.1317 8.08152 15 7.75 15ZM12 15C11.6685 15 11.3505 15.1317 11.1161 15.3661C10.8817 15.6005 10.75 15.9185 10.75 16.25C10.75 16.5815 10.8817 16.8995 11.1161 17.1339C11.3505 17.3683 11.6685 17.5 12 17.5C12.3315 17.5 12.6495 17.3683 12.8839 17.1339C13.1183 16.8995 13.25 16.5815 13.25 16.25C13.25 15.9185 13.1183 15.6005 12.8839 15.3661C12.6495 15.1317 12.3315 15 12 15Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="px-3 py-4  flex items-center gap-2 w-[758px] border-r border-gray-400">
              <div>
                <span className="text-gray-400 text-sm block leading-none">
                  Passengers
                </span>
                <span className="font-semibold">1, Ekonom</span>
              </div>
              <span className="text-gray-600 text-sm">⌄</span>
            </div>
            <div className="bg-blue-900 py-6 rounded-r-xl">
              <button className="bg-blue-900 text-white px-6  flex items-center justify-center rounded-r-full hover:bg-blue-800 transition">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2  gap-4 ">
        <FlightRoadCard />
        <FlightRoadCard />
      </div>
      <Swiper
        slidesPerView={6}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper  mt-10  flex items-center gap-6"
      >
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
        <SwiperSlide>
          <PriceCard />
        </SwiperSlide>
      </Swiper>
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-700">Sort by:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer">
              <option>Recommended</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer">
              <option>AZN</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-start flex-col gap-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
            <div className="flex items-start justify-between gap-10 ">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Azerbaijan Airlines
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      07:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Baku</div>
                    <div className="text-sm text-gray-500">Terminal 2</div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>

                  {/* Connection line */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">3 h</div>
                    <div className="w-full relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-between">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">
                        Without stops
                      </span>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">
                      09:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Istanbul, SAW
                    </div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">J2 8103</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <Plane className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-700">
                      Airbus A320 Neo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                  <span>124 kg CO₂e</span>
                  <Info className="w-3 h-3" />
                </div>
              </div>
              <div className="ml-12 flex flex-col items-end gap-3">
                <div className="flex gap-3">
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b  border-gray-200 ">
                      <span className="text-sm font-semibold text-[#01357E] ">
                        ECONOMY
                      </span>
                      <svg
                        className="w-4 h-4 text-[#01357E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b bg-[#3F5B98]  border-gray-200 ">
                      <span className="text-sm font-semibold text-white ">
                        BUSINESS
                      </span>
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
            <div className="flex items-start justify-between gap-10 ">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Azerbaijan Airlines
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      07:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Baku</div>
                    <div className="text-sm text-gray-500">Terminal 2</div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>

                  {/* Connection line */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">3 h</div>
                    <div className="w-full relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-between">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">
                        Without stops
                      </span>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">
                      09:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Istanbul, SAW
                    </div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">J2 8103</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <Plane className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-700">
                      Airbus A320 Neo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                  <span>124 kg CO₂e</span>
                  <Info className="w-3 h-3" />
                </div>
              </div>
              <div className="ml-12 flex flex-col items-end gap-3">
                <div className="flex gap-3">
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b  border-gray-200 ">
                      <span className="text-sm font-semibold text-[#01357E] ">
                        ECONOMY
                      </span>
                      <svg
                        className="w-4 h-4 text-[#01357E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b bg-[#3F5B98]  border-gray-200 ">
                      <span className="text-sm font-semibold text-white ">
                        BUSINESS
                      </span>
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
            <div className="flex items-start justify-between gap-10 ">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">
                    Azerbaijan Airlines
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      07:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Baku</div>
                    <div className="text-sm text-gray-500">Terminal 2</div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>

                  {/* Connection line */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">3 h</div>
                    <div className="w-full relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-between">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">
                        Without stops
                      </span>
                    </div>
                  </div>

                  {/* Arrival */}
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">
                      09:35
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Istanbul, SAW
                    </div>
                    <div className="text-sm text-gray-500">27 Dec, Sa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">J2 8103</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <Plane className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-700">
                      Airbus A320 Neo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                  <span>124 kg CO₂e</span>
                  <Info className="w-3 h-3" />
                </div>
              </div>
              <div className="ml-12 flex flex-col items-end gap-3">
                <div className="flex gap-3">
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b  border-gray-200 ">
                      <span className="text-sm font-semibold text-[#01357E] ">
                        ECONOMY
                      </span>
                      <svg
                        className="w-4 h-4 text-[#01357E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                  <div className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col">
                    <div className=" flex items-center px-4 justify-between w-full py-3 border-b bg-[#3F5B98]  border-gray-200 ">
                      <span className="text-sm font-semibold text-white ">
                        BUSINESS
                      </span>
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className=" px-4 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#01357E]">
                          446
                        </span>
                        <span className="text-sm text-[#01357E]">.86</span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Starting price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMenu;
