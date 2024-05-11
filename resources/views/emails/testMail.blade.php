<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <div class="flex flex-wrap">
            <div class="col-md-12">
                <h1>Xin chào {{$data['name']}}</h1>
                <?php 
                    if ($data['action'] == 'booking') {
                ?>
                <p>Bạn vừa đặt tour {{$data['tour']}} thành công</p>
                <div class="tour-info">
                    <b>Thông tin tour:</b>
                    <p>Ngày khởi hành: {{$data['start_date']}}</p>
                    <p>Ngày kết thúc: {{$data['end_date']}}</p>
                    <p>Địa điểm khởi hành: {{$data['location']}}</p>
                    <p>Số người: {{$data['total_people']}}</p>
                    <p>Phương tiện: {{$data['transpost']}}</p>
                    <p>Trạng thái thanh toán: {{$data['payment']}}</p>
                    <p>Giá: {{number_format($data['total_price'])}} VND</p>
                </div>
                <p>Bạn có thể đăng ký hệ thống để theo dõi đơn hàng của mình cũng như nhận được nhiều ưu đãi hấp dẫn</p>
                <b>Truy cập ngay:</b>
                <a class="btn btn-primary" href="http://localhost:8000/register?lang=vi">http://localhost:8000/register?lang=vi</a>
                
                <p>Mọi chi tiết xin liên hệ với chúng tôi qua email:
                    <a href="mailto:emb1910059@student.ctu.edu.vn">
                        emb1910059@student.ctu.edu.vn
                    </a>
                </p>
                <p>Hoặc số điện thoại: 0123456789</p>

                <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'register') {
                ?>
                <p>Chào mừng bạn đến với Zounert Travel</p>
                <p>Chúng tôi rất vui khi bạn đã đăng ký tài khoản thành công</p>
                <p>Chúng tôi sẽ cung cấp cho bạn những dịch vụ tốt nhất</p>
                <b>Truy cập ngay:</b>
                <a class="btn btn-primary" href="http://localhost:8000/login?lang=vi">http://localhost:8000/login?lang=vi</a>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'wishlist') {
                ?>
                <p>Chúng tôi đã nhận được yêu cầu của bạn</p>
                <p>Chúng tôi sẽ thông báo cho bạn qua email khi tour {{$data['tour']}} có sẵn</p>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'waitlist_accept') {
                ?>
                <p>Chúng tôi rất vui khi thông báo cho bạn rằng tour {{$data['tour']}} đã có sẵn</p>
                <p>Bạn có thể đặt tour ngay bây giờ để không bỏ lỡ cơ hội</p>
                <b>Truy cập ngay:</b>
                <a class="btn btn-primary" href="http://localhost:8000/tour/{{$data['slug']}}?lang=vi">http://localhost:8000/tour/{{$data['slug']}}?lang=vi</a>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'subscribe') {
                ?>
                <p>Chúng tôi rất vui khi bạn đã đăng ký nhận thông tin từ chúng tôi</p>
                <p>Chúng tôi sẽ gửi cho bạn những thông tin mới nhất</p>
                <p>Trân trọng</p>
                <?php 
                    } elseif($data['action'] == 'notify') {
                ?>
                <p>Chúng tôi vừa lên lịch tour <b>{{$data['tour']}}</b> mới</p>
                <p>Đừng bỏ lỡ cơ hội đặt tour ngay bây giờ</p>
                <b>Truy cập ngay:</b>
                <a class="btn btn-primary" href="http://localhost:8000/tour/{{$data['slug']}}?lang=vi">http://localhost:8000/tour/{{$data['slug']}}?lang=vi</a>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'cancel_order') {
                        if (!isset($data['cancel_by'])) {
                ?>
                <p>Bạn vừa hủy đơn hàng cho tour <b>{{$data['tour']}}</b> khởi hành vào ngày <b>{{$data['start_date']}}</b> thành công</p>
                <?php
                    } else {
                ?>
                <p>Chúng tôi rất tiếc phải thông báo rằng tour <b>{{$data['tour']}}</b> khởi hành vào ngày <b>{{$data['start_date']}}</b> đã bị hủy</p>
                <?php
                    }
                ?>
                <p>Chúng tôi rất tiếc vì điều này</p>
                <?php
                if ($data['payment'] == "2") {
                ?>
                <p>Vì bạn đã chọn hình thức thanh toán trước, chúng tôi sẽ hoàn lại số tiền cho bạn trong thời gian sớm nhất</p>
                <?php
                    }
                ?>
                <p>Mọi chi tiết xin liên hệ với chúng tôi qua email:
                    <a href="mailto:emb1910059@student.ctu.edu.vn">
                        emb1910059@student.ctu.edu.vn
                    </a>
                </p>
                <p>Hoặc số điện thoại: 0123456789</p>
                <p>Chúng tôi hi bạn sẽ quay lại với chúng tôi trong tương lai</p>
                <p>Trân trọng</p>
                <?php
                    } elseif($data['action'] == 'cancel_tour') {
                ?>
                <p>Chúng tôi rất tiếc phải thông báo rằng tour <b>{{$data['tour']}}</b> khởi hành vào ngày <b>{{$data['start_date']}}</b> đã bị hủy</p>
                <?php
                    if ($data['payment'] == 2) {
                ?>
                <p>Vì bạn đã chọn hình thức thanh toán trước, chúng tôi sẽ hoàn lại số tiền cho bạn trong thời gian sớm nhất</p>
                <?php
                    }
                ?>
                <?php
                    if (isset($data['discount'])) {
                ?>
                <p>Để bù đắp cho sự bất tiện này, chúng tôi sẽ tặng bạn một voucher giảm giá <b>{{$data['discount']}}</b> cho tour tiếp theo</p>
                <p><b>Thông tin voucher:<b></p>
                <p>Mã voucher: <b>{{$data['voucher']}}</b></p>
                <p>Giá trị: <b>{{$data['discount']}}</b></p>
                <p>Gía trị sử dụng: <b>{{$data['so_lan_su_dung']}}</b> lần</p>
                <p>Thời hạn sử dụng: đến ngày <b>{{$data['expired_date']}}</b></p>
                <?php
                    }
                ?>
                
                <p>Chúng tôi hi vọng bạn sẽ quay lại với chúng tôi trong tương lai</p>
                <p>Mọi chi tiết xin liên hệ với chúng tôi qua email:
                    <a href="mailto:emb1910059@student.ctu.edu.vn">
                        emb1910059@student.ctu.edu.vn
                    </a>
                </p>
                <p>Hoặc số điện thoại: 0123456789</p>
                <p>Trân trọng</p>
                <?php
                    } elseif ($data['action'] == 'confirm_order') {
                ?>
                <p>Chúng tôi đã xác nhận đơn hàng cho tour <b>{{$data['tour']}}</b> khởi hành vào ngày <b>{{$data['start_date']}}</b> thành công</p>
                <b>Thông tin tour:</b>
                <p>Ngày khởi hành: {{$data['start_date']}}</p>
                <p>Ngày kết thúc: {{$data['end_date']}}</p>
                <p>Địa điểm khởi hành: {{$data['location']}}</p>
                <p>Thời gian khởi hành: {{$data['gio_khoi_hanh']}}</p>
                <p>Số người: {{$data['total_people']}}</p>
                <p>Phương tiện: {{$data['transpost']}}</p>
                <p>Trạng thái thanh toán: {{$data['payment']}}</p>
                <p>Giá: {{number_format($data['tong_tien'])}} VND</p>
                <p>Mọi chi tiết xin liên hệ với chúng tôi qua email:
                    <a href="mailto:emb1910059@student.ctu.edu.vn">
                        emb1910059@student.ctu.edu.vn
                    </a>
                </p>
                <p>Hoặc số điện thoại: 0123456789</p>
                <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
                <p>Trân trọng</p>
                <?php
                    }
                ?>
                <p>-------</p>
                <p>Đây là email tự động, vui lòng không trả lời email này.</p>
            </div>
        </div>
</body>
</html>