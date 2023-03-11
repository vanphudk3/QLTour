<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class TranspostRole extends Enum
{
    const Car =   1;
    const Bus =   2;
    const Train = 3;
    const Plane = 4;
}
