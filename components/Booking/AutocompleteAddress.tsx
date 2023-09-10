import { useAppContext } from "@/context/AppContext";
import React from "react";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "09e03936-d506-4311-88a7-ad6adf20d6ed";
const AutocompleteAddress = () => {
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [sourceChange, setSourceChange] = React.useState<boolean>(false);
  const [destinationChange, setDestinationChange] =
    React.useState<boolean>(false);
  //mặc dù biết thằng này trả về object nhưng cứ đưa vô mảng để xóa cho dễ, xóa chỉ cần sét lại mảng rỗng là xong
  const [addressList, setAddressList] = React.useState<any>([]);
  const { onChangeState } = useAppContext();

  //hàm lấy danh sách các địa chỉ được api trả về
  const getAddressList = async () => {
    // trước khi lấy danh sách thì set lại danh sách địa chỉ trước đó về rỗng để xíu thêm danh sách mới
    setAddressList([]);
    // nếu vừa nhập source thì lấy text source và ngược lại để chạy api
    const query = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // nếu mà lỡ search không có mảng thông tin nào trả về thì không hiện dropdown luôn nha
    if (result?.data?.suggestions?.length === 0) {
      if (sourceChange) {
        setSourceChange(false);
      }
      if (destinationChange) {
        setDestinationChange(false);
      }
    }
    setAddressList(result);
  };

  //hàm xử lý khi chọn địa chỉ chi tiết source
  const onSourceAddressClick = async (item: any) => {
    setSource(item?.full_address || item?.name);
    //khi chọn một điểm source thì phải set lại addressList là rỗng để xíu lấy mảng addressList của thằng destination
    setAddressList([]);
    //chọn xong thì set lại sourceChange bằng false để tắt dropdown
    setSourceChange(false);
    //chạy api để lấy thông tin tọa độ vị trí cụ thể đã được chọn
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    // kết quả trả về thông tin tọa độ vị trí chọn thì set tọa độ vô cho source
    onChangeState({
      sourceCordinates: {
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      },
    });
  };

  //hàm xử lý khi chọn địa chỉ chi tiết destination
  const onDestinationAddressClick = async (item: any) => {
    setDestination(item?.full_address || item?.name);
    //khi chọn một điểm source thì phải set lại addressList là rỗng để xíu lấy mảng addressList của thằng destination
    setAddressList([]);
    //chọn xong thì set lại sourceChange bằng false để tắt dropdown
    setDestinationChange(false);
    //chạy api để lấy thông tọa độ vị trí cụ thể đã được chọn
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    onChangeState({
      destinationCordinates: {
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      },
    });
  };

  //mỗi khi thay đổi text source hoặc destination thì chạy lại hàm lấy danh sách địa chỉ
  React.useEffect(() => {
    //chờ sau 1s sau khi nhập mới chạy
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  return (
    <div className='mt-5'>
      <div className='relative'>
        <label className='text-gray-400 ' htmlFor=''>
          Where From?
        </label>
        <input
          type='text'
          value={source}
          className='outline-none w-full border-[1px] mt-2 rounded-md p-1 bg-white focus:border-yellow-300 '
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        {/* thằng addressList này trả về object với key suggestions với 1 mảng gồm nhiều thông tin vị trí liên quan 
          có thông tin địa chỉ và sourceChange vẫn bằng true tức là chưa chọn mới show ra dropdown các vị trí
        */}
        {addressList?.data?.suggestions && sourceChange ? (
          <div
            className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'
          >
            {addressList?.data?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={() => {
                  onSourceAddressClick(item);
                }}
              >
                {item?.full_address || item?.name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className='mt-3 relative'>
        <label className='text-gray-400 ' htmlFor=''>
          Where To?
        </label>
        <input
          type='text'
          value={destination}
          className='outline-none w-full border-[1px] mt-2 rounded-md p-1 bg-white focus:border-yellow-300 '
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />
        {addressList?.data?.suggestions && destinationChange ? (
          <div
            className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'
          >
            {addressList?.data?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={() => {
                  onDestinationAddressClick(item);
                }}
              >
                {item?.full_address || item?.name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutocompleteAddress;
