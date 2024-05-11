<?php

namespace App\Http\Controllers;

use App\Models\KhuyenMai;
use App\Models\LichTrinh;
use App\Models\Tour;
use App\Models\Tour_ngay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Jobs\TestMailJob;

class LichTrinhController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $search = request('search') ?? '';
        // check user đang đăng nhập
        $user = auth()->user();
        // dd($user);
        if($search){
            $schedules = DB::table('tour_ngay')
            ->join('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
            ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
            ->leftJoin('order_details', 'tour_ngay.ma_tour', '=', 'order_details.ma_tour')
            ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tours.ten_tour','tour_ngay.so_cho', 'tour_ngay.ngay', 'tour_ngay.so_cho_da_dat', 'tour_ngay.so_ngay', 'tour_ngay.trang_thai', 'users.name as nguoi_phu_trach')
            ->where('tours.ten_tour', 'like', '%'.$search.'%')
            ->where('tour_ngay.is_delete', 0);
            if($user->role == 'employee'){
                $schedules = $schedules->where('tour_ngay.ma_nhan_vien', $user->id);
            }
            $schedules = $schedules->paginate(10)
            ->withQueryString();    
            foreach($schedules as $key => $item){
                $item->ngay = date('d-m-Y', $item->ngay);
                // lấy số ngày kết thúc tour
                $schedules[$key]->ngay_ket_thuc = date('d-m-Y', strtotime($item->ngay. ' + '. $item->so_ngay. ' days'));
            }
            // return Inertia::render('Schedule/Index',compact('schedules'));
        } else {
            $schedules = DB::table('tour_ngay')
            ->join('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
            ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
            ->leftJoin('order_details', 'tour_ngay.ma_tour', '=', 'order_details.ma_tour')
            ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tours.ten_tour','tour_ngay.so_cho', 'tour_ngay.ngay', 'tour_ngay.so_cho_da_dat', 'tour_ngay.so_ngay', 'tour_ngay.trang_thai', 'users.name as nguoi_phu_trach')
            ->where('tours.ten_tour', 'like', '%'.$search.'%')
            ->where('tour_ngay.is_delete', 0);
            if($user->role == 'employee'){
                $schedules = $schedules->where('tour_ngay.ma_nhan_vien', $user->id);
            }
            $schedules = $schedules->paginate(10)
            ->withQueryString();
            foreach($schedules as $key => $item){
                $item->ngay = date('d-m-Y', $item->ngay);
                // lấy số ngày kết thúc tour
                $schedules[$key]->ngay_ket_thuc = date('d-m-Y', strtotime($item->ngay. ' + '. $item->so_ngay. ' days'));
            }
        }
        // dd($schedules);
        return Inertia::render('Schedule/Index',compact('schedules', 'search'));
    }

    public function create()
    {

        $schedule = LichTrinh::where('ma_tour', request('idTour'))
        ->get();
        // dd($schedule);
        $tours = DB::table('tours')
            ->select('id', 'ten_tour', 'so_ngay')
            ->where('status', '=', 'active')
            // ->whereNotIn('id', $schedule->keys())
            ->get();

        if(request('idTour')){
            $forcusTour = Tour::find(request('idTour'));
            $arr = [];
            for($i = 0; $i < $forcusTour->so_ngay; $i++){
                $forcusTour->ngay_khoi_hanh = date('Y-m-d', strtotime($forcusTour->ngay_khoi_hanh. ' + 1 days'));
                // array_push($arr,$forcusTour->ngay_khoi_hanh);
                $arr[$i]['lich_trinh_ngay'] = $forcusTour->ngay_khoi_hanh;
                $arr[$i]['tieu_de'] = '';
                $arr[$i]['noi_dung'] = '';
                
            }
            $forcusTour->schedule = $arr;
            if ($schedule->count() > 0) {
                $forcusTour->schedule = $schedule;
            }
            return Inertia::render('Schedule/Create',compact('tours','forcusTour'));
        }
        $forcusTour = null;
        return Inertia::render('Schedule/Create',compact('tours','forcusTour'));
    }

    public function store(Request $request)
    {
        foreach($request->schedule as $item){
            if ($item == null) {
                return redirect()->route('managerTour.index')->with('error', 'Please fill in the schedule');
            }
        }
        // for($i = 0; $i < count($request->schedule); $i++){
        //     $request->validate([
        //         'idTour' => 'required',
        //         'title'  => 'required',
        //         'content'=> 'required',
        //         'schedule' => 'required',
        //     ]);
        // }

        // foreach($request->schedule as $item){
        //     $request->validate([
        //         'idTour' => 'required',
        //         'title'  => 'required',
        //         'content'=> 'required',
        //         // 'schedule' => 'required',
        //     ]);
        // }



        // $tour = Tour::where('ten_tour',$request->idTour)->first('id');
        // for($i = 0; $i < count($request->schedule); $i++){
        //     $data = array(
        //         'ma_tour' => $tour->id,
        //         'tieu_de' => request('title'. $i),
        //         'noi_dung' => request('content'. $i),
        //         // 'lich_trinh_ngay' => $request->schedule[$i],
        //     );
        //     // dd($data);
        //     LichTrinh::create($data);
        // }

        $tour = Tour::find($request->id);
        $tour->update([
            'co_lich_trinh' => 1,
        ]);
        $check_schedule = LichTrinh::where('ma_tour', $request->id)->get();

        if($check_schedule->count() > 0){
            foreach($check_schedule as $item){
                $item->delete();
            }
        }
        foreach($request->schedule as $item){
            // dd($item['tieu_de']);
            // if ($item == null) {
            //     return redirect()->route('managerTour.index')->with('error', 'Please fill in the schedule');
            // }
            $data = array(
                'ma_tour' => $request->id,
                'tieu_de' => $item['tieu_de'],
                'noi_dung' => $item['noi_dung'],
                // 'lich_trinh_ngay' => $item['lich_trinh_ngay'],
            );
            LichTrinh::create($data);
        }
        return redirect()->route('managerTour.index')->with('success', 'Schedule created successfully');
    }

    public function Edit($id){
        // $schedule = LichTrinh::find($id);
        // $schedule->lich_trinh_ngay = date('Y-m-d', strtotime($schedule->lich_trinh_ngay));
        $schedule = DB::table('tours')
        ->join('tour_ngay', 'tours.id', '=', 'tour_ngay.ma_tour')
        ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
        ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tours.ten_tour','tour_ngay.so_cho', 'tour_ngay.ngay', 'tour_ngay.so_cho_da_dat', 'tour_ngay.so_ngay', 'tour_ngay.trang_thai', 'tour_ngay.ma_nhan_vien', 'users.name as ten_nhan_vien')
        ->where('tour_ngay.id', $id)
        ->first();
    $schedule->ngay = date('Y-m-d', $schedule->ngay);
    $ngay = date('d-m-Y', strtotime($schedule->ngay));
    // nếu ngaày khởi hành nhỏ hơn ngày hiện tại thì không thể chỉnh sửa
    if (strtotime(date('Y-m-d')) > strtotime($ngay)) {
        $schedule->disable = true;
    } else {
        $schedule->disable = false;
    }
    $ngay_ket_thuc = date('d-m-Y', strtotime($schedule->ngay. ' + '. $schedule->so_ngay. ' days'));
    
    $nhan_vien = DB::table('users')
        ->select('id', 'name')
        ->where('role', 'employee')
        ->get();
    
        $nhan_viens = []; // Khởi tạo mảng tạm thời
        $count = 0;
        foreach($nhan_vien as $item){
            $temp_schedule = clone $schedule; // Tạo bản sao của lịch trình cho mỗi nhân viên
            $lich_trinh = DB::table('tour_ngay')
                ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
                ->leftJoin('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
                ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tour_ngay.ngay', 'tour_ngay.so_cho', 'tour_ngay.so_cho as so_cho_con_lai', 'tour_ngay.trang_thai', 'tour_ngay.ma_nhan_vien', 'users.name as ten_nhan_vien', 'tour_ngay.so_ngay', 'tours.ten_tour')
                ->where('tour_ngay.ma_nhan_vien', $item->id)
                ->where('tour_ngay.id', '!=', $id)
                ->get();
            $lich_trinhs[] = $lich_trinh;
            foreach ($lich_trinh as $lich) {
                $lich->ngay = date('d-m-Y', $lich->ngay);
                $lich->ngay_ket_thuc = date('d-m-Y', strtotime($lich->ngay. ' + '. $lich->so_ngay. ' days'));
                if ($lich->ngay <= $ngay && $ngay <= $lich->ngay_ket_thuc || $lich->ngay <= $ngay_ket_thuc &&
                    $ngay_ket_thuc <= $lich->ngay_ket_thuc) {
                    unset($temp_schedule); 
                }
            }
            if (isset($temp_schedule)) { 
                $nhan_viens[$count] = $item;
                $count++;
            }
        }
        $nhan_vien = $nhan_viens; 
        return Inertia::render('Schedule/Edit',compact('schedule','nhan_viens'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'so_cho' => 'required|numeric|min:1|max:100',
            'so_ngay' => 'required|numeric|min:1|max:14',
            'ngay' => 'required|date',
        ]);
        $id = Tour_ngay::find($id);
        $order = DB::table('order_details')
        ->join('orders', 'order_details.order_id', '=', 'orders.id')
        ->join('tours', 'order_details.ma_tour', '=', 'tours.id')
        ->join('khach_hangs', 'orders.ma_khach_hang', '=', 'khach_hangs.id')
        ->join('tour_ngay', 'order_details.ma_tour', '=', 'tour_ngay.ma_tour')
        ->select('order_details.id', 'order_details.ma_tour', 'order_details.so_luong_nguoi', 'order_details.total', 'orders.ngay_khoi_hanh', 'orders.trang_thai', 'order_details.ma_tour', 'tours.ten_tour', 'tour_ngay.so_cho', 'tour_ngay.so_ngay', 'khach_hangs.email', 'khach_hangs.ten_khach_hang')
        ->where('order_details.ma_tour', $id->ma_tour)
        ->where('orders.trang_thai', '!=', '0')
        ->where('tour_ngay.id', $id->id)
        ->where('tour_ngay.is_delete', 0)
        ->get();
        $flag_ngay = false;
        $flag_cho = false;
        $flag_so_ngay = false;
        if($id->ma_nhan_vien != $request->ma_nhan_vien){
            $id->ma_nhan_vien = $request->ma_nhan_vien;
        }
        if($id->trang_thai != $request->status && $id->trang_thai !== ''){
            $id->trang_thai = $request->status;
        } else {
            $id->trang_thai = 0;
        }
        if($id->ngay !== strtotime($request->ngay)){
            if(empty($oder)) {
                // // check user xem có bị trùng khoảng thời gian không
                $lich_trinh = DB::table('tour_ngay')
                    ->where('ma_nhan_vien', $id->ma_nhan_vien)
                    ->where('ma_nhan_vien', '!=', null)
                    ->where('id', '!=', $id->id)
                    ->where('is_delete', 0)
                    ->get();
                foreach($lich_trinh as $item){
                    $item->ngay = date('d-m-Y', $item->ngay);
                    $item->ngay_ket_thuc = date('d-m-Y', strtotime($item->ngay. ' + '. $item->so_ngay. ' days'));
                    if(!($request->ngay < $item->ngay || $item->ngay_ket_thuc < $request->ngay)){
                        return redirect()->back()->with('error', 'Nhân viên đã có lịch trình trong khoảng thời gian này');
                    }
                }

                $id->ngay = strtotime($request->ngay);
                $flag_ngay = true;
            } else {
                return redirect()->back()->with('error', 'Bạn không thể thay đổi ngày khởi hành khi đã có người đặt tour');
            }
        }
        if($id->so_cho !== $request->so_cho){
            $id->so_cho = $request->so_cho;
            $flag_cho = true;
        }
        if((int)$id->so_ngay !== (int)$request->so_ngay){
            $id->so_ngay = $request->so_ngay;
            $flag_so_ngay = true;
        }
        if($flag_so_ngay){
            $lich_trinh = LichTrinh::where('ma_tour', $id->ma_tour)->get();
            foreach($lich_trinh as $item){
                $item->delete();
            }
            $tour = Tour::find($id->ma_tour);
            $tour->update([
                'co_lich_trinh' => 0,
            ]);
        }
        if($flag_cho || $flag_so_ngay || $flag_ngay){
            // send mail
            foreach($order as $item){
                if (strtotime($item->ngay_khoi_hanh) < strtotime($request->ngay)) {
                    return redirect()->back()->with('error', 'The departure date has passed');
                }
                if($item->so_luong_nguoi > $request->so_cho){
                    return redirect()->back()->with('error', 'The number of seats is less than the number of tickets sold');
                } else {
                    $messages = [
                        'action' => 'update_schedule',
                        'tour' => $item->ten_tour,
                        'so_cho' => $request->so_cho,
                        'name' => $item->ten_khach_hang,
                        'so_luong' => $request->so_cho - $item->so_luong_nguoi,
                        'start_date' => date('d-m-Y', strtotime($request->ngay)),
                        'end_date' => date('d-m-Y', strtotime($request->ngay. ' + '. $request->so_ngay. ' days')),
                    ];
                    dispatch(new TestMailJob($messages, $item->email))->delay(now()->addMinutes(1));

                }
            }
        }
        $id->save();
        return redirect()->route('schedule.index')->with('success', 'Schedule updated successfully');
    }

    public function check_schedule($id){
        $schedule = Tour_ngay::where('id', $id)->get();
        $order = DB::table('order_details')
        ->join('orders', 'order_details.order_id', '=', 'orders.id')
        ->join('tours', 'order_details.ma_tour', '=', 'tours.id')
        ->join('khach_hangs', 'orders.ma_khach_hang', '=', 'khach_hangs.id')
        ->join('tour_ngay', 'order_details.ma_tour', '=', 'tour_ngay.ma_tour')
        ->select('order_details.id', 'order_details.ma_tour', 'order_details.so_luong_nguoi', 'order_details.total', 'orders.ngay_khoi_hanh', 'orders.trang_thai', 'order_details.ma_tour', 'tours.ten_tour', 'tour_ngay.so_cho', 'tour_ngay.so_ngay', 'khach_hangs.email', 'khach_hangs.ten_khach_hang')
        ->where('order_details.ma_tour', $schedule[0]->ma_tour)
        ->where('orders.trang_thai', '!=', '0')
        ->where('tour_ngay.id', $id)
        ->where('tour_ngay.is_delete', 0)
        ->get();
        if(!empty($order)){
            return response()->json(['status' => 'info', 'data' => 'Lịch trình tour này đã có người đặt. Việc xóa lịch trình sẽ ảnh hưởng đến người đặt tour']);
        } else {
            return response()->json(['status' => 'success', 'data' => 'Lịch trình tour này chưa có người đặt']);
        }
    }

    public function delete($id)
    {
        try {
            $ids = strpos($id, ',') !== false ? explode(',', $id) : [$id];
    
            foreach ($ids as $id) {
                $this->processSchedule($id);
            }
    
            return response()->json(['status' => 'success', 'message' => 'Xóa lịch trình thành công']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    private function processSchedule($id)
    {
        $schedule = Tour_ngay::find($id);
        $orders = $schedule->orders()->where('trang_thai', '!=', '0')->get();
    
        if ($orders->count() > 0) {
            foreach ($orders as $order) {
                $order->update(['trang_thai' => '0']);
            }
    
            $khuyen_mai = KhuyenMai::where('so_lan_su_dung', 1)
                ->where('trang_thai', 0)
                ->where('ngay_ket_thuc', '>', now())
                ->first();
            if ($khuyen_mai) {
                $khuyen_mai->update(['trang_thai' => '1']);
            }
    
            foreach ($orders as $order) {
                $messages = $this->prepareEmailMessage($order, $schedule, $khuyen_mai);
                dispatch(new TestMailJob($messages, $order->customer->email))->delay(now()->addMinutes(1));
            }
        }
        $schedule->is_delete = 1;
        $schedule->ma_nhan_vien = null;
        $schedule->save();
        // $schedule->update(['ma_nhan_vien' => null]);
        // $schedule->delete();
    }
    
    private function prepareEmailMessage($order, $schedule, $khuyen_mai)
    {
        $messages = [
            'action' => 'cancel_tour',
            'tour' => $order->tour->ten_tour,
            'name' => $order->customer->ten_khach_hang,
            'start_date' => date('d-m-Y', $schedule->ngay),
            'payment' => $order->hinh_thuc_thanh_toan,
        ];
    
        if ($khuyen_mai) {
            $messages['voucher'] = $khuyen_mai->title;
            $messages['discount'] = $khuyen_mai->giam_theo == 0 ? $khuyen_mai->gia_tri . ' %' : $khuyen_mai->gia_tri . ' VND';
            $messages['so_lan_su_dung'] = $khuyen_mai->so_lan_su_dung;
            $messages['expired_date'] = date('d-m-Y', $khuyen_mai->ngay_ket_thuc);
        }
    
        return $messages;
    }

    public function checkOrder($id){
        $query = DB::table('order_details')
            ->join('orders', 'order_details.order_id', '=', 'orders.id')
            ->join('tours', 'order_details.ma_tour', '=', 'tours.id')
            ->join('khach_hangs', 'orders.ma_khach_hang', '=', 'khach_hangs.id')
            ->join('tour_ngay', 'order_details.ma_tour', '=', 'tour_ngay.ma_tour')
            ->select('order_details.id', 'order_details.ma_tour', 'order_details.so_luong_nguoi', 'order_details.total', 'orders.ngay_khoi_hanh', 'orders.trang_thai', 'order_details.ma_tour', 'tours.ten_tour', 'tour_ngay.so_cho', 'tour_ngay.so_ngay', 'khach_hangs.email', 'khach_hangs.ten_khach_hang')
            ->where('orders.trang_thai', '!=', '0')
            ->where('tour_ngay.is_delete', 0);
    
        if (strpos($id, ',') !== false) {
            $id = explode(',', $id);
            $query->whereIn('tour_ngay.id', $id);
        } else {
            $schedule = Tour_ngay::where('id', $id)->first();
            $query->where('order_details.ma_tour', $schedule->ma_tour)
                ->where('orders.ma_tour_ngay', $id);
        }
    
        $order = $query->get();
    
        if(count($order) > 0){
            return response()->json(['status' => 'info', 'data' => 'Tour này đã có người đặt']);
        } else {
            return response()->json(['status' => 'success', 'data' => 'Tour này chưa có người đặt', 'id' => $id]);
        }
    }



    // check lịch trình trùng theo ngày
    public function nhanvien(Request $request){
    $ngay = date('d-m-Y', strtotime($request->ngay));
    $ngay_ket_thuc = date('d-m-Y', strtotime($request->ngay. ' + '. $request->so_ngay. ' days'));
    $ngay = strtotime($request->ngay);
    $ngay_ket_thuc = strtotime($ngay_ket_thuc);
    $data = array(
        'ngay' => $ngay,
        'ngay_ket_thuc' => $ngay_ket_thuc,
    );
    $nhan_vien = DB::table('users')
        ->select('id', 'name')
        ->where('role', 'employee')
        // ->where('id', $request->id)
        ->get();
    $nhan_viens = []; // Khởi tạo mảng tạm thời
    foreach ($nhan_vien as $key => $item) {
        $lich_trinh = DB::table('tour_ngay')
            ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
            ->leftJoin('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
            ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tour_ngay.ngay', 'tour_ngay.so_cho', 'tour_ngay.so_cho as so_cho_con_lai', 'tour_ngay.trang_thai', 'tour_ngay.ma_nhan_vien', 'users.name as ten_nhan_vien', 'tour_ngay.so_ngay', 'tours.ten_tour')
            ->where('tour_ngay.ma_nhan_vien', $item->id)
            ->where('tour_ngay.id', '!=', $request->tour_ngay_id)
            ->get();
            foreach ($lich_trinh as $lich) {
                $lich->ngay = date('d-m-Y', $lich->ngay);
                $lich->ngay_ket_thuc = date('d-m-Y', strtotime($lich->ngay. ' + '. $lich->so_ngay. ' days'));
                $lich->ngay = strtotime($lich->ngay);
                $lich->ngay_ket_thuc = strtotime($lich->ngay_ket_thuc);
                if ($lich->ngay <= $ngay && $ngay <= $lich->ngay_ket_thuc || $lich->ngay <= $ngay_ket_thuc &&
                    $ngay_ket_thuc <= $lich->ngay_ket_thuc) {
                    unset($nhan_vien[$key]);
                }
            }

    }
    $count = 0;
    foreach($nhan_vien as $item){
        $nhan_viens[$count] = $item;
        $count++;
    }

        return response()->json(['status' => 'success', 'data' => $nhan_viens]);
    }

    public function search()
    {
        $search = request('search');
        $user = auth()->user();
        if($search){
            $schedules = DB::table('tour_ngay')
            ->join('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
            ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
            ->leftJoin('order_details', 'tour_ngay.ma_tour', '=', 'order_details.ma_tour')
            ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tours.ten_tour','tour_ngay.so_cho', 'tour_ngay.ngay', 'tour_ngay.so_cho_da_dat', 'tour_ngay.so_ngay', 'tour_ngay.trang_thai', 'users.name as nguoi_phu_trach')
            ->where('tours.ten_tour', 'like', '%'.$search.'%')
            ->where('tour_ngay.is_delete', 0);
            if ($user->role == 'employee') {
                $schedules = $schedules->where('tour_ngay.ma_nhan_vien', $user->id);
            }
            $schedules = $schedules->paginate(10)
            ->withQueryString();
            foreach($schedules as $key => $item){
                $item->ngay = date('d-m-Y', $item->ngay);
                // lấy số ngày kết thúc tour
                $schedules[$key]->ngay_ket_thuc = date('d-m-Y', strtotime($item->ngay. ' + '. $item->so_ngay. ' days'));
            }
        } else {
            $schedules = DB::table('tour_ngay')
            ->join('tours', 'tour_ngay.ma_tour', '=', 'tours.id')
            ->leftJoin('users', 'tour_ngay.ma_nhan_vien', '=', 'users.id')
            ->leftJoin('order_details', 'tour_ngay.ma_tour', '=', 'order_details.ma_tour')
            ->select('tour_ngay.id', 'tour_ngay.ma_tour', 'tours.ten_tour','tour_ngay.so_cho', 'tour_ngay.ngay', 'tour_ngay.so_cho_da_dat', 'tour_ngay.so_ngay', 'tour_ngay.trang_thai', 'users.name as nguoi_phu_trach')
            ->where('tours.ten_tour', 'like', '%'.$search.'%')
            ->where('tour_ngay.is_delete', 0);
            if ($user->role == 'employee') {
                $schedules = $schedules->where('tour_ngay.ma_nhan_vien', $user->id);
            }
            $schedules = $schedules->paginate(10)
            ->withQueryString();
            foreach($schedules as $key => $item){
                $item->ngay = date('d-m-Y', $item->ngay);
                // lấy số ngày kết thúc tour
                $schedules[$key]->ngay_ket_thuc = date('d-m-Y', strtotime($item->ngay. ' + '. $item->so_ngay. ' days'));
            }

        }
        return response()->json(['status' => 'success', 'data' => $schedules]);
    }
    
    public function updateStatus(Request $request)
    {
        $schedule = Tour_ngay::find($request->id);
        // trạng thái bằng 2 đồng nghĩa với việc hủy tour check xem có người đặt tour không và gửi mail
        $orders = $schedule->orders()->where('trang_thai', '!=', '0')->get();
        if ($request->value == '1') {
            // check ngày khởi hành nếu ngày hiện tại lớn hơn ngày khởi hành thì không thể thay đổi trạng thái hoàn thành
            $ngay = date('Y-m-d', $schedule->ngay);
            if (strtotime(date('Y-m-d')) < strtotime($ngay . ' + ' . $schedule->so_ngay . ' days')) {
                return response()->json(['status' => 'error', 'message' => 'Tour chuẩn bị khởi hành không thể thay đổi thành trạng thái hoàn thành', 'date' => strtotime(date('Y-m-d')), 'start_date' => strtotime($schedule->ngay . ' + ' . $schedule->so_ngay . ' days')]);
            }
            // cập nhật trạng thái order thành hoàn thành
            if ($orders->count() > 0) {
                foreach ($orders as $order) {
                    $order->update(['trang_thai' => '3']);
                }
            }
        } elseif ($request->value == '2') {
            if ($orders->count() > 0) {
                foreach ($orders as $order) {
                    $order->update(['trang_thai' => '0']);
                }
    
                $khuyen_mai = KhuyenMai::where('so_lan_su_dung', 1)
                    ->where('trang_thai', 0)
                    ->where('ngay_ket_thuc', '>', now())
                    ->first();
                if ($khuyen_mai) {
                    $khuyen_mai->update(['trang_thai' => '1']);
                }
    
                foreach ($orders as $order) {
                    $messages = $this->prepareEmailMessage($order, $schedule, $khuyen_mai);
                    dispatch(new TestMailJob($messages, $order->customer->email))->delay(now()->addMinutes(1));
                }
            }
        }

        $schedule->update(['trang_thai' => $request->value]);
        return response()->json(['status' => 'success', 'message' => 'Cập nhật trạng thái thành công']);
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}
