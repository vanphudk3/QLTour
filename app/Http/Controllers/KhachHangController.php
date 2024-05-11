<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use App\Models\Order;
use App\Models\Tour_ngay;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Jobs\TestMailJob;

class KhachHangController extends Controller
{
    public function login(){
        $redirect = '';
        $lang = request('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        if (request('redirect')){
            $redirect = request('redirect');
        }
        return Inertia::render('Customer/Login', compact('redirect', 'lang', '_lang'));
    }

    public function process_login(Request $request){
        try{
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $remember = $request->remember;
            if ($remember){
                $remember = true;
            }
            else{
                $remember = false;
            }
            
            $customer = KhachHang::where('email', $request->email)->first();
            if ($customer) {
                if (Hash::check($request->password, $customer->mat_khau)) {
                    $request->session()->put('customer', $customer->id);
                    if ($remember){
                        $token = uniqid('customer_', true);
                        $customer->update([
                            'remember_token' => $token
                        ]);
                        // setcookie('remember', $token, time() + 60*60*24*30);
                        Cookie::queue('remember', $token, 60*60*24*30);
                    }
                    if ($request->redirect != ''){
                        return redirect($request->redirect);
                    }

                    return redirect()->route('welcome');
                }
            }
    
            return back()->with([
                'error_email' => 'The provided credentials do not match our records.',
            ]);
        }
        catch(\Exception $e){
            session()->forget('customer');
            return back()->with([
                'error_server' => 'Server error',
            ]);
        }
    }

