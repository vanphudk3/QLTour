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
use App\Models\Ward;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Mail;
use Session;

class BookingController extends Controller
{

    public function booking(){
        
        $detailTour = null;
        $customer = null;
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
            ->select('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->where('tours.slug', request("tourId"))
            ->groupBy('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->first();

            $detailTour->ngay_khoi_hanh = date("d/m/Y", strtotime($detailTour->ngay_khoi_hanh));
            if(request("totalPrice")){
                $detailTour->totalPrice = request("totalPrice");
            }

            $detailTour->adults = (request("adult") + 1);
            $detailTour->priceAdults = (request("adult") + 1) * $detailTour->gia_nguoi_lon;
            $detailTour->counttraveller = (request("adult") + 1);
            $detailTour->subtotal = $detailTour->priceAdults;
            
            if(request("youth")){
                $detailTour->youth = request("youth");
                $detailTour->priceYouth = request("youth") * $detailTour->gia_thieu_nien;
                $detailTour->subtotal += $detailTour->priceYouth;
                $detailTour->counttraveller += request("youth");
            }
            
            if(request("child")){
                $detailTour->child = request("child");
                $detailTour->priceChild = request("child") * $detailTour->gia_tre_em;
                $detailTour->subtotal += $detailTour->priceChild;
                $detailTour->counttraveller += request("child");
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
            
        }
        return Inertia::render("Booking/TourBooking", compact('detailTour', 'customer'));
    }
    
    public function checkout()
    {
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
        
        $detailTour->ngay_khoi_hanh = date("d/m/Y", strtotime($detailTour->ngay_khoi_hanh));
        $detailTour->gio_khoi_hanh = date("H:i", strtotime($detailTour->gio_khoi_hanh));

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
        ];
        for($i=0;$i<request("countTraveller");$i++){
            if(request('age_'.$i) == null)
                return redirect()->back()->with('error', 'Vui lòng chọn đầy đủ thông tin khách hàng');
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
                'age' => $getAge,

            ];
        }

        return Inertia::render("Booking/Checkout", compact('getBooking', 'detailTour'));
    }

    public function process(Request $request){
        try{
            $data = $request->all();

            $order = new Order();
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
            if($data['payment'] == "0"){
                $order->trang_thai = "1";
            }
            if($data['payment'] == "2"){
                $order->trang_thai = "2";
                if($order->ma_khach_hang !== null){
                    $customer = KhachHang::find($order->ma_khach_hang);
                    $countTour = $customer->tong_so_tour_da_di;
                    $customer->update([
                        "tong_so_tour_da_di" => $countTour + 1
                    ]);

                }
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
                if ($data['payment'] == "2"){
                    $tour = Tour::find($data['tour_id']);
                    $tour->so_cho = $tour->so_cho - count($data['travellers']);
                    $tour->so_cho_da_ban = $tour->so_cho_da_ban + count($data['travellers']);
                    $tour->saveOrFail();

                }
                return redirect()->route("checkout.success", ['order' => $order->id]);
            }
            return redirect()->back()->with('error', 'Đặt tour thất bại');
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function success(){
        if (request('order') == null)
            return redirect()->route('welcome');
        $tour_id = Order_detail::where('order_id', request('order'))->first('ma_tour');
        $getOrder = Order::where('id', request('order'))->first();
        $getSlug = Tour::where('id', $tour_id->ma_tour)->first('slug');
        $getNameTour = Tour::where('id', $tour_id->ma_tour)->first('ten_tour');
        $customer = $getOrder->ten_nguoi_dat;
        $email = $getOrder->email;
        $messages = [
            'name' => $customer,
            'tour' => $getNameTour->ten_tour,
        ];
        dispatch(new TestMailJob($messages, $email))->delay(now()->addMinutes(1));
        return Inertia::render('Booking/Success', compact('getSlug'));
    }
}
