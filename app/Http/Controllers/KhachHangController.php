<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use App\Models\Order;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class KhachHangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KhachHang  $khachHang
     * @return \Illuminate\Http\Response
     */
    public function show(KhachHang $khachHang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\KhachHang  $khachHang
     * @return \Illuminate\Http\Response
     */
    public function edit(KhachHang $khachHang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KhachHang  $khachHang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KhachHang $khachHang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KhachHang  $khachHang
     * @return \Illuminate\Http\Response
     */
    public function destroy(KhachHang $khachHang)
    {
        //
    }

    public function login(){
        return Inertia::render('Customer/Login');
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
        return Inertia::render('Customer/Register');
    }

    public function process_register(Request $request){
        try{
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'password_confirmation' => 'required|same:password',
                'citizen_identification' => 'required|numeric',
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
            $data['password'] = Hash::make($data['password']);
            $data['name'] = $data['first_name'] . ' ' . $data['last_name'];
            $data['address'] = $data['address'] . ', ' . $data['ward'] . ', ' . $data['district'] . ', ' . $data['city'];
            $data['ngay_sinh'] = $data['year'] . '-' . $data['month'] . '-' . $data['day'];
            $khach_hang = new KhachHang();
            $khach_hang->ten_khach_hang = $data['name'];
            $khach_hang->email = $data['email'];
            $khach_hang->citizen_identification_number = $data['citizen_identification'];
            $khach_hang->so_dien_thoai = $data['phone'];
            $khach_hang->dia_chi = $data['address'];
            $khach_hang->mat_khau = $data['password'];
            $khach_hang->ngay_sinh = $data['ngay_sinh'];
            $khach_hang->save();
    
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
            if(request()->cookie('remember')){
                $customer = KhachHang::where('remember_token', request()->cookie('remember'))->first();
                $list_order = $customer->orders()->select('id', 'trang_thai','hinh_thuc_thanh_toan', 'created_at')->get();
                $order_id = $customer->orders()->select('id')->get();
                foreach ($list_order as $order){
                    $order->detail = DB::table('order_details')
                    ->where('order_id', $order->id)
                    ->select('total', 'ma_tour', 'so_luong_nguoi')
                    ->first();
                    $order->guest = DB::table('guest_register_tours')
                    ->where('order_id', $order->id)
                    ->select('name', 'phone', 'CMND', 'age')
                    ->get();
                    $order->tour = DB::table('tours')->where('id', $order->detail->ma_tour)
                    ->select('ten_tour', 'ngay_khoi_hanh', 'slug')
                    ->get();
                    foreach($order->tour as $tour){
                        $tour->ngay_khoi_hanh = date('d/m/Y', strtotime($tour->ngay_khoi_hanh));
                    }
                }
                return Inertia::render('Customer/Profile', [
                    'customer' => $customer,
                    'list_order' => $list_order,
                ]);
            }
            $customer = KhachHang::find(session('customer'));
            $list_order = $customer->orders()->select('id', 'trang_thai','hinh_thuc_thanh_toan', 'created_at')->get();
                $order_id = $customer->orders()->select('id')->get();
                foreach ($list_order as $order){
                    $order->detail = DB::table('order_details')
                    ->where('order_id', $order->id)
                    ->select('total', 'ma_tour', 'so_luong_nguoi')
                    ->first();
                    $order->guest = DB::table('guest_register_tours')
                    ->where('order_id', $order->id)
                    ->select('name', 'phone', 'CMND', 'age')
                    ->get();
                    $order->tour = DB::table('tours')->where('id', $order->detail->ma_tour)
                    ->select('ten_tour', 'ngay_khoi_hanh', 'slug')
                    ->get();
                    foreach($order->tour as $tour){
                        $tour->ngay_khoi_hanh = date('d/m/Y', strtotime($tour->ngay_khoi_hanh));
                    }
                }
                return Inertia::render('Customer/Profile', [
                    'customer' => $customer,
                    'list_order' => $list_order,
                ]);
        }
        catch(\Exception $e){
            return redirect()->route('welcome');
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
            $order = Order::find($id);
            $order->update([
                'trang_thai' => '0',
            ]);
            return back();
        }
        catch(\Exception $e){
            return back()->with([
                'error_server' => 'Server error',
            ]);
        }
    }
}
