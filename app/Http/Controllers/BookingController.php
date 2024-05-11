<?php

namespace App\Http\Controllers;

use App\Jobs\TestMailJob;
use App\Models\ChiTietTour;
use App\Models\City;
use App\Models\District;
use App\Models\GuestRegisterTour;
use App\Models\KhachHang;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Tour;
use App\Models\Tour_ngay;
use App\Models\Ward;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Mail;
use Session;
use App\Models\KhuyenMai;

class BookingController extends Controller
{

    public function booking(Request $request) {
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        // dd($lang);
        $detailTour = null;
        $customer = null;
        $dateDeparture = null;
        // cộng thêm 1 ngày để đúng với ngày khởi hành
        if(request("dateDeparture")){
            $dateDeparture = strtotime(request("dateDeparture") . "+1 day");
        }
        if(request()->cookie('remember')){
            $customer = KhachHang::where('remember_token', request()->cookie('remember'))->first();
        }
        if (session()->has('customer')){
            $customer = KhachHang::find(session('customer'));
        }
        if(request("tourId")){
            $detailTour = DB::table('tour_diadiems')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('loai_tours', 'dia_diems.ma_loai_tour', '=', 'loai_tours.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu',  'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->where('tours.slug', request("tourId"))
            ->groupBy('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->first();
            $detailTour->slug = request("tourId");
            $detailTour->ngay_khoi_hanh = date("d/m/Y", $dateDeparture);
            if(request("totalPrice")){
                $detailTour->totalPrice = request("totalPrice");
            }

            $detailTour->adults = (request("adult")) ?? 1;
            $detailTour->priceAdults = (request("price_adult"));
            $detailTour->counttraveller = (request("adult")) ?? 1;
            $detailTour->subtotal = $detailTour->priceAdults;
            
            if(request("youth")){
                $detailTour->youth = request("youth");
                $detailTour->priceYouth = request("price_youth");
                $detailTour->subtotal += $detailTour->priceYouth;
                $detailTour->counttraveller += request("youth");
            }
            
            if(request("child")){
                $detailTour->child = request("child");
                $detailTour->priceChild = request("price_child");
                $detailTour->subtotal += $detailTour->priceChild;
                $detailTour->counttraveller += request("child");
            } else {
                $detailTour->child = 0;
                // $detailTour->priceChild = 0;
            }
            
            if(request("extra")){
                for($i = 0; $i < count(request("extra")); $i++){
                    $extra = DB::table('extra_services')
                    ->select('extra_services.name', 'extra_services.price', 'extra_services.id', 'extra_services.description')
                    ->where('extra_services.id', request("extra")[$i])
                    ->first();
                    $detailTour->extra[] = $extra;
                }
                $detailTour->priceExtra = 0;
                for($i = 0; $i < count($detailTour->extra); $i++){
                    $detailTour->priceExtra += $detailTour->extra[$i]->price;
                }
            }
            
            if(request("timeDeparture")){
                $detailTour->timeDeparture = request("timeDeparture");
            }

            if(request(('available'))){
                $detailTour->available = request("available");
            }

            if(request('date_id')) {
                $tour_ngay = DB::table('tour_ngay')
                ->select('*')
                ->where('id', request('date_id'))
                ->first();
                $detailTour->date_id = request('date_id');
                $detailTour->get_price = $tour_ngay->gia;
                $detailTour->ngay_khoi_hanh = date("d/m/Y", $tour_ngay->ngay);
                $detailTour->so_cho = $tour_ngay->so_cho;
            }
        //     $detailTour->get_price = DB::table('tour_ngay')
        // ->select('*')
        // ->where('id', request('date_id'))
        // ->first()->gia;            
        // $detailTour->date_id = request('date_id');
        }
        return Inertia::render("Booking/TourBooking", compact('detailTour', 'customer', 'lang', '_lang'));
    }

    public function apply_coupon(Request $request, $coupon) {
        
        $date = date('Y-m-d');
        // cho in ra câu lệnh sql
        // dd('SELECT * FROM khuyen_mais WHERE title = \'' . $coupon . '\' AND is_delete = 0 AND ngay_bat_dau <= ' . strtotime($date) . ' AND ngay_ket_thuc >= ' . strtotime($date));
        $get_coupon = KhuyenMai::where('title', $coupon)
        ->where('is_delete', 0)
        ->where('so_lan_su_dung', '>', 0)
        ->where('ngay_bat_dau', '<=', strtotime($date))
        ->where('ngay_ket_thuc', '>=', strtotime($date))
        ->first();
        if($get_coupon){
            return response()->json(['status' => 'success', 'message' => 'Mã giảm giá hợp lệ', 'coupon' => $get_coupon]);
        }
        return response()->json(['status' => 'error', 'message' => 'Mã giảm giá không hợp lệ', 'coupon' => $get_coupon]);
    }
    
    public function checkout(Request $request)
    {
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $getAddress = request("address") . ", " . request("ward") . ", " . request("district") . ", " . request("city");
        $getBooking['extra'] = request("extra");
        if(request("extra") != null){
            for($i=0;$i<count(request("extra"));$i++){
                $getExtra = DB::table('extra_services')
                ->select('extra_services.name', 'extra_services.price', 'extra_services.id', 'extra_services.description')
                ->where('extra_services.id', request("extra")[$i])
                ->first();
                $getBooking['extra'][] = $getExtra;
            }
        }
        // kiểm tra xem có dịch vụ nào không có tên không nếu có thì xóa và chinh sua lai mang
        if(isset($getBooking['extra'])){
            for($i=0;$i<count($getBooking['extra']);$i++){
                if(!isset($getBooking['extra'][$i]->name)){
                    unset($getBooking['extra'][$i]);
                }
            }
        }
        $getBooking['extra'] = array_values($getBooking['extra']);

        $detailTour = DB::table('tour_diadiems')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('loai_tours', 'dia_diems.ma_loai_tour', '=', 'loai_tours.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tours.id as tourId','tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->where('tours.ky_hieu', request("code"))
            ->groupBy('tours.id','tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->first();
        
        // $detailTour->ngay_khoi_hanh = date("d/m/Y", strtotime(request("departDate")));
        $detailTour->gio_khoi_hanh = date("H:i", strtotime($detailTour->gio_khoi_hanh));
        $detailTour->so_cho = request("available");
        if(request('date_id')) {
            $tour_ngay = DB::table('tour_ngay')
            ->select('*')
            ->where('id', request('date_id'))
            ->first();
            $detailTour->date_id = request('date_id');
            $detailTour->get_price = $tour_ngay->gia;
            $detailTour->ngay_khoi_hanh = date("d/m/Y", $tour_ngay->ngay);
            $detailTour->so_cho = $tour_ngay->so_cho - $tour_ngay->so_cho_da_dat;
        }
    //     $detailTour->get_price = DB::table('tour_ngay')
    // ->select('*')
    // ->where('id', request('date_id'))
    // ->first()->gia;       
        $getBooking = [
            'name' => request("name"),
            'phone' => request("phone"),
            'email' => request("email"),
            'customer_address' => $getAddress,
            'note' => request("note"),
            'adult' => request("adults"),
            'priceAdults' => request("priceAdults"),
            'youth' => request("youth"),
            'priceYouth' => request("priceYouth"),
            'child' => request("child"),
            'priceChild' => request("priceChild"),
            'image' => request("image"),
            'departLocation' => request("departLocation"),
            'subtotal' => request("subtotal"),
            'totalPrice' => request("totalPrice"),
            'extra' => $getBooking['extra'],
            'get_price' => $detailTour->get_price,
            'coupon' => request("coupon"),
            'coupon_id' => request("coupon_id"),
            'date_id' => request("date_id"),
        ];
        for($i=0;$i<request("countTraveller");$i++){
            if(request('age_'.$i) == 1)
                $getAge = "0 - 12";
            else if(request('age_'.$i) == 2)
                $getAge = "13 - 17";
            else if(request('age_'.$i) == 3)
                $getAge = "18 + 20";
            $getFullName = request('first_name_'.$i) . " " . request('last_name_'.$i);
            $getBooking['travellers'][$i] = [
                'name' => $getFullName,
                'phone' => request('phone_'.$i),
                'CMND' => request('citizen_identification_'.$i),
                'age' => request('age_'.$i),

            ];
        }
        return Inertia::render("Booking/Checkout", compact('getBooking', 'detailTour', 'lang', '_lang'));
    }

    public function process(Request $request){
        try{
            // $lang = $request->query('lang');
            // $_lang = $lang;
            // $lang = $this->getLanguage($lang);
            $data = $request->all();
            $lang = $data['_lang'];
            $_lang = $lang;
            $lang = $this->getLanguage($lang);
            $order = new Order();
            $check_customer = KhachHang::where('email', $data['email'])->first();
            if($check_customer !== null){
                $order->ma_khach_hang = $check_customer->id;
            }
            if(session()->has("customer")){
                $order->ma_khach_hang = session()->get("customer");
            }
            if (isset($_COOKIE['remember'])){
                $remember = request()->cookie('remember');
                $customer = KhachHang::where('remember_token', $remember)->first();
                $order->ma_khach_hang = $customer->id;
            }
            $formatDate = Carbon::createFromFormat('d/m/Y', $data['date'])->toDateString();
            $order->ten_nguoi_dat = $data['name'];
            $order->so_dien_thoai = $data['phone'];
            $order->email = $data['email'];
            $order->dia_chi = $data['address'];
            $order->gio_khoi_hanh = $data['time'];
            $order->ngay_khoi_hanh = $formatDate;
            $order->tong_tien = $data['total'];
            $order->hinh_thuc_thanh_toan = $data['payment'];
            $order->ghi_chu = $data['note'];
            $order->ma_tour = $data['tour_id'];
            $order->ma_tour_ngay = $data['date_id'];
            if($data['payment'] == "0"){
                $order->trang_thai = "1";
            }
            if($data['payment'] == "2"){
                $order->trang_thai = "2";
                // if($order->ma_khach_hang !== null){
                //     $customer = KhachHang::find($order->ma_khach_hang);
                //     $countTour = $customer->tong_so_tour_da_di;
                //     $customer->update([
                //         "tong_so_tour_da_di" => $countTour + 1
                //     ]);

                // }
            }
            if($order->save()){
                // luu thong tin khach hang da dat tour vao session
                // luu thong tin khach hang vao bang guest_register_tour
                for($i=0;$i<count($data['travellers']);$i++){
                    $data['travellers'][$i]['order_id'] = $order->id;
                    GuestRegisterTour::create($data['travellers'][$i]);
                }
                
                $order_detail = new Order_detail();
                $order_detail->order_id = $order->id;
                $order_detail->ma_tour = $data['tour_id'];
                $order_detail->so_luong_nguoi = count($data['travellers']);
                $order_detail->total = $data['total'];
                if($data['note'] != null){
                    $order_detail->ghi_chu = $data['note'];
                }
                $order_detail->save();
                // if ($data['payment'] == "2"){
                //     $tour = Tour::find($data['tour_id']);
                //     $tour->so_cho = $tour->so_cho - count($data['travellers']);
                //     $tour->so_cho_da_dat = $tour->so_cho_da_dat + count($data['travellers']);
                //     $tour->saveOrFail();

                // }
                $date = Carbon::createFromFormat('d/m/Y', $data['date'])->toDateString();
                $tour_ngay = DB::table('tour_ngay')
                ->select('*')
                ->where('ma_tour', $data['tour_id'])
                ->where('ngay', strtotime($date))
                ->first();    
                if($tour_ngay){
                    $tour_ngay = Tour_ngay::find($tour_ngay->id);
                    $tour_ngay->so_cho_da_dat = $tour_ngay->so_cho_da_dat + count($data['travellers']);
                    $tour_ngay->SaveOrFail();
                }

                // nếu có sử dụng coupon thì cập nhật trạng thái coupon
                if($data['coupon_id'] != null){
                    $coupon = KhuyenMai::where('id' , $data['coupon_id'])->first();
                    $coupon->so_lan_su_dung = $coupon->so_lan_su_dung - 1;
                    $coupon->saveOrFail();
                }

                // nếu đang đăng nhập thì không cần lưu thông tin khách hàng
                if (session()->has("customer") || isset($_COOKIE['remember'])) {
                    return redirect()->route("checkout.success", ['order' => $order->id, 'lang' => $lang, '_lang' => $_lang]);
                } else {
                    // nếu chưa đăng nhập thì lưu thông tin khách hàng
                    $customer = KhachHang::where('email', $data['email'])
                    ->first();
                    if($customer == null){
                        $customer = new KhachHang();
                        $customer->ten_khach_hang = $data['name'];
                        $customer->citizen_identification_number = $data['citizen_identification_number'] ?? null;
                        $customer->email = $data['email'];
                        $customer->so_dien_thoai = $data['phone'];
                        $customer->dia_chi = $data['address'];
                        $customer->created_by = 'SYSTEM';
                        $customer->saveOrFail();
                    }
                    $order->ma_khach_hang = $customer->id;
                    $order->saveOrFail();
                    return redirect()->route("checkout.success", ['order' => $order->id, 'lang' => $lang, '_lang' => $_lang]);
                }
            }
            return redirect()->back()->with('error', 'Đặt tour thất bại. Vui lòng thử lại sau');
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function success(){
        if (request('order') == null)
            return redirect()->route('welcome');
        $lang = request('_lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $tour_id = Order_detail::where('order_id', request('order'))->first();
        $getOrder = Order::where('id', request('order'))->first();
        $getSlug = Tour::where('id', $tour_id->ma_tour)->first('slug');
        $getNameTour = Tour::where('id', $tour_id->ma_tour)->first('ten_tour');
        $customer = $getOrder->ten_nguoi_dat;
        $email = $getOrder->email;
        // địa điểm khởi hành
        $departLocation = ChiTietTour::where('ma_tour', $tour_id->ma_tour)->first('noi_khoi_hanh');
        // phương tiện
        $transpost = Tour::where('id', $tour_id->ma_tour)->first();
        // lấy ra ngày kết thúc dựa vào ngày khởi hành và số ngày
        $end_date = strtotime($getOrder->ngay_khoi_hanh . ' + ' . $transpost->so_ngay . ' days');
        $end_date = date('d/m/Y', $end_date);
        $messages = [
            'name' => $customer,
            'tour' => $getNameTour->ten_tour,
            'start_date' => $getOrder->ngay_khoi_hanh,
            'end_date' => $end_date,
            'total_people' => $tour_id->so_luong_nguoi,
            'total_price' => $tour_id->total,
            'payment' => $getOrder->hinh_thuc_thanh_toan == 0 ? 'Thanh toán khi nhận vé' : 'Thanh toán qua chuyển khoản',
            // 'status' => $getOrder->trang_thai,
            'location' => $departLocation->noi_khoi_hanh,
            'transpost' => $transpost->transpost,
            'action' => 'booking'
        ];
        dispatch(new TestMailJob($messages, $email))->delay(now()->addMinutes(1));
        return Inertia::render('Booking/Success', compact('getSlug', 'lang', '_lang'));
    }

    public function getLanguage($lang)
    {
        $this->language = $lang??'en';
    
        // dd($this->language);
        $langFilePath = base_path('lang/' . $this->language . '/home.php');
        if (file_exists($langFilePath)) {
            $lang = include $langFilePath;
            $data = array();
            foreach ($lang as $key => $value) {
                $data[$key] = ($value);
            }
            return $data;
        } else {
            return array();
        }
    }
}
