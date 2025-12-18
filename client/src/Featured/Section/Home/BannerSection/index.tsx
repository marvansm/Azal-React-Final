import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import LocationModal, {
  type Location,
} from "../../../../Components/ui/LocationModal";
import PassengerModal, {
  type Passengers,
  type CabinClass,
} from "../../../../Components/ui/PassengerModal";
import ApiServices from "../../../../Services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "@tanstack/react-router";
import "./datepicker-custom.css";

const BannerSection = () => {
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [modalMode, setModalMode] = useState<"from" | "to" | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [passengerModalOpen, setPassengerModalOpen] = useState(false);
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState<CabinClass>("Economy");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const api = new ApiServices("http://localhost:1337/api");
        const data = await api.getData("/locations");
        if (data && data.data && Array.isArray(data.data)) {
          const mapped = data.data.map((item: any) => ({
            id: item.id,
            ...item.attributes,
          }));
          setLocations(mapped);
        } else if (Array.isArray(data)) {
          setLocations(data);
        }
      } catch (error) {
        console.error("Failed to fetch locations, using defaults", error);
      }
    };
    fetchLocations();
  }, []);

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSelectLocation = (loc: Location) => {
    if (modalMode === "from") {
      setFromLocation(loc);
    } else if (modalMode === "to") {
      setToLocation(loc);
    }
    setModalMode(null);
  };

  const handlePassengerApply = (
    newPassengers: Passengers,
    newClass: CabinClass
  ) => {
    setPassengers(newPassengers);
    setCabinClass(newClass);
  };

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    return false;
  };

  const handleSearch = () => {
    navigate({
      to: "/booking",
      search: {
        from: fromLocation?.code,
        to: toLocation?.code,
        start: startDate?.toISOString(),
        end: endDate?.toISOString(),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        class: cabinClass,
      } as any,
    });
  };

  const services = [
    {
      id: 1,
      name: "Additional baggage",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path d="M10.2529 0C8.79528 0 7.59459 1.16145 7.59459 2.57143V5.14286H6.6583C5.19269 5.14286 4 6.29657 4 7.71429V19.7143C4 21.132 5.19269 22.2857 6.6583 22.2857H6.78291C6.73349 22.4267 6.70849 22.5716 6.70849 22.7143C6.70849 23.0119 6.80627 23.321 7.04251 23.5781C7.27875 23.8352 7.66843 24 8.03764 24C8.40685 24 8.79653 23.8352 9.03277 23.5781C9.26901 23.321 9.36679 23.0119 9.36679 22.7143C9.36679 22.5716 9.34179 22.4267 9.29237 22.2857H14.7578C14.7084 22.4267 14.6834 22.5716 14.6834 22.7143C14.6834 23.0119 14.7812 23.321 15.0174 23.5781C15.2537 23.8352 15.6433 24 16.0125 24C16.3818 24 16.7714 23.8352 17.0077 23.5781C17.2439 23.321 17.3417 23.0119 17.3417 22.7143C17.3417 22.5716 17.3167 22.4267 17.2673 22.2857H17.3417C18.8073 22.2857 20 21.132 20 19.7143V7.71429C20 6.29657 18.8073 5.14286 17.3417 5.14286H16.4556V2.57143C16.4556 1.16145 15.2549 0 13.7973 0H10.2529ZM10.2529 1.71429H13.7973C14.298 1.71429 14.6834 2.08712 14.6834 2.57143V5.14286H9.36679V2.57143C9.36679 2.08712 9.75222 1.71429 10.2529 1.71429ZM11.139 15.4286H12.9112C13.4012 15.4286 13.7973 15.8126 13.7973 16.2857C13.7973 16.7589 13.4012 17.1429 12.9112 17.1429H11.139C10.649 17.1429 10.2529 16.7589 10.2529 16.2857C10.2529 15.8126 10.649 15.4286 11.139 15.4286ZM8.03764 22.2857C8.11148 22.2857 8.27964 22.3434 8.3682 22.4397C8.45676 22.5361 8.48069 22.631 8.48069 22.7143C8.48069 22.7976 8.45676 22.8925 8.3682 22.9888C8.27964 23.0852 8.11148 23.1429 8.03764 23.1429C7.9638 23.1429 7.79564 23.0852 7.70708 22.9888C7.61853 22.8925 7.59459 22.7976 7.59459 22.7143C7.59459 22.631 7.61853 22.5361 7.70708 22.4397C7.79564 22.3434 7.9638 22.2857 8.03764 22.2857ZM16.0125 22.2857C16.0864 22.2857 16.2545 22.3434 16.3431 22.4397C16.4317 22.5361 16.4556 22.631 16.4556 22.7143C16.4556 22.7976 16.4317 22.8925 16.3431 22.9888C16.2545 23.0852 16.0864 23.1429 16.0125 23.1429C15.9387 23.1429 15.7705 23.0852 15.682 22.9888C15.5934 22.8925 15.5695 22.7976 15.5695 22.7143C15.5695 22.631 15.5934 22.5361 15.682 22.4397C15.7705 22.3434 15.9387 22.2857 16.0125 22.2857Z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      name: "Select a seat",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path d="M2.72472 1.66675C2.72472 1.66675 2.75953 1.68882 2.76215 1.69035C2.48594 1.68338 2.20968 1.74677 1.96381 1.89461C1.37256 2.25045 1.12337 3.0027 1.37462 3.69311L5.47211 13.4775C5.77305 14.3053 6.52789 14.8779 7.39187 14.9675L6.71235 16.7799C6.36198 17.7144 7.07987 18.7501 8.07791 18.7501H14.0056C15.0035 18.7501 15.722 17.7142 15.372 16.7799C15.3717 16.7799 15.3715 16.7799 15.3712 16.7799L14.6925 14.97C15.038 14.9345 15.3569 14.7862 15.5999 14.5305C15.8778 14.2376 16.0187 13.8536 15.9978 13.449C15.9578 12.6877 15.2732 12.0688 14.4711 12.0688H8.50108C8.23942 12.0688 8.0032 11.9035 7.90945 11.6472L7.38862 10.4167H11.6668C11.7496 10.4179 11.8318 10.4026 11.9087 10.3717C11.9855 10.3408 12.0555 10.295 12.1145 10.2368C12.1734 10.1787 12.2203 10.1094 12.2522 10.033C12.2842 9.95658 12.3007 9.87458 12.3007 9.79175C12.3007 9.70892 12.2842 9.62692 12.2522 9.55051C12.2203 9.4741 12.1734 9.4048 12.1145 9.34665C12.0555 9.2885 11.9855 9.24264 11.9087 9.21176C11.8318 9.18088 11.7496 9.16558 11.6668 9.16675H6.87511C6.86968 9.16695 6.86425 9.16722 6.85883 9.16756L5.50955 5.98071C6.03349 5.69114 6.2545 5.05223 6.01817 4.50122L5.1295 2.42603C4.93242 1.96644 4.4792 1.66798 3.97878 1.66756C3.29545 1.66715 2.72472 1.66675 2.72472 1.66675ZM15.6251 1.66675C14.3669 1.66675 13.3334 2.70018 13.3334 3.95841V5.62508C13.3334 6.88332 14.3669 7.91675 15.6251 7.91675C16.8833 7.91675 17.9168 6.88332 17.9168 5.62508V3.95841C17.9168 2.70018 16.8833 1.66675 15.6251 1.66675ZM15.6251 2.91675C16.2077 2.91675 16.6668 3.37582 16.6668 3.95841V5.62508C16.6668 6.20767 16.2077 6.66675 15.6251 6.66675C15.0425 6.66675 14.5834 6.20767 14.5834 5.62508V3.95841C14.5834 3.37582 15.0425 2.91675 15.6251 2.91675ZM8.72 14.9854H13.3636L14.201 17.2185C14.2593 17.3742 14.172 17.5001 14.0056 17.5001H8.07791C7.91261 17.5001 7.82463 17.3731 7.88259 17.2185L8.72 14.9854Z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      name: "Azal Upgrade",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.04642 9.67084C2.91789 9.67084 2.8137 9.77503 2.8137 9.90356V17.2947C2.81368 17.7766 2.81367 18.1924 2.84165 18.5349C2.87118 18.8963 2.93639 19.2558 3.11266 19.6018C3.37562 20.1179 3.79523 20.5375 4.31133 20.8005C4.65728 20.9767 5.01679 21.0419 5.37825 21.0715C5.72071 21.0994 6.13649 21.0994 6.61844 21.0994H17.2947C17.7766 21.0994 18.1924 21.0994 18.5349 21.0715C18.8963 21.0419 19.2558 20.9767 19.6018 20.8005C20.1179 20.5375 20.5375 20.1179 20.8005 19.6018C20.9767 19.2558 21.0419 18.8963 21.0715 18.5349C21.0994 18.1924 21.0994 17.7766 21.0994 17.2947V6.61844C21.0994 6.13649 21.0994 5.72071 21.0715 5.37825C21.0419 5.01679 20.9767 4.65728 20.8005 4.31133C20.5375 3.79523 20.1179 3.37562 19.6018 3.11266C19.2558 2.93639 18.8963 2.87118 18.5349 2.84165C18.1924 2.81367 17.7766 2.81368 17.2947 2.8137H10.5717C10.1524 2.8137 9.94244 3.3206 10.2389 3.61706C11.3101 4.68822 11.3101 6.4249 10.2389 7.49605C9.70333 8.03163 9.00137 8.29941 8.29941 8.29941C8.29941 9.81425 7.07139 11.0423 5.55656 11.0423C4.58934 11.0423 3.73905 10.5416 3.25068 9.78536C3.20562 9.71557 3.12949 9.67084 3.04642 9.67084ZM17.4423 7.38513C17.4423 6.88018 17.0329 6.47084 16.528 6.47084C16.023 6.47084 15.6137 6.88018 15.6137 7.38513V16.528C15.6137 17.0329 16.023 17.4423 16.528 17.4423C17.0329 17.4423 17.4423 17.0329 17.4423 16.528V7.38513ZM12.8708 10.128C13.3758 10.128 13.7851 10.5373 13.7851 11.0423V16.528C13.7851 17.0329 13.3758 17.4423 12.8708 17.4423C12.3659 17.4423 11.9566 17.0329 11.9566 16.528V11.0423C11.9566 10.5373 12.3659 10.128 12.8708 10.128ZM9.2137 11.9566C9.71865 11.9566 10.128 12.3659 10.128 12.8708V16.528C10.128 17.0329 9.71865 17.4423 9.2137 17.4423C8.70875 17.4423 8.29941 17.0329 8.29941 16.528V12.8708C8.29941 12.3659 8.70875 11.9566 9.2137 11.9566Z"
            fill="currentColor"
          ></path>
          <path
            d="M6.20305 2.1672C6.03159 1.99574 5.79904 1.89941 5.55656 1.89941C5.31407 1.89941 5.08152 1.99574 4.91006 2.1672L2.1672 4.91006C1.81015 5.26711 1.81015 5.846 2.1672 6.20305C2.52425 6.5601 3.10315 6.5601 3.4602 6.20305L4.64227 5.02098L4.64227 8.29941C4.64227 8.80436 5.05161 9.2137 5.55656 9.2137C6.0615 9.2137 6.47084 8.80436 6.47084 8.29941L6.47084 5.02098L7.65292 6.20305C8.00997 6.5601 8.58886 6.5601 8.94591 6.20305C9.30296 5.846 9.30296 5.26711 8.94591 4.91006L6.20305 2.1672Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    },
    {
      id: 4,
      name: "Book a transfer",
      icon: (
        <svg
          fill="none"
          viewBox="1.49 4 21.02 16.5"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path
            d="m12 4c-1.9041 0-3.547 0.32568-4.6348 0.61328-1.0203 0.26998-1.8701 0.9646-2.3525 1.8945l-1.0527 2.0293c-0.07784-0.02546-0.15932-0.03799-0.24121-0.03711h-1.4688c-0.09938-0.00141-0.19806 0.01696-0.29028 0.05402-0.09223 0.03706-0.17617 0.09208-0.24695 0.16186-0.07077 0.06978-0.12698 0.15294-0.16534 0.24463s-0.05811 0.1901-0.05811 0.28949 0.01975 0.1978 0.05811 0.28949 0.09457 0.17485 0.16534 0.24463c0.07078 0.06978 0.15472 0.1248 0.24695 0.16186 0.09222 0.03706 0.1909 0.05542 0.29028 0.05402h0.79004c-0.06176 0.036-0.13982 0.0576-0.19922 0.0957-0.74563 0.4783-1.3408 1.2293-1.3408 2.1543v7.25c0 0.5525 0.4475 1 1 1h1c0.5525 0 1-0.4475 1-1v-1.5h15v1.5c0 0.5525 0.4475 1 1 1h1c0.5525 0 1-0.4475 1-1v-7.25c0-0.925-0.5952-1.676-1.3408-2.1543-0.0594-0.0381-0.1375-0.0597-0.1992-0.0957h0.79c0.0994 0.0014 0.1981-0.01696 0.2903-0.05402s0.1761-0.09208 0.2469-0.16186 0.127-0.15294 0.1654-0.24463c0.0383-0.09169 0.0581-0.1901 0.0581-0.28949s-0.0198-0.1978-0.0581-0.28949c-0.0384-0.09169-0.0946-0.17485-0.1654-0.24463s-0.1547-0.1248-0.2469-0.16186-0.1909-0.05543-0.2903-0.05402h-1.4531c-0.0861-9.4e-4 -0.1716 0.01294-0.253 0.04102l-1.0556-2.0332v-9.7e-4c-0.4828-0.92936-1.3322-1.6236-2.3526-1.8936h-9e-4c-1.0882-0.28756-2.7307-0.61328-4.6348-0.61328zm0 1.5c1.7319 0 3.2551 0.30004 4.252 0.56348 0.6046 0.16 1.113 0.57214 1.4052 1.1348l1.0059 1.9385c-0.0733-0.0185-0.1433-0.03988-0.2188-0.05664-2.0672-0.45938-4.536-0.58008-6.4443-0.58008s-4.3772 0.1207-6.4443 0.58008c-0.07511 0.01669-0.14487 0.03722-0.21778 0.05566l1.0059-1.9375c0.29158-0.56206 0.80054-0.97474 1.4053-1.1348 0.99624-0.2634 2.5191-0.56348 4.251-0.56348zm-7.75 6c0.69 0 1.25 0.56 1.25 1.25s-0.56 1.25-1.25 1.25-1.25-0.56-1.25-1.25 0.56-1.25 1.25-1.25zm15.5 0c0.69 0 1.25 0.56 1.25 1.25s-0.56 1.25-1.25 1.25-1.25-0.56-1.25-1.25 0.56-1.25 1.25-1.25zm-12 3h8.5c0.285 0 0.5449 0.16 0.6699 0.415 0.13 0.255 0.0997 0.5602-0.0703 0.7852l-0.5996 0.7998h-8.5l-0.59961-0.7998c-0.17-0.225-0.20031-0.5302-0.07031-0.7852 0.125-0.255 0.38492-0.415 0.66992-0.415z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    },
    {
      id: 5,
      name: "Book a hotel",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path
            d="M12.4141 0.5C12.2806 0.5 12.1471 0.536172 12.0283 0.607422L8.18359 2.91309C7.55459 3.29109 7.16406 3.98184 7.16406 4.71484V6.25977L10.1592 8.05664C11.0872 8.61414 11.6641 9.63284 11.6641 10.7148V12.5244C12.2896 11.8924 13.1568 11.5 14.1143 11.5H17.6641V4.71484C17.6641 3.98184 17.2735 3.29109 16.6445 2.91309L12.7998 0.607422C12.6811 0.536172 12.5476 0.5 12.4141 0.5ZM10.1641 4.5H11.1641C11.4401 4.5 11.6641 4.724 11.6641 5V6C11.6641 6.276 11.4401 6.5 11.1641 6.5H10.1641C9.88806 6.5 9.66406 6.276 9.66406 6V5C9.66406 4.724 9.88806 4.5 10.1641 4.5ZM13.6641 4.5H14.6641C14.9401 4.5 15.1641 4.724 15.1641 5V6C15.1641 6.276 14.9401 6.5 14.6641 6.5H13.6641C13.3881 6.5 13.1641 6.276 13.1641 6V5C13.1641 4.724 13.3881 4.5 13.6641 4.5ZM5.41406 6.5C5.28056 6.5 5.14707 6.53617 5.02832 6.60742L1.18359 8.91309C0.554594 9.29109 0.164062 9.98184 0.164062 10.7148V20.75C0.164062 21.164 0.500062 21.5 0.914062 21.5H9.91406C10.3281 21.5 10.6641 21.164 10.6641 20.75V10.7148C10.6641 9.98184 10.2735 9.29109 9.64453 8.91309L5.7998 6.60742C5.68105 6.53617 5.54756 6.5 5.41406 6.5ZM13.6641 8H14.6641C14.9401 8 15.1641 8.224 15.1641 8.5V9.5C15.1641 9.776 14.9401 10 14.6641 10H13.6641C13.3881 10 13.1641 9.776 13.1641 9.5V8.5C13.1641 8.224 13.3881 8 13.6641 8ZM3.16406 11H4.16406C4.44006 11 4.66406 11.224 4.66406 11.5V12.5C4.66406 12.776 4.44006 13 4.16406 13H3.16406C2.88806 13 2.66406 12.776 2.66406 12.5V11.5C2.66406 11.224 2.88806 11 3.16406 11ZM6.66406 11H7.66406C7.94006 11 8.16406 11.224 8.16406 11.5V12.5C8.16406 12.776 7.94006 13 7.66406 13H6.66406C6.38806 13 6.16406 12.776 6.16406 12.5V11.5C6.16406 11.224 6.38806 11 6.66406 11ZM14.1143 12.5C12.7633 12.5 11.6641 13.5992 11.6641 14.9502V20.75C11.6641 21.164 12.0001 21.5 12.4141 21.5H20.3643C20.7783 21.5 21.1143 21.164 21.1143 20.75V14.9502C21.1143 13.5992 20.0151 12.5 18.6641 12.5H14.1143ZM3.16406 14.5H4.16406C4.44006 14.5 4.66406 14.724 4.66406 15V16C4.66406 16.276 4.44006 16.5 4.16406 16.5H3.16406C2.88806 16.5 2.66406 16.276 2.66406 16V15C2.66406 14.724 2.88806 14.5 3.16406 14.5ZM6.66406 14.5H7.66406C7.94006 14.5 8.16406 14.724 8.16406 15V16C8.16406 16.276 7.94006 16.5 7.66406 16.5H6.66406C6.38806 16.5 6.16406 16.276 6.16406 16V15C6.16406 14.724 6.38806 14.5 6.66406 14.5ZM14.1641 14.5H15.1641C15.4401 14.5 15.6641 14.724 15.6641 15V16C15.6641 16.276 15.4401 16.5 15.1641 16.5H14.1641C13.8881 16.5 13.6641 16.276 13.6641 16V15C13.6641 14.724 13.8881 14.5 14.1641 14.5ZM17.6641 14.5H18.6641C18.9401 14.5 19.1641 14.724 19.1641 15V16C19.1641 16.276 18.9401 16.5 18.6641 16.5H17.6641C17.3881 16.5 17.1641 16.276 17.1641 16V15C17.1641 14.724 17.3881 14.5 17.6641 14.5ZM3.16406 18H4.16406C4.44006 18 4.66406 18.224 4.66406 18.5V19.5C4.66406 19.776 4.44006 20 4.16406 20H3.16406C2.88806 20 2.66406 19.776 2.66406 19.5V18.5C2.66406 18.224 2.88806 18 3.16406 18ZM6.66406 18H7.66406C7.94006 18 8.16406 18.224 8.16406 18.5V19.5C8.16406 19.776 7.94006 20 7.66406 20H6.66406C6.38806 20 6.16406 19.776 6.16406 19.5V18.5C6.16406 18.224 6.38806 18 6.66406 18ZM14.1641 18H15.1641C15.4401 18 15.6641 18.224 15.6641 18.5V19.5C15.6641 19.776 15.4401 20 15.1641 20H14.1641C13.8881 20 13.6641 19.776 13.6641 19.5V18.5C13.6641 18.224 13.8881 18 14.1641 18ZM17.6641 18H18.6641C18.9401 18 19.1641 18.224 19.1641 18.5V19.5C19.1641 19.776 18.9401 20 18.6641 20H17.6641C17.3881 20 17.1641 19.776 17.1641 19.5V18.5C17.1641 18.224 17.3881 18 17.6641 18Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    },
    {
      id: 6,
      name: "Get E-Sim",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 6.26715C22 6.03021 21.9059 5.80297 21.7383 5.63542L16.3646 0.261671C16.197 0.0941261 15.9698 0 15.7328 0H0.893401C0.399989 0 0 0.399989 0 0.893401V14.7411C0 15.2345 0.39999 15.6345 0.893402 15.6345H21.1066C21.6 15.6345 22 15.2345 22 14.7411V6.26715ZM15.2512 10.826L14.0442 7.01118V10.826H13.3438V6.29199H14.4882L15.6201 9.99425L16.7521 6.29199H17.8965V10.826H17.1961V7.01118L15.9891 10.826H15.2512ZM12.3399 10.826V6.29199H11.627V10.826H12.3399ZM9.25197 8.83754L8.69538 8.72497C8.05124 8.59364 7.43836 8.23092 7.43836 7.46795C7.43836 6.61118 8.32641 6.21094 9.09562 6.21094C9.93363 6.21094 10.6403 6.59242 10.8217 7.50548H10.1338C9.98366 6.9739 9.49587 6.80505 9.06435 6.80505C8.7329 6.80505 8.16381 6.96139 8.16381 7.43668C8.16381 7.81191 8.45774 8.00578 8.85173 8.08708L9.38955 8.19965C10.115 8.34974 10.9092 8.61865 10.9092 9.53796C10.9092 10.4385 10.0399 10.9075 9.16442 10.9075C8.12003 10.9075 7.40084 10.3259 7.30078 9.37536H8.00121C8.13254 10.0007 8.54529 10.3134 9.18943 10.3134C9.78354 10.3134 10.19 10.0383 10.19 9.59425C10.19 9.12521 9.73351 8.9376 9.25197 8.83754ZM6.20097 9.83831C6.05713 10.1573 5.79447 10.3511 5.31918 10.3511C4.78761 10.3511 4.40613 9.96964 4.33734 9.34426H6.9014C6.97019 8.24984 6.36357 7.39932 5.32544 7.39932C4.3686 7.39932 3.66818 8.09349 3.66818 9.13788C3.66818 10.1135 4.26229 10.9077 5.3442 10.9077C6.19472 10.9077 6.70753 10.3949 6.85762 9.83831H6.20097ZM4.34984 8.83144C4.44365 8.1873 4.81262 7.93089 5.31918 7.93089C5.85076 7.93089 6.20722 8.33739 6.22599 8.83144H4.34984Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    },
  ];
  return (
    <section className="transform translate-y-[-16%] flex items-center justify-center relative z-10 bg-[url(https://www.azal.az/_next/static/media/main_background_05c9d34cb4.jpg)] min-h-[max(500px,80vh)] bg-no-repeat bg-position-[50%] pb-8 h-auto bg-cover bg-[#01357e]">
      <div className=" max-w-[1160px] mx-auto w-full">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <button className="bg-[#FFF] py-3 px-5 rounded-t-xl text-[#01357E] font-medium text-[16px] leading-6 cursor-pointer">
              Book a flight
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              Check-in
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              {" "}
              Manage booking
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              Flight status
            </button>
          </div>
          <div className="w-full rounded-r-xl rounded-b-xl bg-white p-6">
            <div className="">
              <div className=" border border-gray-400 flex items-center rounded-xl">
                <div
                  className="px-6 py-4 flex items-center rounded-l-full bg-white w-full border-r border-gray-400 relative cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setModalMode("from")}
                >
                  <div className="flex flex-col">
                    <span className="text-pink-600 font-medium text-xs">
                      From
                    </span>
                    {fromLocation ? (
                      <div>
                        <span className="font-bold text-lg text-[#01357E]">
                          {fromLocation.city}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          {fromLocation.code}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm text-gray-300">
                        Select Origin
                      </span>
                    )}
                  </div>

                  <div
                    className=" z-10 bg-white w-8 h-8 rounded-full border border-gray-200 px-1 absolute  right-[-17px] flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSwap();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="9.49 6.4 11.02 13.2"
                      className={`_root_2bNiL_rETN6 _size_16_2bNiL_rETN6 w-4 h-4 transition-transform duration-300 active:rotate-180`}
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
                <div
                  className="px-6 py-4 flex items-center w-full border-r border-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setModalMode("to")}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xs font-medium">
                      To
                    </span>
                    {toLocation ? (
                      <div>
                        <span className="font-bold text-lg text-[#01357E]">
                          {toLocation.city}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          {toLocation.code}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm text-gray-300">
                        Select Destination
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 flex flex-col justify-center w-full border-r border-gray-400 min-w-[250px]">
                  <span className="text-gray-600 text-xs mb-1">
                    Flight date
                  </span>
                  <div className="w-full relative">
                    <DatePicker
                      selected={startDate}
                      onChange={onChangeDate}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      monthsShown={2}
                      minDate={new Date()}
                      filterDate={(date) => !isDateDisabled(date)}
                      placeholderText="Select dates"
                      className="w-full outline-none font-bold text-[#01357E] text-lg bg-transparent cursor-pointer"
                      dateFormat="dd MMM yyyy"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="3 3 18 18"
                      className="text-[#6E7583] w-5 h-5 absolute right-0 top-1 pointer-events-none"
                    >
                      <path
                        d="M6.25 3C4.46403 3 3 4.46403 3 6.25V17.75C3 19.536 4.46403 21 6.25 21H17.75C19.536 21 21 19.536 21 17.75V6.25C21 4.46403 19.536 3 17.75 3H6.25ZM6.25 4.5H17.75C18.725 4.5 19.5 5.27497 19.5 6.25V7H4.5V6.25C4.5 5.27497 5.27497 4.5 6.25 4.5ZM4.5 8.5H19.5V17.75C19.5 18.725 18.725 19.5 17.75 19.5H6.25C5.27497 19.5 4.5 18.725 4.5 17.75V8.5ZM7.75 10.5C7.41848 10.5 7.10054 10.6317 6.86612 10.8661C6.6317 11.1005 6.5 11.4185 6.5 11.75C6.5 12.0815 6.6317 12.3995 6.86612 12.6339C7.10054 12.8683 7.41848 13 7.75 13C8.08152 13 8.39946 12.8683 8.63388 12.6339C8.8683 12.3995 9 12.0815 9 11.75C9 11.4185 8.8683 11.1005 8.63388 10.8661C8.39946 10.6317 8.08152 10.5 7.75 10.5ZM12 10.5C11.6685 10.5 11.3505 10.6317 11.1161 10.8661C10.8817 11.1005 10.75 11.4185 10.75 11.75C10.75 12.0815 10.8817 12.3995 11.1161 12.6339C11.3505 12.8683 11.6685 13 12 13C12.3315 13 12.6495 12.8683 12.8839 12.6339C13.1183 12.3995 13.25 12.0815 13.25 11.75C13.25 11.4185 13.1183 11.1005 12.8839 10.8661C12.6495 10.6317 12.3315 10.5 12 10.5ZM16.25 10.5C15.9185 10.5 15.6005 10.6317 15.3661 10.8661C15.1317 11.1005 15 11.4185 15 11.75C15 12.0815 15.1317 12.3995 15.3661 12.6339C15.6005 12.8683 15.9185 13 16.25 13C16.5815 13 16.8995 12.8683 17.1339 12.6339C17.3683 12.3995 17.5 12.0815 17.5 11.75C17.5 11.4185 17.3683 11.1005 17.1339 10.8661C16.8995 10.6317 16.5815 10.5 16.25 10.5ZM7.75 15C7.41848 15 7.10054 15.1317 6.86612 15.3661C6.6317 15.6005 6.5 15.9185 6.5 16.25C6.5 16.5815 6.6317 16.8995 6.86612 17.1339C7.10054 17.3683 7.41848 17.5 7.75 17.5C8.08152 17.5 8.39946 17.3683 8.63388 17.1339C8.8683 16.8995 9 16.5815 9 16.25C9 15.9185 8.8683 15.6005 8.63388 15.3661C8.39946 15.1317 8.08152 15 7.75 15ZM12 15C11.6685 15 11.3505 15.1317 11.1161 15.3661C10.8817 15.6005 10.75 15.9185 10.75 16.25C10.75 16.5815 10.8817 16.8995 11.1161 17.1339C11.3505 17.3683 11.6685 17.5 12 17.5C12.3315 17.5 12.6495 17.3683 12.8839 17.1339C13.1183 16.8995 13.25 16.5815 13.25 16.25C13.25 15.9185 13.1183 15.6005 12.8839 15.3661C12.6495 15.1317 12.3315 15 12 15Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div
                  className="px-3 py-4 flex items-center gap-2 w-[758px] border-r border-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setPassengerModalOpen(true)}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm block leading-none mb-1">
                      Passengers
                    </span>
                    <span className="font-bold text-[#01357E] text-lg">
                      {passengers.adults +
                        passengers.children +
                        passengers.infants}
                      , {cabinClass}
                    </span>
                  </div>
                  <span className="text-gray-600 text-sm ml-auto">⌄</span>
                </div>
                <div className="bg-blue-900 py-6 rounded-r-xl">
                  <button
                    className="bg-blue-900 text-white px-6  flex items-center justify-center rounded-r-full hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSearch}
                    // disabled={!fromLocation || !toLocation || !startDate}
                  >
                    <Search />
                  </button>
                </div>
              </div>
            </div>
            <div className="promo mt-5 flex items-start justify-between">
              <div className="flex items-center gap-2.5 ">
                <input type="checkbox" />
                <h2 className="text-[14px] leading-5 text-[#2E3034]">
                  Pay by Miles
                </h2>
              </div>
              <div className="flex items-center w-[272px] h-12 border-2 border-[#2C8DC7] gap-4 rounded-lg justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#2C8DC7] _root_2bNiL_rETN6 _size_20_2bNiL_rETN6"
                >
                  <path d="M16.6667 9.16667H10.8333V3.33333C10.8333 2.87333 10.46 2.5 10 2.5C9.54 2.5 9.16667 2.87333 9.16667 3.33333V9.16667H3.33333C2.87333 9.16667 2.5 9.54 2.5 10C2.5 10.46 2.87333 10.8333 3.33333 10.8333H9.16667V16.6667C9.16667 17.1267 9.54 17.5 10 17.5C10.46 17.5 10.8333 17.1267 10.8333 16.6667V10.8333H16.6667C17.1267 10.8333 17.5 10.46 17.5 10C17.5 9.54 17.1267 9.16667 16.6667 9.16667Z"></path>
                </svg>
                <button className="text-[#2C8DC7]">Add promocode</button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-3 gap-3">
            {services &&
              services.map((item) => (
                <div
                  key={item?.id}
                  className="h-[132px] w-[194px] py-4 px-3 bg-[#ffffffe3] hover:bg-white duration-300 cursor-pointer flex items-center flex-col gap-3 rounded-xl"
                >
                  <div className="w-12 h-12 bg-[#2c8ec72c] rounded-[50%] flex items-center justify-center">
                    {item?.icon}
                  </div>
                  <h2 className="text-[14px] leading-[18px] font-normal text-[#2E3034]">
                    {item?.name}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </div>
      <LocationModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        onSelect={handleSelectLocation}
        title={modalMode === "from" ? "Select Origin" : "Select Destination"}
        locations={locations.length > 0 ? locations : undefined}
      />
      <PassengerModal
        isOpen={passengerModalOpen}
        onClose={() => setPassengerModalOpen(false)}
        currentPassengers={passengers}
        currentClass={cabinClass}
        onApply={handlePassengerApply}
      />
    </section>
  );
};

export default BannerSection;