    public function register(){
        $lang = request('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        return Inertia::render('Customer/Register', compact('lang', '_lang'));
    }

    public function process_register(Request $request){
        try{
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'password_confirmation' => 'required|same:password',
                // 'citizen_identification' => 'required|numeric|unique:khach_hangs,citizen_identification_number',
                'phone' => 'required|numeric',
                'address' => 'required',
                'city' => 'required',
                'district' => 'required',
                'ward' => 'required',
                'day' => 'required',
                'month' => 'required',
                'year' => 'required',
            ]);
    
            $data = $request->all();
            $check_cus_from_system = KhachHang::where('email', $data['email'])
            ->where('created_by', 'SYSTEM')
            ->first();
            if (!$check_cus_from_system) {
                $check_customer = KhachHang::where('email', $data['email'])->first();
                if ($check_customer){
                    return back()->withErrors([
                        'error_register' => 'Email đã tồn tại',
                    ]);
                } else{
                    $check_customer = KhachHang::where('citizen_identification_number', $data['citizen_identification'])->first();
                    if ($check_customer){
                        return back()->withErrors([
                            'error_register' => 'Số CMND đã tồn tại',
                        ]);
                    } else {
                        $check_customer = KhachHang::where('so_dien_thoai', $data['phone'])->first();
                        if($check_customer) {
                            return back()->withErrors([
                                'error_register' => 'Số điện thoại đã tồn tại',
                            ]);
                        }
                    }
                }
            }

            $data['password'] = Hash::make($data['password']);
            $data['name'] = $data['first_name'] . ' ' . $data['last_name'];
            $data['address'] = $data['address'] . ', ' . $data['ward'] . ', ' . $data['district'] . ', ' . $data['city'];
            $data['ngay_sinh'] = $data['year'] . '-' . $data['month'] . '-' . $data['day'];
            if (!$check_cus_from_system) {
                $khach_hang = new KhachHang();
                $khach_hang->ten_khach_hang = $data['name'];
                $khach_hang->email = $data['email'];
                $khach_hang->citizen_identification_number = $data['citizen_identification'];
                $khach_hang->so_dien_thoai = $data['phone'];
                $khach_hang->dia_chi = $data['address'];
                $khach_hang->mat_khau = $data['password'];
                $khach_hang->ngay_sinh = $data['ngay_sinh'];
                $khach_hang->save();
            } else {
                $check_cus_from_system->update([
                    'ten_khach_hang' => $data['name'],
                    'email' => $data['email'],
                    'citizen_identification_number' => $data['citizen_identification'],
                    'so_dien_thoai' => $data['phone'],
                    'dia_chi' => $data['address'],
                    'mat_khau' => $data['password'],
                    'ngay_sinh' => $data['ngay_sinh'],
                    // 'created_by' => 'SYSTEM',
                ]);
            }
    
            return redirect()->route('customer.login');
        }
        catch(Exception $e){
            return back()->withErrors([
                'error_register' => 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
            ]);
        }
    }

    public function logout(){
        session()->forget('customer');
        setcookie('remember',null, -1);
        return redirect()->route('welcome');
    }

    public function profile(){
        try{
            $lang = request('lang');
            $_lang = $lang;
            $lang = $this->getLanguage($lang);
            if(request()->cookie('remember')){
                $customer = KhachHang::where('remember_token', request()->cookie('remember'))->first();
            }
            if (session()->has('customer')){
                $customer = KhachHang::find(session('customer'));
            }
            if (session()->has('customer') || request()->cookie('remember')){
                $list_order = $customer->orders()->select('*')->get();
                // dd($list_order);
                if ($list_order){
                    // $order_id = $customer->orders()->select('id')->get();
                    foreach ($list_order as $key => $order){
                        $order->detail = DB::table('order_details')
                        ->where('order_id', $order->id)
                        ->select('total', 'ma_tour', 'so_luong_nguoi')
                        ->first();
                        $order->guest = DB::table('guest_register_tours')
                        ->where('order_id', $order->id)
                        ->select('name', 'phone', 'CMND', 'age')
                        ->get();
                        // if (isset($order->detail->ma_tour)) {
                        $order->tour = DB::table('tours')
                        ->where('id', $order->ma_tour)
                        ->select('ten_tour', 'id', 'slug')
                        ->get();
                        $list_order[$key]->tour_ngay = DB::table('tour_ngay')
                        ->where('ma_tour', $order->ma_tour)
                        ->select('ngay')
                        ->first()->ngay;
                        $list_order[$key]->tour_ngay = date('d-m-Y', ($list_order[$key]->tour_ngay));
                        // }
                    }
                    // dd($order->detail->ma_tour);
                }
                // dd($list_order);
                return Inertia::render('Customer/Profile', [
                    'customer' => $customer,
                    'list_order' => $list_order,
                    'lang' => $lang,
                    '_lang' => $_lang,
                ]);
            }
        }
        catch(\Exception $e){
            return $e;
        }
    }

    public function updateProfileMember($id, Request $request){
        try{
            $data = $request->all();
            $customer = KhachHang::find($id);
            if ($data['name'] !== $customer->ten_khach_hang){
                $customer->update([
                    "ten_khach_hang" => $data['name'],
                ]);
            }
            if ($data['email'] !== $customer->email){
                $customer->update([
                    "email" => $data['email'],
                ]);
            }
            if ($data['phone'] !== $customer->so_dien_thoai){
                $customer->update([
                    "so_dien_thoai" => $data['phone'],
                ]);
            }
            if ($data['address'] !== $customer->dia_chi){
                $customer->update([
                    "dia_chi" => $data['address'],
                ]);
            }
            if ($data['birthday'] !== $customer->ngay_sinh){
                $customer->update([
                    "ngay_sinh" => $data['birthday'],
                ]);
            }
            if ($data['citizen_identification_number'] !== $customer->citizen_identification_number){
                $customer->update([
                    "citizen_identification_number" => $data['citizen_identification_number'],
                ]);
            }
            return back();
        }
        catch(\Exception $e){
            return back()->with([
                'error_server' => 'Server error',
            ]);
        }
    }

    public function cancelorder($id, Request $request){
        try{
            // dd($id);
            // dd($order_detail);
            $order = Order::find($id);
            // dd($order->hinh_thuc_thanh_toan);
            $order->update([
                'trang_thai' => '0',
            ]);
            // trar ve so luong ve
            $order_detail = DB::table('order_details')
            ->join('tours', 'order_details.ma_tour', '=', 'tours.id')
            ->join('tour_ngay', 'tours.id', '=', 'tour_ngay.ma_tour')
            ->where('order_id', $id)
            ->select('order_details.so_luong_nguoi', 'tours.id', 'tour_ngay.ngay', 'tour_ngay.id as tour_ngay_id','tours.ten_tour')
            ->first();
            $tour_ngay = Tour_ngay::find($order_detail->tour_ngay_id);
            $tour_ngay->update([
                'so_cho' => $tour_ngay->so_cho + $order_detail->so_luong_nguoi,
            ]);
            if ($order->hinh_thuc_thanh_toan == '2'){
                $customer = KhachHang::find($order->ma_khach_hang);
                // dd($customer->email);
                $messages = [
                    'action' => 'cancel_order',
                    'name' => $customer->ten_khach_hang,
                    'tour' => $order_detail->ten_tour,
                ];
                dispatch(new TestMailJob($messages, $customer->email))->delay(now()->addMinutes(1));

            }
            


            return back();
        }
        catch(\Exception $e){
            return back()->with([
                'error_server' => 'Server error',
            ]);
        }
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
