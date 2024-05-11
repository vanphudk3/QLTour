import Location from "@/Components/DetailTour/Location/Location";
import Description from "@/Components/DetailTour/Overview/Description";
import Highlight from "@/Components/DetailTour/Overview/Highlight";
import Comment from "@/Components/DetailTour/Review/Comment";
import Rating from "@/Components/DetailTour/Review/Rating";
import Reply from "@/Components/DetailTour/Review/Reply";
import SwiperImages from "@/Components/DetailTour/SwiperImages";
import Tourplan from "@/Components/DetailTour/Tourplan/Tourplan";
import Content from "@/Layouts/DetailTour";
import { Link, Head, usePage, useForm, router } from "@inertiajs/react";
import React, { useRef, useState, useEffect } from "react";
import { Breadcrumbs, Button, Slider, Typography, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Tooltip from "@mui/material/Tooltip";
import BasicDatePicker from "@/Components/days";
import DatePicker from "@mui/lab/DatePicker";
import { forwardRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { isEmpty, set } from "lodash";
import Swal from "sweetalert2";
import { event } from "jquery";

const openDescription = (evt, DesName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
            " active",
            ""
        );
    }
    document.getElementById(DesName).style.display = "block";
    evt.currentTarget.className += " active";
};

const defaultOpen = () => {
    document.getElementById("defaultOpen").click();
};

