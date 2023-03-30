<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::orderBy('id', 'desc')->paginate(6);
        foreach($orders as $order){
            if($order->trang_thai === "0"){
                $order->trang_thai = "Cancel";
            }
            else if($order->trang_thai === "1"){
                $order->trang_thai = "Pending";
            }
            else if($order->trang_thai === "2"){
                $order->trang_thai = "Success";
            }
            $order->dia_chi = $this->Trancate($order->dia_chi, 15);
        }
        return Inertia::render('Order/Index', compact("orders"));
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
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

        $order->tour->ngay_khoi_hanh = date("d-m-Y", strtotime($order->tour->ngay_khoi_hanh));
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
            "so_cho_da_ban" => count($travellers),
            "so_cho" => DB::raw("so_cho - " . count($travellers))
        ]);

        $order->update([
            "trang_thai" => "1"
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
        dd($order);
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
}
