<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class testMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        if ($this->data['action'] == 'booking')
            $subject = 'Booking Tour';
        elseif ($this->data['action'] == 'cancel')
            $subject = 'Cancel Booking Tour';
        elseif ($this->data['action'] == 'waitlist_accept')
            $subject = 'Accept Waitlist Tour';
        elseif ($this->data['action'] == 'register')
            $subject = 'Register member';
        elseif ($this->data['action'] == 'wishlist')
            $subject = 'Wishlist Tour';
        else{
            $subject = 'Zourner - Travel';
        }
        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.testMail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
