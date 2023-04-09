<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<style>
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
    .flex {
        display: flex;
    }
    .flex-wrap {
        flex-wrap: wrap;
    }
    .col-md-12 {
        width: 100%;
    }
</style>

<body>
    <div class="container">
        <div class="flex flex-wrap">
            <div class="col-md-12">
                <h1>Xin chào {{$data['name']}}</h1>
                <p>Bạn vừa đặt tour {{$data['tour']}} thành công</p>
                <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                <p>Trân trọng</p>
                <p>-------</p>
                <p>Đây là email tự động, vui lòng không trả lời email này.</p>
            </div>
        </div>
</body>
</html>