// hàm cộng ngày
const addDays = (selectedDate, days) => {
    const date = new Date(selectedDate.date);
    date.setDate(date.getDate() + 1);
    return date;
};
  
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DetailTour(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    
    const detailTour = usePage().props.detailTour;
    const availableDays = detailTour.tour_ngay.map((item) => {
        let ngay = new Date(item.ngay);
        // cộng thêm 1 ngày vì ngày lấy từ database là ngày trước
        ngay.setDate(ngay.getDate() + 1);
        console.log(ngay.toISOString().split('T')[0]);
        console.log(new Date().toISOString().split('T')[0] == ngay.toISOString().split('T')[0]);
        if (ngay.toISOString().split('T')[0] == new Date().toISOString().split('T')[0]) {
            // bỏ qua ngày hôm nay nếu quá giờ khởi hành
            let time = new Date();
            let hours = time.getHours();
            let minutes = time.getMinutes();
            let timeDeparture = detailTour.gio_khoi_hanh.split(":");
            if (hours > parseInt(timeDeparture[0])) {
                return false; // Trả về false để loại bỏ phần tử này khỏi mảng
            } else if (hours == parseInt(timeDeparture[0])) {
                if (minutes > parseInt(timeDeparture[1])) {
                    return false; // Trả về false để loại bỏ phần tử này khỏi mảng
                }
            }
        }
        return item.ngay;
    }).filter(Boolean); // Lọc bỏ các giá trị undefined từ mảng
    console.log(availableDays);
    
    const extraServices = usePage().props.extraServices;
    const schedule = usePage().props.lichTrinh;
    const totalPrice = 0;
    const forcusAdult = usePage().props.forcusAdult;
    const forcusYouth = usePage().props.forcusYouth;
    const forcusChild = usePage().props.forcusChild;
    const customer = usePage().props.customer;
    const lang = usePage().props.lang;
    const _lang = usePage().props._lang;
    const today = new Date().toISOString().split('T')[0];
    const [status_list, setStatusList] = useState(0);
    let flag = availableDays.some((item) => {
        let dates = new Date(item);
        let today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00.000
        return dates.getTime() >= today.getTime();
    });
    // lấy ngày đầu tiên trong mảng ngày mà không disabled
    const [selectedDate, setSelectedDate] = useState({
        id: 0,
        date: null,
        price: 0,
        price_adult: 0,
        price_youth: 0,
        price_child: 0,
        so_cho: 0,
    });
    const [originalPrices, setOriginalPrices] = useState({
        adult: selectedDate.price_adult,
        youth: selectedDate.price_youth,
        child: selectedDate.price_child,
      });

      const [countPrice, setCountPrice] = useState(0);
      const handleCountPrice = (event) => {
          extraServices.map((extraService, index) => {
              if (event.target.name == `extra${index}`) {
                  if (event.target.checked) {
                      setCountPrice(countPrice + extraService.price);
                      data.extra.push(extraService.id);
                  } else {
                      setCountPrice(countPrice - extraService.price);
                  }
              }
          });
      };
      const { data, setData, post, progress, processing, errors, reset } =
      useForm({
          adult: 1,
          price_adult: selectedDate.price_adult,
          youth: 0,
            price_youth: selectedDate.price_youth,
          child: 0,
            price_child: selectedDate.price_child,
          totalPrice: countPrice,
          available: selectedDate.so_cho,
          extra: [],
          timeDeparture: detailTour.gio_khoi_hanh,
          date_id: selectedDate.id,
          dateDeparture: selectedDate.date,
          tourId: detailTour.slug,
            lang: _lang,
      });

  const handleDateChange = (newDate) => {
    const newDates = new Date(newDate);
    newDates.toISOString().split('T')[0];

    // check if the date is available
    detailTour.tour_ngay.map((item) => {
        if (item.ngay == newDates.toISOString().split('T')[0]) {
            setSelectedDate({
            id: item.id,
            date: item.ngay,
            date_current: newDates,
            price: item.gia,
            price_adult: item.gia * (data.adult == 0 ? 1 : data.adult),
            price_youth: item.gia * 0.8 * data.youth,
            price_child: item.gia * 0.5 * data.child,
            so_cho: item.so_cho,
            });
            setOriginalPrices({
            adult: item.gia,
            youth: item.gia * 0.8,
            child: item.gia * 0.5,
            });
            setCountPrice(item.gia * (data.adult == 0 ? 1 : data.adult) + item.gia * 0.8 * data.youth + item.gia * 0.5 * data.child);
        }
        });
  };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (selectedDate.id != 0) {
         switch (event.target.name) {
            case 'adult':
                selectedDate.price_adult = originalPrices.adult * event.target.value;
                data.adult = parseInt(event.target.value);
                setData('price_adult', selectedDate.price_adult);
                break;
            case 'youth':
                selectedDate.price_youth = originalPrices.youth * event.target.value;
                data.youth = parseInt(event.target.value);
                data.price_youth = selectedDate.price_youth;
                setData('price_youth', selectedDate.price_youth);
                break;
            case 'child':
                selectedDate.price_child = originalPrices.child * event.target.value;
                data.child = parseInt(event.target.value);
                data.price_child = selectedDate.price_child;
                setData('price_child', selectedDate.price_child);
                break;
            default:
                break;
            }
            setCountPrice(selectedDate.price_adult + selectedDate.price_youth + selectedDate.price_child);
            setData('totalPrice', selectedDate.price_adult + selectedDate.price_youth + selectedDate.price_child);
        }
    };
    const numberFormat = (value) => {
        if(_lang == 'en')
        value = value * 0.000040;
        return new Intl.NumberFormat(lang['vi-VN'], {
            style: "currency",
            currency: lang['VND'],
        }).format(value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // nếu ngày khởi hành rỗng hoặc ngày trong quá khứ
        if (availableDays.length == 0) {
            Swal.fire({
                title: "OOps!",
                text: "Hiện tại tour chưa lên lịch. Bạn có thể đưa vào danh sách yêu thích chúng tôi sẽ phản hồi trong thời gian sớm nhất hoặc bạn có thể kham khảo các tour liên quan!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        } else {
            if (flag == false) {
                Swal.fire({
                    title: "OOps!",
                    text: "Hiện tại tour chưa lên lịch. Bạn có thể đưa vào danh sách yêu thích chúng tôi sẽ phản hồi trong thời gian sớm nhất hoặc bạn có thể kham khảo các tour liên quan!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
        }

        if (selectedDate.id == 0) {
            Swal.fire({
                title: "Bạn chưa chọn ngày khởi hành!",
                icon: "error",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }
        if (selectedDate.so_cho < parseInt(data.adult) + parseInt(data.youth) + parseInt(data.child)) {
            Swal.fire({
                title: "OOps!",
                text: "Số lượng người tham gia không được vượt quá số chỗ còn lại!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        // if(detailTour.so_cho == 'Hết chỗ'){
        //     Swal.fire({
        //         title: "OOps!",
        //         text: "Tour này đã hết chỗ, bạn vui lòng chọn tour khác!",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //     });
        //     return;
        // }
        // if(detailTour.ngay_khoi_hanh == 'Đã khởi hành'){
        //     Swal.fire({
        //         title: "OOps!",
        //         text: "Tour này đã hết hạn, bạn vui lòng chọn tour khác!",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //     });
        //     return;
        // }
        // if(detailTour.isBooked == 2){
        //     Swal.fire({
        //         title: "OOps!",
        //         text: "Bạn đã đặt tour này rồi, bạn vui lòng chọn tour khác!",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //     });
        //     return;
        // }else if (detailTour.isBooked == 1){
        //     Swal.fire({
        //         title: "OOps!",
        //         text: "Tour bạn đặt đang trong quá trình xử lý, bạn vui lòng chọn tour khác!",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //     });
        //     return;
        // }

        router.get(route("booking"), {
            lang: _lang,
            adult: data.adult,
            price_adult: selectedDate.price_adult,
            youth: data.youth,
            price_youth: selectedDate.price_youth,
            child: data.child,
            price_child: selectedDate.price_child,
            totalPrice: countPrice,
            date: selectedDate.date,
            date_id: selectedDate.id,
            tourId: detailTour.slug,
            extra: data.extra,
            available: selectedDate.so_cho,
            timeDeparture: detailTour.gio_khoi_hanh,
            lang: _lang,
        });
    };

    const [state, setState] = useState({
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenEdit(false);
    };
    
    const [isAdded, setIsAdded] = useState(detailTour.isFavorite);


    const addtoList = (event, id) => {
        // chỉ thực hiện khi đăng nhập
        if(isEmpty(customer)) {
            Swal.fire({
                title: "Bạn chưa đăng nhập",
                text: "Bạn cần đăng nhập để thực hiện chức năng này!",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng nhập",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = route("customer.login", {
                        redirect: window.location.href,
                        lang: _lang,
                        
                    });
                }
            });
            return;
        } else {
            let status = event.target.dataset.status;
            event.target.dataset.status = status == 1 ? 0 : 1;
            setStatusList(status == 1 ? 0 : 1);
                fetch("/api/addtoList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Origin": "*",
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        
                    },
                    body: JSON.stringify({
                        id_customer: customer.id,
                        id: id,
                        status: event.target.dataset.status,
                    }),
                    // cho phép handle cookie
                    credentials: "include",
                    // cho phep truy cap cookie
                    mode: "cors",
                    // cho phép handle session
                    // credentials: "include",



                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if(data.error){
                            Swal.fire({
                                title: data.error,
                                icon: "error",
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            return;
                        }
                        setOpenEdit(true);
                        if (event.target.dataset.status == 1) {
                        setIsAdded(true);
                        } else {
                        setIsAdded(false);
                        }
                    }).
                    catch((error) => {
                        console.log(error);
                    });
                }
    }

    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={route("welcome", { lang: _lang })}
            style={{ textDecoration: "none", color: "white" }}
        >
            {lang['Home']}
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href={route("tour", { lang: _lang })}
            style={{ textDecoration: "none", color: "white" }}
        >
            {lang['Tour']}
        </Link>,
        <Typography key="2" color="text.primary" style={{ color: "white" }}>
            {detailTour.ten_tour}
        </Typography>,
    ];
    const [value, setValue] = React.useState(null);
    return (
        <>
            <Head title="Detail Tour" />
            <Content>
            <Snackbar
                open={openEdit}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical,
                    horizontal,
                }}
                key={vertical + horizontal}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    style={{
                        width: "100%",
                        Zindex: "999",
                    }}
                >
                    {status_list == 0 ? lang['Remove from list success'] : lang['Add to list success']}
                </Alert>
            </Snackbar>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> {lang['Tours Detail']}</h1>
                            <div className="flex justify-content-center">
                                <Breadcrumbs
                                    separator={
                                        <NavigateNextIcon
                                            fontSize="small"
                                            style={{ color: "white" }}
                                        />
                                    }
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container-layout"
                    style={{ paddingTop: "10px" }}
                >
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8 width-100">
                                <div className="bade-result">
                                    <div className="count-post">
                                        {detailTour.dia_chi}
                                    </div>
                                    {!isAdded ? (
                                    <>
                                    <div className="filter-sort pointer" onClick={(event) => addtoList(event, detailTour.ma_tour)} data-status="0">
                                        <i className="fa-regular fa-heart mr-5"></i>{" "}
                                        {lang['Add to wishlist']}
                                    </div>
                                    </>
                                    ) : (
                                    <>
                                    <div className="filter-sort pointer" onClick={(event) => addtoList(event, detailTour.ma_tour)} data-status="1">
                                        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="-64 -64 192.00 192.00" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00064">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <path fill="#F76D57" d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56 s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21 C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677 l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"></path>
                                                    <path fill="#F76D57" d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56 s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21 C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677 l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"></path>
                                                    <g>
                                                        <path fill="#394240" d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0 c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9 c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172 c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M58.714,29.977 c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56s-1.023-0.195-1.414-0.586 c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21C2,13.268,8.268,7,16,7 c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009 C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"></path>
                                                        <path fill="#394240" d="M48,11c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1 C58,15.478,53.522,11,48,11z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>{" "}
                                        {lang['Remove from wishlist']}
                                    </div>
                                    </>
                                    )}
                                </div>
                                <h1 className="heading-title">
                                    {detailTour.ten_tour}
                                </h1>
                                <div className="row">
                                    <div className="col">
                                        <div className="inner">
                                            <label>{lang['From']}</label>
                                            <span className="currency-amount">
                                                {numberFormat(detailTour.gia_nguoi_lon)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>{lang['From']}</label>
                                            <span>
                                                {detailTour.so_ngay} {lang['days']}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>{lang['Max people']}</label>
                                            <span>{selectedDate.so_cho}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>{lang['Min age']}</label>
                                            <span>
                                                {detailTour.do_tuoi_tu}+
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="inner">
                                            <label>{lang['Tour Type']}</label>
                                            <div className="type-tour">
                                                <a href="">
                                                    {detailTour.loai_tour}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="inner">
                                            <label>{lang['Date depart']}</label>
                                            <span>
                                                {selectedDate.date != null ? (
                                                    // cộng thêm 1 ngày vì ngày lấy từ database là ngày trước
                                                    <>
                                                    
                                                    {
                                                    new Date(selectedDate.date_current).toLocaleDateString(lang['vi-VN'], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                                                    }

                                                    </>
                                                ) : (
                                                    <>
                                                    {flag == false ? (
                                                        <>{lang['Not update']}</>
                                                    ) : (
                                                    <>{lang['Choose date']}</>
                                                    )}
                                                    </>
                                                )}
                                            </span>
                                            {/* <label>Reviews</label>
                                            <div className="post-rating-star">
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <span>4,5/5</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="bade-inner">
                                    {/* <!-- Swiper --> */}
                                    <>
                                        <Swiper
                                            style={{
                                                "--swiper-navigation-color":
                                                    "#fff",
                                                "--swiper-pagination-color":
                                                    "#fff",
                                                zIndex: 0,
                                            }}
                                            loop={true}
                                            spaceBetween={10}
                                            navigation={true}
                                            thumbs={{ swiper: thumbsSwiper }}
                                            modules={[
                                                FreeMode,
                                                Navigation,
                                                Thumbs,
                                            ]}
                                            className="mySwiper2"
                                        >
                                            {detailTour.hinh_anh.map((item) => (
                                                <SwiperSlide className="widen">
                                                    <img
                                                        src={`http://localhost:8000/storage/${item.ten}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[
                                                FreeMode,
                                                Navigation,
                                                Thumbs,
                                            ]}
                                            className="mySwiper mySwiper-details"
                                            style={{
                                                zIndex: 0,
                                            }}
                                        >
                                            {detailTour.hinh_anh.map((item) => (
                                                <SwiperSlide>
                                                    <img
                                                        src={`http://localhost:8000/storage/${item.ten}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </>
                                </div>
                            </div>
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ borderLeft: "none" }}
                            >
                                <div className="sidebar-form">
                                    <div className="search-available">
                                        <div className="booking-form__block">
                                            <h6 className="post-title">
                                                {lang['Book This Tour']}
                                            </h6>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="booking-form"
                                            >
                                                <div className="input-group">
                                                    <div className="booking-block">
                                                    <div>
                                                    <BasicDatePicker
                                                        value={selectedDate.ngay}
                                                        onChange={handleDateChange}
                                                        days={availableDays}
                                                    />
                                            </div>
                                                    </div>
                                                    <div className="booking-block">
                                                        <span
                                                            className="booking_form"
                                                            style={{
                                                                lineHeight:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {lang['Time']}
                                                        </span>
                                                        <span className="booking-clock">
                                                            {
                                                                detailTour.gio_khoi_hanh
                                                                // detailTour.gio_khoi_hanh
                                                                // new Date(detailTour.ngay_khoi_hanh).toLocaleTimeString(lang['vi-VN'], { hour: '2-digit', minute: '2-digit' })
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="booking-block">
                                                            {/* <Tooltip title="Liên hệ" placement="top" arrow> */}
                                                            <span
                                                            className="booking_form"
                                                            style={{
                                                                lineHeight:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {lang['Contact']}
                                                        </span>
                                                        <span className="booking-clock">
                                                            0987654321
                                                        </span>
                                                            {/* </Tooltip> */}
                                                    </div>
                                                    <div className="booking-ticket">
                                                        <label className="booking_form">
                                                            {lang['Tickets']}
                                                        </label>
                                                        <div className="booking-guests-result">
                                                            <ul>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        {lang['Adult']}
                                                                        (18+
                                                                        {lang['years']})
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            selectedDate.price_adult
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="adult"
                                                                        id="adult"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.adult
                                                                        }
                                                                    >
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5
                                                                        </option>
                                                                        <option value="6">
                                                                            6
                                                                        </option>
                                                                        <option value="7">
                                                                            7
                                                                        </option>
                                                                        <option value="8">
                                                                            8
                                                                        </option>
                                                                        <option value="9">
                                                                            9
                                                                        </option>
                                                                        <option value="10">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        {lang['Youth']}
                                                                        (13-17
                                                                        {lang['years']})
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            selectedDate.price_youth
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="youth"
                                                                        id="youth"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.youth
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            0
                                                                        </option>
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5
                                                                        </option>
                                                                        <option value="6">
                                                                            6
                                                                        </option>
                                                                        <option value="7">
                                                                            7
                                                                        </option>
                                                                        <option value="8">
                                                                            8
                                                                        </option>
                                                                        <option value="9">
                                                                            9
                                                                        </option>
                                                                        <option value="10">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        {lang['Children']}
                                                                        (0-12
                                                                        years)
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            selectedDate.price_child
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="child"
                                                                        id="child"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.child
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            0
                                                                        </option>
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5
                                                                        </option>
                                                                        <option value="6">
                                                                            6
                                                                        </option>
                                                                        <option value="7">
                                                                            7
                                                                        </option>
                                                                        <option value="8">
                                                                            8
                                                                        </option>
                                                                        <option value="9">
                                                                            9
                                                                        </option>
                                                                        <option value="10">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="services-block">
                                                        <label className="booking_form">
                                                            {lang['Extra services']}
                                                        </label>
                                                        <div className="list-services">
                                                            {extraServices.map(
                                                                (
                                                                    service,
                                                                    index
                                                                ) => (
                                                                    <i
                                                                        className="qtip tip-left"
                                                                        data-tip={
                                                                            service.description
                                                                        }
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`extra${index}`}
                                                                            name={`extra${index}`}
                                                                            value={
                                                                                service.name
                                                                            }
                                                                            onChange={
                                                                                handleCountPrice
                                                                            }
                                                                        />
                                                                        <label
                                                                            for={`extra${index}`}
                                                                        >
                                                                            {
                                                                                service.name
                                                                            }
                                                                        </label>
                                                                        <span className="price-extra">
                                                                            {numberFormat(
                                                                                service.price
                                                                            )}
                                                                        </span>
                                                                    </i>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="total-group">
                                                    <label className="booking_form_input_label">
                                                        {lang['Total']}
                                                    </label>
                                                    <span
                                                        className="currency_amount"
                                                        data-amount="0"
                                                    >
                                                        {numberFormat(
                                                            countPrice
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="submit-group">
                                                        <Tooltip title={lang['Fill in information']} placement="top" arrow>
                                                    <button type="submit">
                                                            {lang['NEXT STEP']}{" "}
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </button>
                                                        </Tooltip>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-layout">
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8 width-100">
                                <div className="content-tabs">
                                    <div className="tab">
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Overview"
                                                )
                                            }
                                            id="defaultOpen"
                                            ref={defaultOpen}
                                        >
                                            {lang['Overview']}
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Tourplan"
                                                )
                                            }
                                        >
                                            {lang['Tour plan']}
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Location"
                                                )
                                            }
                                        >
                                            {lang['Location']}
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Reviews"
                                                )
                                            }
                                        >
                                            {lang['Reviews']}
                                        </button>
                                    </div>

                                    <div id="Overview" className="tabcontent">
                                        <div className="content-tab">
                                            <h2 className="heading-title">
                                                {lang['Description']}
                                            </h2>
                                            <Description>
                                                {detailTour.mo_ta != null ? (
                                                    <>{detailTour.mo_ta}</>
                                                ) : (
                                                    <>{lang['Now we have no description']}</>
                                                )}
                                            </Description>
                                        </div>
                                        <div className="highlights-box">
                                            <div className="highlight-inner">
                                                <div className="thumb">
                                                    <img
                                                        src="../images/detail-tour/img_single_tour_1.webp"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5 className="heading-title">
                                                        {lang['Highlights']}
                                                    </h5>
                                                    <Highlight />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="Tourplan" className="tabcontent">
                                        <h2 className="heading-title">
                                            {lang['Tour Plan']}
                                        </h2>
                                        {isEmpty(schedule) ? (
                                            <div className="alert alert-danger">
                                                {lang['Now we have no schedule']}
                                            </div>
                                        ) : (
                                            <>
                                                {schedule.map((item, index) => (
                                                    <Tourplan>
                                                        {/* <div className="float-right">
                                                            {
                                                                item.lich_trinh_ngay
                                                            }
                                                        </div> */}
                                                        <h4 className="card-title">
                                                            {/* <span>Day 2</span> Sessions */}
                                                            {item.tieu_de}
                                                        </h4>
                                                        <p className="card-text">
                                                            {/* get data in database have format html */}

                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.noi_dung,
                                                                }}
                                                            />
                                                        </p>
                                                    </Tourplan>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <div id="Location" className="tabcontent">
                                        <h2 className="heading-title">
                                            {lang['Location']}
                                        </h2>
                                        <Location
                                            src={detailTour.du_lieu_map}
                                        />
                                    </div>

                                    <div id="Reviews" className="tabcontent">
                                        <h2 className="heading-title">
                                            {lang['Reviews']}
                                        </h2>
                                        <Rating />
                                        <div className="comment-list__wrap">
                                            <Comment />
                                            <Reply />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ border: "none" }}
                            >
                                <div className="tour-content__item">
                                    <div className="tour-content__item-grid">
                                        <div className="inner">
                                            <a href="#" className="inner-cta">
                                                <div className="cta-bg-wrapper">
                                                    <div className="bg"></div>
                                                    <div className="bg-overlay"></div>
                                                </div>
                                                <div className="cta-content">
                                                    <h2 className="cta-title">
                                                        {lang['Happy holiday']}
                                                    </h2>
                                                    <div className="cta-description">
                                                        {lang['Stay']} &amp; {lang['Enjoy']}
                                                        <br />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                                fontFamily:
                                                                    "jost",
                                                                fontWeight: 400,
                                                                letterSpacing: 0,
                                                                color: "var(--text)",
                                                            }}
                                                        >
                                                            15% {lang['off on all room types']}
                                                        </span>
                                                    </div>
                                                    <div className="cta-button__wrapper">
                                                        <span className="cta-button">
                                                            {lang['Book now']}
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="tour-content__item-grid">
                                        <div className="inner">
                                            <a href="#" className="inner-cta">
                                                <div className="cta-bg-wrapper">
                                                    <div className="bg"></div>
                                                    <div className="bg-overlay"></div>
                                                </div>
                                                <div className="cta-content">
                                                    <h2 className="cta-title">
                                                        {lang['Happy holiday']}
                                                    </h2>
                                                    <div className="cta-description">
                                                        {lang['Stay']} &amp; {lang['Enjoy']}
                                                        <br />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                                fontFamily:
                                                                    "jost",
                                                                fontWeight: 400,
                                                                letterSpacing: 0,
                                                                color: "#FFFFFF",
                                                            }}
                                                        >
                                                            {lang['Starting from']}{" "}
                                                            <span
                                                                style={{
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight: 600,
                                                                    color: "#4BD31B",
                                                                }}
                                                            >
                                                                $189
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="cta-button__wrapper">
                                                        <span className="cta-button">
                                                            {lang['Book now']}
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
