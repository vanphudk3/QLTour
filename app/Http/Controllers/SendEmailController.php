<?php

namespace App\Http\Controllers;

use App\Jobs\TestMailJob;
use Illuminate\Http\Request;

class SendEmailController extends Controller
{
    public function index(){
        dispatch(new TestMailJob());
        return 'Email Send Successfully';
    }
}
