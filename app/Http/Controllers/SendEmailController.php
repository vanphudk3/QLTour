<?php

namespace App\Http\Controllers;

use App\Jobs\TestMailJob;
use Illuminate\Http\Request;

class SendEmailController extends Controller
{
    public function index(){
        dispatch(new TestMailJob())->delay(now()->addSeconds(5));
        return 'Email Send Successfully';
    }
}
