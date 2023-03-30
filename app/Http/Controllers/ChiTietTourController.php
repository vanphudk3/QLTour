<?php

namespace App\Http\Controllers;

use App\Models\ChiTietTour;
use App\Models\City;
use App\Models\District;
use App\Models\GuestRegisterTour;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Tour;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChiTietTourController extends Controller
{

    public function booking(){
        
        $detailTour = null;
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
            // dd($detailTour);
            $detailTour->ngay_khoi_hanh = date("d/m/Y", strtotime($detailTour->ngay_khoi_hanh));
            if(request("totalPrice")){
                $detailTour->totalPrice = request("totalPrice");
            }
            // $detailTour->subtotal = 0;
            // $detailTour->counttraveller = 0;

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
        return Inertia::render("Booking/TourBooking", compact('detailTour'));
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
        // dd($detailTour);
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

        // dd($getBooking);
        return Inertia::render("Booking/Checkout", compact('getBooking', 'detailTour'));
    }

    public function process(Request $request){
        try{
            $data = $request->all();
            // dd(isset($request->redirect));
            $order = new Order();
            if(session()->has("customer")){
                $order->ma_khach_hang = session()->get("customer");
            }
            if($data['user'] != null){
                $order->ma_nhan_vien = $data['user'];
            }
    
            $order->ten_nguoi_dat = $data['name'];
            $order->so_dien_thoai = $data['phone'];
            $order->email = $data['email'];
            $order->dia_chi = $data['address'];
            $order->gio_khoi_hanh = $data['time'];
            $order->tong_tien = $data['total'];
            $order->hinh_thuc_thanh_toan = $data['payment'];
            $order->ghi_chu = $data['note'];
            if($data['payment'] == "0"){
                $order->trang_thai = "0";
                if($order->save()){
                    // $partinations = [];
                    for($i=0;$i<count($data['travellers']);$i++){
                        $data['travellers'][$i]['order_id'] = $order->id;
                        if(session()->has('customer')){
                            $data['travellers'][$i]['user_id'] = session()->get('customer');
                        };
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
                    return redirect()->route("checkout.success");
                }
            }
            elseif($data['payment'] == "3"){
                // Pay VNPAY
                $vnp_Url = $data['url'];
                $vnp_Returnurl = "http://127.0.0.1:8000/";
                $vnp_TmnCode = "CHY8RJDX"; //Mã website tại VNPAY 
                $vnp_HashSecret = "OHVGFFGRCSFFHBCWQYANFOUBVFDFRJJQ"; //Chuỗi bí mật
                // $tran_id = DB::table('transactions')->orderBy('id', 'desc')->first('id');
                $vnp_TxnRef = 1; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
                $vnp_OrderInfo = 'Thanh toán qua VNPAY';
                $vnp_OrderType = 'billpayment';
                $vnp_Amount = $data['total'] * 100;
                $vnp_Locale = 'vn';
                $vnp_BankCode = 'NCB';
                $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
                //Add Params of 2.0.1 Version
                //$vnp_ExpireDate = $_POST['txtexpire'];
                //Billing
    
                $inputData = array(
                    "vnp_Version" => "2.1.0",
                    "vnp_TmnCode" => $vnp_TmnCode,
                    "vnp_Amount" => $vnp_Amount,
                    "vnp_Command" => "pay",
                    "vnp_CreateDate" => date('YmdHis'),
                    "vnp_CurrCode" => "VND",
                    "vnp_IpAddr" => $vnp_IpAddr,
                    "vnp_Locale" => $vnp_Locale,
                    "vnp_OrderInfo" => $vnp_OrderInfo,
                    "vnp_OrderType" => $vnp_OrderType,
                    "vnp_ReturnUrl" => $vnp_Returnurl,
                    "vnp_TxnRef" => $vnp_TxnRef
                );
    
                if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                    $inputData['vnp_BankCode'] = $vnp_BankCode;
                }
                if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
                    $inputData['vnp_Bill_State'] = $vnp_Bill_State;
                }

                //dd($inputData);
                ksort($inputData);
                $query = "";
                $i = 0;
                $hashdata = "";
                foreach ($inputData as $key => $value) {
                    if ($i == 1) {
                        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                    } else {
                        $hashdata .= urlencode($key) . "=" . urlencode($value);
                        $i = 1;
                    }
                    $query .= urlencode($key) . "=" . urlencode($value) . '&';
                }

                $vnp_Url = $vnp_Url . "?" . $query;
                if (isset($vnp_HashSecret)) {
                    $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
                    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
                }
                $returnData = array(
                    'code' => '00'
                    ,
                    'message' => 'success'
                    ,
                    'data' => $vnp_Url
                );
                if (isset($request->redirect)) {
                    // return redirect($vnp_Url);
                    header('Location: ' . $vnp_Url);
                    die();
                } else {
                    echo json_encode($returnData);
                }
                
                // $order->trang_thai = "2";
                // if($order->save()){
                //     for($i=0;$i<count($data['travellers']);$i++){
                //         $data['travellers'][$i]['order_id'] = $order->id;
                //         if(session()->has('customer')){
                //             $data['travellers'][$i]['user_id'] = $data['customer'];
                //         }
                //         GuestRegisterTour::create($data['travellers'][$i]);
                //     }
                    
                //     $order_detail = new Order_detail();
                //     $order_detail->order_id = $order->id;
                //     $order_detail->ma_tour = $data['tour_id'];
                //     $order_detail->so_luong_nguoi = count($data['travellers']);
                //     $order_detail->total = $data['total'];
                //     if($data['note'] != null){
                //         $order_detail->ghi_chu = $data['note'];
                //     }
                //     $order_detail->save();
    
                //     // Pay VNPAY
                //     $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
                //     $vnp_Returnurl = "http://127.0.0.1:8000/";
                //     $vnp_TmnCode = "CHY8RJDX"; //Mã website tại VNPAY 
                //     $vnp_HashSecret = "OHVGFFGRCSFFHBCWQYANFOUBVFDFRJJQ"; //Chuỗi bí mật
                //     $order_id = DB::table('orders')->orderBy('id', 'desc')->first('id');
                //     $vnp_TxnRef = $order->id; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
                //     $vnp_OrderInfo = 'Thanh toán qua VNPAY';
                //     $vnp_OrderType = 'billpayment';
                //     $vnp_Amount = $data['total'] * 100;
                //     $vnp_Locale = 'vn';
                //     $vnp_BankCode = 'NCB';
                //     $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
                //     //Add Params of 2.0.1 Version
                //     //$vnp_ExpireDate = $_POST['txtexpire'];
                //     //Billing
        
                //     $inputData = array(
                //         "vnp_Version" => "2.1.0",
                //         "vnp_TmnCode" => $vnp_TmnCode,
                //         "vnp_Amount" => $vnp_Amount,
                //         "vnp_Command" => "pay",
                //         "vnp_CreateDate" => date('YmdHis'),
                //         "vnp_CurrCode" => "VND",
                //         "vnp_IpAddr" => $vnp_IpAddr,
                //         "vnp_Locale" => $vnp_Locale,
                //         "vnp_OrderInfo" => $vnp_OrderInfo,
                //         "vnp_OrderType" => $vnp_OrderType,
                //         "vnp_ReturnUrl" => $vnp_Returnurl,
                //         "vnp_TxnRef" => $vnp_TxnRef
                //     );
        
                //     if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                //         $inputData['vnp_BankCode'] = $vnp_BankCode;
                //     }
                //     if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
                //         $inputData['vnp_Bill_State'] = $vnp_Bill_State;
                //     }
        
                //     // dd($inputData);
                //     ksort($inputData);
                //     $query = "";
                //     $i = 0;
                //     $hashdata = "";
                //     foreach ($inputData as $key => $value) {
                //         if ($i == 1) {
                //             $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                //         } else {
                //             $hashdata .= urlencode($key) . "=" . urlencode($value);
                //             $i = 1;
                //         }
                //         $query .= urlencode($key) . "=" . urlencode($value) . '&';
                //     }
        
                //     $vnp_Url = $vnp_Url . "?" . $query;
                //     if (isset($vnp_HashSecret)) {
                //         $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
                //         $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
                //     }
                //     $returnData = array(
                //         'code' => '00'
                //         ,
                //         'message' => 'success'
                //         ,
                //         'data' => $vnp_Url
                //     );
                //     if (isset($_POST['redirect'])) {
                //         header('Location: ' . $vnp_Url);
                //         die();
                //     } else {
                //         echo json_encode($returnData);
                //     }
                // }
            }
            return redirect()->back()->with('error', 'Đặt tour thất bại');
        }
        catch(\Exception $e){
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function success(){
        $tour_id = Order_detail::orderBy('id', 'desc')->first('ma_tour');
        $getSlug = Tour::where('id', $tour_id->ma_tour)->first('slug');
        return Inertia::render('Booking/Success', compact('getSlug'));
    }
}
