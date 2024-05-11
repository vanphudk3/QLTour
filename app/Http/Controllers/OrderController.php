<?php

namespace App\Http\Controllers;

use App\Jobs\TestMailJob;
use App\Models\KhachHang;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::orderBy('id', 'desc')->paginate(6);
        foreach($orders as $key => $order){
            $orders[$key]->disabled = '';
            if($order->trang_thai === "0"){
                $order->trang_thai = "Cancel";
            }
            else if($order->trang_thai === "1"){
                $order->trang_thai = "Pending";
            }
            else if($order->trang_thai === "2"){
                $order->trang_thai = "Success";
            } else {
                $order->trang_thai = "Complete";
                $orders[$key]->disabled = 'disabled';
            }
        }
        return Inertia::render('Order/Index', compact("orders"));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        // dd($order);

        $order->travellers = DB::table("guest_register_tours")
        ->join("orders","orders.id","guest_register_tours.order_id")
        ->join("order_details","order_details.order_id","orders.id")
        ->where("orders.id", $order->id)
        ->select("guest_register_tours.*")
        ->get();
        $order->tour = DB::table("order_details")
        ->join("tours","tours.id","order_details.ma_tour")
        ->where("order_details.order_id", $order->id)
        ->select("tours.*")
        ->first();

        $order->ngay_khoi_hanh = $order->tour_ngay()->first()->ngay;
        $order->ngay_khoi_hanh = date("d-m-Y", ($order->ngay_khoi_hanh));
        // dd($order);
        return Inertia::render('Order/Show', compact("order"));
    }

    public function browse_order(){
        // dd(request("order"));

        $order = Order::find(request("order"));
        $travellers = DB::table("guest_register_tours")
        ->join("orders","orders.id","guest_register_tours.order_id")
        ->join("order_details","order_details.order_id","orders.id")
        ->where("orders.id", $order->id)
        ->get();
        
        $tour = DB::table("tours")
        ->join("order_details","tours.id","order_details.ma_tour")
        ->where("order_details.order_id", $order->id)
        ->update([
            "so_cho_da_ban" => DB::raw("so_cho_da_ban + " . count($travellers)),
            "so_cho" => DB::raw("so_cho - " . count($travellers))
        ]);

        $order->update([
            "trang_thai" => "2"
        ]);

        if($order->ma_khach_hang !== null){
            $customer = KhachHang::find($order->ma_khach_hang);
            $countTour = $customer->tong_so_tour_da_di;
            $customer->update([
                "tong_so_tour_da_di" => $countTour + 1
            ]);
        }

        return redirect()->route("order.index")->with("success", "Đã duyệt đơn hàng " . $order->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        if ($request->trang_thai == $order->trang_thai) {
            return redirect()->route("order.index")->with("error", "Không có thay đổi nào được thực hiện");
        }
        $order->update([
            "trang_thai" => $request->trang_thai
        ]);

        // nếu đơn hàng đã bị hủy thì trả lại số chỗ đã đặt và gửi mail thông báo
        $travellers = DB::table("guest_register_tours")
        ->join("orders","orders.id","guest_register_tours.order_id")
        ->join("order_details","order_details.order_id","orders.id")
        ->where("orders.id", $order->id)
        ->get();
        if($request->trang_thai == "0"){
            $order->tour_ngay()->update([
                "so_cho_da_dat" => DB::raw("so_cho_da_dat - " . count($travellers)),
            ]);

            // if($order->ma_khach_hang !== null){
            //     $customer = KhachHang::find($order->ma_khach_hang);
            //     $countTour = $customer->tong_so_tour_da_di;
            //     $customer->update([
            //         "tong_so_tour_da_di" => $countTour - 1
            //     ]);
            // }

            // gửi mail thông báo
            $messages = $this->prepareEmailMessage($order, "cancel_order");
            dispatch(new TestMailJob($messages, $order->email))->delay(now()->addMinutes(1));
        } else if($request->trang_thai == "2"){
            $order->start_date = $order->tour_ngay()->first()->ngay;
            $order->start_date = date("d-m-Y", ($order->start_date));
            $order->end_date = date("d-m-Y", strtotime($order->start_date . " + " . $order->tour_ngay()->first()->so_ngay . " days"));
            $order->total_people = count($travellers);
            $order->location = $order->tour->chi_tiet_tour()->first()->noi_tap_chung . ',' . $order->tour->chi_tiet_tour()->first()->noi_khoi_hanh;
            $order->payment = $order->hinh_thuc_thanh_toan == "0" ? "Thanh toán trực tiếp" : "Thanh toán qua chuyển khoản";
            $order->transpost = $order->tour->transpost;
            $messages = $this->prepareEmailMessage($order, "confirm_order");
            // dd($messages);
            dispatch(new TestMailJob($messages, $order->email))->delay(now()->addMinutes(1));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $forcusOrder = $order->id;
        $count_travellers = DB::table("guest_register_tours")
        ->join("orders","orders.id","guest_register_tours.order_id")
        ->join("order_details","order_details.order_id","orders.id")
        ->where("orders.id", $order->id)
        ->count();
        
        // trả lại số chỗ đã đặt
        $order->tour_ngay()->update([
            "so_cho_da_dat" => DB::raw("so_cho_da_dat - " . $count_travellers),
        ]);
        
        $travellers = DB::table("guest_register_tours")
        ->join("orders","orders.id","guest_register_tours.order_id")
        ->join("order_details","order_details.order_id","orders.id")
        ->where("orders.id", $order->id)
        ->delete();

        $order_details = DB::table("order_details")
        ->where("order_id", $order->id)
        ->delete();

        $order->delete();

        return redirect()->route("order.index")->with("success", "Đã xóa đơn hàng " . $forcusOrder);
    }

    private function prepareEmailMessage($order, $action){
        if ($action == "cancel_order") {
            $messages = [
                'action' => $action,
                'tour' => $order->tour->ten_tour,
                'name' => $order->customer->ten_khach_hang,
                'start_date' => date('d-m-Y',$order->tour_ngay()->first()->ngay),
                'payment' => $order->hinh_thuc_thanh_toan,
                'cancel_by' => 'admin',
            ];
        } else if ($action == "confirm_order") {
            $messages = [
                'action' => $action,
                'tour' => $order->tour->ten_tour,
                'name' => $order->customer->ten_khach_hang,
                'start_date' => $order->start_date,
                'end_date' => $order->end_date,
                'total_people' => $order->total_people,
                'location' => $order->location,
                'payment' => $order->payment,
                'gio_khoi_hanh' => $order->gio_khoi_hanh,
                'transpost' => $order->transpost,
                'tong_tien' => $order->tong_tien,
            ];
        }

        return $messages;
    }
}
